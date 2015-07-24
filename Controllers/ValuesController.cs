using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;

namespace FancyApp.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private static IList<string> dataBase = new List<string> { "value1", "value2", "value3", "value4" };

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return dataBase;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            if (dataBase.Count() > id)
            {
                return dataBase[id];
            }

            return "not found";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
            dataBase.Add(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
            if (dataBase.Count() > id)
            {
                dataBase[id] = value;
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            dataBase.RemoveAt(id);
        }
    }
}
