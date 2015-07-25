using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FancyApp.Model
{
	public class ApplicationUser : IdentityUser { }

	public class SampleContext : IdentityDbContext<ApplicationUser>
	{
		protected override void OnConfiguring(EntityOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=FancyApp;Trusted_Connection=True;");
		}

		public DbSet<ValueModel> Values { get; set; }
	}
}
