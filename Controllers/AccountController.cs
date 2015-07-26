using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Identity;
using FancyApp.Model;
using System.Diagnostics;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FancyApp.Controllers
{
	[Route("api/[controller]")]
	public class AccountController : Controller
	{
		private SampleContext _db;
		private UserManager<ApplicationUser> _userManager;
		private SignInManager<ApplicationUser> _signInManager;

		public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, SampleContext db)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_db = db;
		}

		[HttpGet]
		public IEnumerable<ApplicationUser> Get()
		{
			return _db.Users;
		}

		[HttpGet("{id}")]
		public ApplicationUser Get(string id)
		{
			return _db.Users.FirstOrDefault(t => t.Id == id);
		}

		[HttpPost("SignUp")]
		public async Task SignUp([FromBody]string userName, [FromBody]string password)
		{
			var user = new ApplicationUser
			{
				UserName = userName
			};

			var result = await _userManager.CreateAsync(user, password);
			Debug.WriteLine(string.Format("Sign in result {0}", result.Succeeded));
		}

		[HttpPost("SignIn")]
		public async Task SignIn([FromBody]string userName, [FromBody]string password)
		{
			var user = new ApplicationUser { };
			var result = await _signInManager.PasswordSignInAsync(userName, password, true, true);
			Debug.WriteLine(string.Format("Sign in result {0}", result.Succeeded));
		}

		[HttpPost("SignOut")]
		public void SignOut()
		{
			_signInManager.SignOut();
		}
	}
}
