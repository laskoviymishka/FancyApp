using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using FancyApp.Model;

namespace FancyApp.Controllers
{
	[Route("api/[controller]")]
	public class ValuesController : Controller
	{
		private readonly SampleContext _db;

		public ValuesController(SampleContext db)
		{
			_db = db;
		}

		// GET: api/values
		[HttpGet]
		public IEnumerable<ValueModel> Get()
		{
			return _db.Values;
		}

		// GET api/values/5
		[HttpGet("{id}")]
		public ValueModel Get(int id)
		{
			return _db.Values.FirstOrDefault(t => t.Id == id);
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody] ValueModel value)
		{
			_db.Values.Add(value);
			_db.SaveChanges();
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] ValueModel value)
		{
			var original = Get(id);
			original.SomeText = value.SomeText;
			_db.SaveChanges();
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			_db.Values.Remove(Get(id));
			_db.SaveChanges();
		}
	}
}
