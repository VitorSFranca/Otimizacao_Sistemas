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
                variables[1] = new Variable("boloCenoura", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[2] = new Variable("boloChocolateCalda", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[3] = new Variable("boloChocolate", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[4] = new Variable("boloMexerica", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[5] = new Variable("boloLaranja", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[6] = new Variable("boloFuba", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[7] = new Variable("boloLimao", 0, System.Double.PositiveInfinity, VariableType.Integer);
                variables[8] = new Variable("boloBanana", 0, System.Double.PositiveInfinity, VariableType.Integer);

                int[] cost = { 10, 20, 30, 40, 50, 60, 70, 80, 90 };
                #endregion

                // Aqui devemos colocar a funcao objetivo:
                // x[i]*(CustoDoBoloI+LucroDoBoloI) + x[i+2]*(CustoDoBoloI2+LucroDoBoloI2) ...
                // Deve ser feito um calculo dos custos dos ingredientes que cada bolo utiliza para ser subtraido pela quantidade de bolos
                // @TODO Metodo para calcular o custo de cada bolo bem como ter os lucros de cada bolo aqui para saber o lucro por unidade
                 model.AddObjective(new Objective(
                    40 - cost[0] * variables[0] +
                    30 - cost[1] * variables[1] +
                    44 - cost[2] * variables[2] +
                    34 - cost[3] * variables[3] +
                    25 - cost[4] * variables[4] +
                    30 - cost[1] * variables[5] +
                    30 - cost[1] * variables[6] +
                    30 - cost[1] * variables[7] +
                    30 - cost[1] * variables[8]
                , "FO", ObjectiveSense.Minimize));

                #region Restricoes
                /* 
                * R1:  (Farinha de trigo |  g): 360*boloCenouraCalda + 240*boloCenoura + 240*boloChocolateCalda + 
                * 240*boloChocolate + 360*boloMexerica + 360*boloLaranja + 360*boloFuba + 240*boloLimao + 
                * 240*boloBanana <= qtdFarinha
                * */
                model.AddConstraint(360*variables[0]+240*variables[1]+240*variables[2]+240*variables[3]+
                                    360*variables[4]+360*variables[5]+360*variables[6]+240*variables[7]+
                                    240*variables[8] <= 1000);
                /*
                 * R2:  (Acucar refinado | g): 400*boloCenouraCalda + 300*boloCenoura + 300*boloChocolateCalda + 
                 * 400*boloChocolate + 360*boloMexerica + 400*boloLaranja + 400*boloFuba + 400*boloLimao + 
                 * 5000*boloBanana <= qtdAcucarRefinado
                 * */
                model.AddConstraint(400 * variables[0] + 300 * variables[1] + 300 * variables[2] + 400 * variables[3] +
                                    360 * variables[4] + 400 * variables[5] + 400 * variables[6] + 400 * variables[7] +
                                    5000 * variables[8] <= 1000);

                /*
                 * R3:  (Leite | ml): 1000*x2 + 300*x3 + 400*x4 + 360*x5 + 400*x6 + 400*x7 + 400*x8 + 5000*x9 <= qtdLeite 
                 * */
                model.AddConstraint(1000 * variables[1] + 300 * variables[2] + 400 * variables[3] + 360 * variables[4] +
                                   400 * variables[5] + 400 * variables[6] + 400 * variables[7] + 5000 * variables[8] <= 10000);

                /*
                * R4:  (Ovos | un): 4*x1 + 5*x2 + 5*x3 + 4*x4 + 4*x9 <= qtdLeite 
                * */
                model.AddConstraint(4 * variables[0] + 5 * variables[1] + 5 * variables[2] + 4 * variables[3] + 4 * variables[8] <= 20);

                /*
                * R5:  (Cenouras | g): 340*x5 + 340*x6 <= qtdCenouras 
                * */
                model.AddConstraint(340*variables[4]+340*variables[5]<=1000);

                /*
                * R6:  (Banana caturra | un): 6*x1 <= qtdBanana
                * */
                model.AddConstraint(6 * variables[0] <= 0);

                /*
                * R7:  (Fermento |  g): 15*x1 + 15*x2 + 15*x3 + 15*x4 + 15*x5 + 15*x6 + 15*x7 + 15*x8 + 15*x9 <= qtdFermento
                * */
                model.AddConstraint(15 * variables[0] + 15 * variables[1] + 15 * variables[2] + 15 * variables[3] +
                                    +15 * variables[4] + 15 * variables[5] + 15 * variables[6] +
                                    +15 * variables[7] + 15 * variables[8] <= 100);

                /*
                * R8:  (Achocolatado |  g): 50*x2 + 50*x3 <= qtdAchocolatado
                * */
                model.AddConstraint(50*variables[1]+50*variables[2] <= 200);

                /*
                * R9:  (Lim�o |  un): 1*x8 <= qtdLim�o
                * */
                model.AddConstraint(1*variables[7] <= 1);

                /*
                * R10:  (Manteiga |  g): 80*x2 + 80*x3 +160*x8 + 240*x9 <= qtdManteiga
                * */
                model.AddConstraint(80*variables[1]+80*variables[2]+160*variables[7]+240*variables[8] <= 1000);

                /*
                * R11:  (Mexirica |  un): 4*x9 <= qtdManteiga
                * */
                model.AddConstraint(4 * variables[8] <= 16);

                /*
                * R12:  (Farinha de trigo |  g): 360*x1 + 240*x2 + 240*x3 + 240*x4 + 360*x5 + 
                * 360*x6 + 360*x7 + 240*x8 + 240*x9 <= qtdFarinha
                * */
                model.AddConstraint(360 * variables[0] + 240 * variables[1] + 240 * variables[2] + 240 * variables[3] +
                                    360 * variables[4] + 360 * variables[5] + 360 * variables[6] + 240 * variables[7] +
                                    240 * variables[8] <= 10000);

                /*
                * R13:  (A�ucar Cristal |  g):100*x4 + 100*x9 <= qtdAcucarCristal
                * */
                model.AddConstraint(100 * variables[3] + 100 * variables[8] <= 300);

                /*
                * R14:  (Oleo |  ml): 240*x4 + 240*x5 + 240*x6 + 240*x9 <= qtdOleo
                * */
                model.AddConstraint(240 * variables[3] + 240 * variables[4] + 240 * variables[5] + 240 * variables[8] <= 1000);
                #endregion

                using (var solver = new GLPKSolver())
                {
                    var solution = solver.Solve(model);
                }

            }

            return entity.qtdOvos.ToString();
        }
    }
}
