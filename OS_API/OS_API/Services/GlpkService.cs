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

                #region Variaveis
                var variables = new Variable[9];
                variables[0] = new Variable("boloCenouraCalda", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[0] = new Variable("boloCenoura", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[0] = new Variable("boloChocolateCalda", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[0] = new Variable("boloChocolate", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[0] = new Variable("boloMexerica", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[0] = new Variable("boloLaranja", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[0] = new Variable("boloFuba", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[0] = new Variable("boloLimao", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[0] = new Variable("boloBanana", 0, System.Double.PositiveInfinity, VariableType.Integer);
                #endregion

                // Aqui devemos colocar a funcao objetivo:
                // x[i]*(CustoDoBoloI+LucroDoBoloI) + x[i+2]*(CustoDoBoloI2+LucroDoBoloI2) ...
                // Deve ser feito um calculo dos custos dos ingredientes que cada bolo utiliza para ser subtraido pela quantidade de bolos
                // @TODO Metodo para calcular o custo de cada bolo bem como ter os lucros de cada bolo aqui para saber o lucro por unidade
                model.AddObjective(x[0] * , string.Empty, ObjectiveSense.Maximize);

            }

            return entity.qtdOvos.ToString();
        }
    }
}
