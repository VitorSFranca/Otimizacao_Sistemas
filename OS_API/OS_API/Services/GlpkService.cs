using OS_API.Entitys;
using OPTANO.Modeling.Common;
using OPTANO.Modeling.Optimization;
using OPTANO.Modeling.Optimization.Configuration;
using OPTANO.Modeling.Optimization.Enums;
using OPTANO.Modeling.Optimization.Solver.GLPK;


namespace OS_API.Services
{
    public class GlpkService
    {
        public static string getSolution(IngredientsEntity entity)
        {
            var configuration = new Configuration
            {
                NameHandling = NameHandlingStyle.Manual
            };

            using (var scope = new ModelScope(configuration))
            {
                var model = new Model();

                var variables = new Variable[20];
            }

            return entity.qtdOvos.ToString();
        }
    }
}
