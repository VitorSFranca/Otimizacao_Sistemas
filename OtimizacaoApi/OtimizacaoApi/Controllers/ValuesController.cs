using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OtimizacaoApi.Services;
using OtimizacaoApi.Entitys;

namespace OtimizacaoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        private readonly Solver glpkSolver = new Solver();

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            Ingredients ingredients = new Ingredients();
            ingredients.qtFarinhaDeTrigo = 5;
            ingredients.qtOvo = 100000;
            ingredients.qtAcucarRefinado = 100000;
            ingredients.qtLeite = 100000;
            ingredients.qtCenoura = 100000;
            ingredients.qtBanana = 100000;
            ingredients.qtAchocolatado = 100000;
            ingredients.qtLimao = 100000;
            ingredients.qtManteiga = 100000;
            ingredients.qtMexerica = 100000;
            ingredients.qtAcucarCristal = 100000;
            ingredients.qtOleo = 100000;
            ingredients.qtFermento = 100000;
            ingredients.qtLeiteCondensado = 100000;
            ingredients.qtLaranja = 100000;
            ingredients.qtFuba = 100000;
            ingredients.qtMaisena = 100000;
            ingredients.qtQueijoBranco = 100000;

            ingredients.valueFarinhaDeTrigo = 1;
            ingredients.valueOvo = 1;
            ingredients.valueAcucarRefinado = 1;
            ingredients.valueLeite = 1;
            ingredients.valueCenoura = 1;
            ingredients.valueBanana = 1;
            ingredients.valueAchocolatado = 1;
            ingredients.valueLimao = 1;
            ingredients.valueManteiga = 1;
            ingredients.valueMexerica = 1;
            ingredients.valueAcucarCristal = 1;
            ingredients.valueOleo = 1;
            ingredients.valueFermento = 1;
            ingredients.valueLeiteCondensado = 1;
            ingredients.valueLaranja = 1;
            ingredients.valueFuba = 1;
            ingredients.valueMaisena = 1;
            ingredients.valueQueijoBranco = 1;

            IDictionary<string, double> result =  glpkSolver.solve(ingredients);
            return new string[] { "value1", "value2" };
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }
    }
}
