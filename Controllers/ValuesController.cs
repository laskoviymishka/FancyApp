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
		private static IList<ValueModel> models = new List<ValueModel>
		{
			new ValueModel
			{
				Id = 1,
				SomeText = "value2"
			}
		};

		// GET: api/values
		[HttpGet]
		public IEnumerable<ValueModel> Get()
		{
			return models;
		}

		// GET api/values/5
		[HttpGet("{id}")]
		public ValueModel Get(int id)
		{
			if (models.Count() > id)
			{
				return models[id];
			}

			throw new Exception();
		}

		// POST api/values
		[HttpPost]
		public void Post([FromBody] ValueModel value)
		{
			value.Id = models.Count + 1;
			models.Add(value);
		}

		// PUT api/values/5
		[HttpPut("{id}")]
		public void Put(int id, ValueModel value)
		{
			if (models.Count() > id)
			{
				models[id] = value;
			}
		}

		// DELETE api/values/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
			models.Remove(models.FirstOrDefault(t => t.Id == id));
		}
	}
}
