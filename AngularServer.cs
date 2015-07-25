using System;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.FileProviders;
using Microsoft.AspNet.StaticFiles;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Hosting;
using Microsoft.Framework.Logging;

namespace FancyApp
{
	public static class SinglePageApplicationExtension
	{
		public static IApplicationBuilder UseSinglePageApplicationServer(this IApplicationBuilder builder, string entryPath, string relativePath = "")
		{
			var hostingEnv = builder.ApplicationServices.GetService(typeof(IHostingEnvironment)) as IHostingEnvironment;
			var loggerFactory = builder.ApplicationServices.GetService(typeof(ILoggerFactory)) as ILoggerFactory;

			var options = new SinglePageApplicationOptions()
			{
				FileServerOptions = new FileServerOptions()
				{
					EnableDirectoryBrowsing = false,
					FileProvider = new PhysicalFileProvider(System.IO.Path.Combine(hostingEnv.WebRootPath, relativePath))
				},
				EntryPath = new PathString(entryPath)
			};

			builder.UseDefaultFiles(options.FileServerOptions.DefaultFilesOptions);

			return builder.Use(next => new SinglePageApplicationMiddleware(
				next,
				options,
				hostingEnv,
				loggerFactory).Invoke);
		}
	}

	public class SinglePageApplicationOptions
	{
		public FileServerOptions FileServerOptions { get; set; }

		public PathString EntryPath { get; set; }

		public bool Html5Mode
		{
			get
			{
				return EntryPath.HasValue;
			}
		}

		public SinglePageApplicationOptions()
		{
			FileServerOptions = new FileServerOptions();
			EntryPath = PathString.Empty;
		}
	}

	public class SinglePageApplicationMiddleware
	{
		private readonly SinglePageApplicationOptions _options;
		private readonly RequestDelegate _next;
		private readonly StaticFileMiddleware _innerMiddleware;
		private readonly IHostingEnvironment _hostingEnv;
		private readonly ILogger _logger;

		public SinglePageApplicationMiddleware(RequestDelegate next, SinglePageApplicationOptions options, IHostingEnvironment hostingEnv, ILoggerFactory loggerFactory)
		{
			_next = next;
			_options = options;
			_hostingEnv = hostingEnv;
			_logger = loggerFactory.CreateLogger(nameof(SinglePageApplicationExtension));

			_innerMiddleware = new StaticFileMiddleware(next, _hostingEnv, options.FileServerOptions.StaticFileOptions, loggerFactory);
		}

		public async Task Invoke(HttpContext context)
		{
			await _innerMiddleware.Invoke(context);
			_logger.LogVerbose(context.Request.Path + ": " + context.Response.StatusCode);
			if (context.Response.StatusCode == 404 && _options.Html5Mode)
			{
				context.Request.Path = _options.EntryPath;
				await _innerMiddleware.Invoke(context);
				_logger.LogVerbose(">> " + context.Request.Path + ": " + context.Response.StatusCode);
			}
		}
	}
}