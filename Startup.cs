using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Routing;
using Microsoft.Framework.DependencyInjection;
using FancyApp.Model;
using Microsoft.Framework.Configuration;
using Microsoft.Data.Entity;

namespace FancyApp
{
	public class Startup
	{
		public Startup(IHostingEnvironment env)
		{
		}

		public IConfiguration Configuration { get; set; }

		// This method gets called by a runtime.
		// Use this method to add services to the container
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc();
			services.AddDirectoryBrowser();
			services.AddAuthorization();
			services.AddEntityFramework()
				.AddSqlServer()
				.AddDbContext<SampleContext>(options => options.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=FancyApp;Trusted_Connection=True;"));
		}

		// Configure is called after ConfigureServices is called.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseMvc();
			app.UseSinglePageApplicationServer("/index.html");
		}
	}
}
