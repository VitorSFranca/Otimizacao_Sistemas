using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OS_API.Services;
using OS_API.Entitys;

namespace OS_API.Controllers
{
    [Route("api/glpksolution")]
    [ApiController]
    public class GlpkSolutionController : ControllerBase
    {
        // GET: api/GlpkSolution
        public string Get(int leite, int ovos, int cenoura, int banana, int fermento
                          , int achocolatado, int limao, int manteiga, int mexerica
                          , int farinhaDeTrigo, int acucarCristal, int oleo, int acucarRefinado)
        {
            IngredientsEntity entity = new IngredientsEntity();
            entity.qtdLeite = leite;
            entity.qtdOvos = ovos;
            entity.qtdCenoura = cenoura;
            entity.qtdBanana = banana;
            entity.qtdFermento = fermento;
            entity.qtdAchocolatado = achocolatado;
            entity.qtdLimao = limao;
            entity.qtdManteiga = manteiga;
            entity.qtdMexerica = mexerica;
            entity.qtdFarinhaDeTrigo = farinhaDeTrigo;
            entity.qtdAcucarCristal = acucarCristal;
            entity.qtdOleo = oleo;
            entity.qtdAcucarRefinado = acucarRefinado;

            return GlpkService.getSolution(entity);
        }
    }
}
