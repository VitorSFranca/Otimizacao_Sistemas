using OPTANO.Modeling.Common;
using OPTANO.Modeling.Optimization;
using OPTANO.Modeling.Optimization.Configuration;
using OPTANO.Modeling.Optimization.Enums;
using OPTANO.Modeling.Optimization.Solver.GLPK;
using System.Collections.Generic;
using OtimizacaoApi.Entitys;



namespace OtimizacaoApi.Services
{
    public class Solver
    {
        private double cakeProfit(int cake, IDictionary<string, double> cakeCost)
        {
            switch (cake)
            {
                case 0:
                    return 40 - cakeCost["boloCenouraCalda"];
                case 1:
                    return 35 - cakeCost["boloCenoura"];
                case 2:
                    return 45 - cakeCost["boloChocolateCalda"];
                case 3:
                    return 40 - cakeCost["boloChocolate"];
                case 4:
                    return 25 - cakeCost["boloMexerica"];
                case 5:
                    return 25 - cakeCost["boloLaranja"];
                case 6:
                    return 35 - cakeCost["boloFuba"];
                case 7:
                    return 35 - cakeCost["boloLimao"];
                default:
                    return 30 - cakeCost["boloBanana"];
            }
        }

        private IDictionary<string, double> ingredientUnityCost(Ingredients ingredients)
        {
            IDictionary<string, double> cost = new Dictionary<string, double>();
            cost.Add("farinhaDeTrigo", (ingredients.valueFarinhaDeTrigo / ingredients.qtFarinhaDeTrigo));
            cost.Add("ovo", ingredients.valueOvo / ingredients.qtOvo);
            cost.Add("acucarRefinado", ingredients.valueAcucarRefinado / ingredients.qtAcucarRefinado);
            cost.Add("leite", ingredients.valueLeite / ingredients.qtLeite);
            cost.Add("cenoura", ingredients.valueCenoura / ingredients.qtCenoura);
            cost.Add("banana", ingredients.valueBanana / ingredients.qtBanana);
            cost.Add("achocolatado", ingredients.valueAchocolatado / ingredients.qtAchocolatado);
            cost.Add("limao", ingredients.valueLimao / ingredients.qtLimao);
            cost.Add("manteiga", ingredients.valueManteiga / ingredients.qtManteiga);
            cost.Add("mexerica", ingredients.valueMexerica / ingredients.qtMexerica);
            cost.Add("acucarCristal", ingredients.valueAcucarCristal / ingredients.qtAcucarCristal);
            cost.Add("oleo", ingredients.valueOleo / ingredients.qtOleo);
            cost.Add("fermento", ingredients.valueFermento / ingredients.qtFermento);
            cost.Add("leiteCondensado", ingredients.valueLeiteCondensado / ingredients.qtLeiteCondensado);
            cost.Add("laranja", ingredients.valueLaranja / ingredients.qtLaranja);
            cost.Add("fuba", ingredients.valueFuba / ingredients.qtFuba);
            cost.Add("maisena", ingredients.valueMaisena / ingredients.qtMaisena);
            cost.Add("queijoBranco", ingredients.valueQueijoBranco / ingredients.qtQueijoBranco);

            return cost;
        }

        private IDictionary<string, double> cakeCost(IDictionary<string, double> ingredientsCost)
        {
            IDictionary<string, double> cakeCost = new Dictionary<string, double>();
            cakeCost.Add("boloCenouraCalda", ingredientsCost["cenoura"] * 340 +
                         ingredientsCost["oleo"] * 240 + ingredientsCost["acucarRefinado"] * 400 +
                         ingredientsCost["fermento"] * 15 + ingredientsCost["farinhaDeTrigo"] * 360 +
                         ingredientsCost["leiteCondensado"] + ingredientsCost["achocolatado"] * 100 +
                         ingredientsCost["ovo"] * 4);

            cakeCost.Add("boloCenoura", ingredientsCost["cenoura"] * 340 +
                         ingredientsCost["oleo"] * 240 + ingredientsCost["acucarRefinado"] * 400 +
                         ingredientsCost["fermento"] * 15 + ingredientsCost["farinhaDeTrigo"] * 360
                         + ingredientsCost["ovo"] * 4);

            cakeCost.Add("boloChocolateCalda", ingredientsCost["leite"] * 250 + ingredientsCost["ovo"] * 5 +
                        ingredientsCost["achocolatado"] * 150 + ingredientsCost["manteiga"] * 80 + 
                        ingredientsCost["farinhaDeTrigo"] * 240 + ingredientsCost["acucarRefinado"] * 300 +
                        ingredientsCost["fermento"] * 15 + ingredientsCost["leiteCondensado"] * 1);

            cakeCost.Add("boloChocolate", ingredientsCost["leite"] * 250 + ingredientsCost["ovo"] * 5 +
                        ingredientsCost["achocolatado"] * 50 + ingredientsCost["manteiga"] * 80 +
                        ingredientsCost["farinhaDeTrigo"] * 240 + ingredientsCost["acucarRefinado"] * 300 +
                        ingredientsCost["fermento"] * 15 + ingredientsCost["leiteCondensado"] * 1);

            cakeCost.Add("boloMexerica", ingredientsCost["mexerica"] * 4 + ingredientsCost["ovo"] * 4 +
                        ingredientsCost["oleo"] * 240 + ingredientsCost["acucarCristal"] * 100 +
                        ingredientsCost["acucarRefinado"] * 400 + ingredientsCost["farinhaDeTrigo"] * 240 +
                        ingredientsCost["fermento"] * 15);

            cakeCost.Add("boloLaranja", ingredientsCost["laranja"] * 4 + ingredientsCost["ovo"] * 4 +
                        ingredientsCost["oleo"] * 240 + ingredientsCost["acucarRefinado"] * 400 + 
                        ingredientsCost["acucarCristal"] * 100 + ingredientsCost["farinhaDeTrigo"] * 240 +
                        ingredientsCost["fermento"] * 15);

            cakeCost.Add("boloFuba", ingredientsCost["leite"] * 1000 + ingredientsCost["fuba"] * 120 +
                         ingredientsCost["farinhaDeTrigo"] * 360 + ingredientsCost["maisena"] * 30 +
                         ingredientsCost["acucarRefinado"] * 400 + ingredientsCost["queijoBranco"] * 228 +
                         ingredientsCost["fermento"] * 15);


            cakeCost.Add("boloLimao", ingredientsCost["leite"] * 190 + ingredientsCost["ovo"] * 3 +
                        ingredientsCost["manteiga"] * 160 + ingredientsCost["acucarRefinado"] * 500 +
                        ingredientsCost["farinhaDeTrigo"] * 240 + ingredientsCost["fermento"] * 15 +
                        ingredientsCost["limao"] * 1);

            cakeCost.Add("boloBanana", ingredientsCost["leite"] * 250 + ingredientsCost["ovo"] * 4 +
                        ingredientsCost["banana"] * 6 + ingredientsCost["acucarRefinado"] * 400 +
                        ingredientsCost["farinhaDeTrigo"] * 360 + ingredientsCost["fermento"] * 15);
            return cakeCost;
        }

        public IDictionary<string, double> solve(Ingredients ingredients)
        {
            var config = new Configuration
            {
                NameHandling = NameHandlingStyle.Manual
            };

            using (var scope = new ModelScope(config))
            {
                var model = new Model();

                #region Variaveis
                var variaveis = new Variable[9];
                variaveis[0] = new Variable("boloCenouraCalda", 0, 9090909090909, VariableType.Integer);
                variaveis[1] = new Variable("boloCenoura", 0, 9090909090909, VariableType.Integer);
                variaveis[2] = new Variable("boloChocolateCalda", 0, 9090909090909, VariableType.Integer);
                variaveis[3] = new Variable("boloChocolate", 0, 9090909090909, VariableType.Integer);
                variaveis[4] = new Variable("boloMexerica", 0, 9090909090909, VariableType.Integer);
                variaveis[5] = new Variable("boloLaranja", 0, 9090909090909, VariableType.Integer);
                variaveis[6] = new Variable("boloFuba", 0, 9090909090909, VariableType.Integer);
                variaveis[7] = new Variable("boloLimao", 0, 9090909090909, VariableType.Integer);
                variaveis[8] = new Variable("boloBanana", 0, 9090909090909, VariableType.Integer);
                #endregion

                IDictionary<string, double> varIngredientUnityCost = ingredientUnityCost(ingredients);
                IDictionary<string, double> varCakeCost = cakeCost(varIngredientUnityCost);

                model.AddObjective(new Objective(
                    variaveis[0] * cakeProfit(0, varCakeCost) +
                    variaveis[1] * cakeProfit(1, varCakeCost) +
                    variaveis[2] * cakeProfit(2, varCakeCost) +
                    variaveis[3] * cakeProfit(3, varCakeCost) +
                    variaveis[4] * cakeProfit(4, varCakeCost) +
                    variaveis[5] * cakeProfit(5, varCakeCost) +
                    variaveis[6] * cakeProfit(6, varCakeCost) +
                    variaveis[7] * cakeProfit(7, varCakeCost) +
                    variaveis[8] * cakeProfit(8, varCakeCost)
                , string.Empty, ObjectiveSense.Maximize));

                #region Restricoes

                model.AddConstraint((360 * variaveis[0] + 360 * variaveis[1] + 240 * variaveis[2] +
                                     240 * variaveis[3] + 240 * variaveis[4] + 240 * variaveis[5] +
                                     360 * variaveis[6] + 240 * variaveis[7] + 360 * variaveis[8])
                                     <= ingredients.qtFarinhaDeTrigo);
                model.AddConstraint((400 * variaveis[0] + 400 * variaveis[1] + 300 * variaveis[2] +
                                     300 * variaveis[3] + 400 * variaveis[4] + 400 * variaveis[5] +
                                     400 * variaveis[6] + 500 * variaveis[7] + 400 * variaveis[8])
                                     <= ingredients.qtAcucarRefinado); // Acucar refinado em gramas
                model.AddConstraint((250 * variaveis[2] + 250 * variaveis[3] + 1000 * variaveis[6] +
                                     190 * variaveis[7] + 250 * variaveis[8]) <= ingredients.qtLeite); // Leite em ml
                model.AddConstraint((3 * variaveis[0] + 3 * variaveis[1] + 5 * variaveis[2] +
                                     5 * variaveis[3] + 4 * variaveis[4] + 4 * variaveis[5] +
                                     3 * variaveis[7] + 4 * variaveis[8]) <= ingredients.qtOvo); // Ovo unidades
                model.AddConstraint((340 * variaveis[0] + 340 * variaveis[1]) <= ingredients.qtCenoura); // Cenoura em gramas
                model.AddConstraint((6 * variaveis[8]) <= ingredients.qtBanana); // Banana caturra unidades
                model.AddConstraint((15 * variaveis[0] + 15 * variaveis[1] + 15 * variaveis[2] +
                                     15 * variaveis[3] + 15 * variaveis[4] + 15 * variaveis[5] +
                                     15 * variaveis[6] + 15 * variaveis[7] + 15 * variaveis[8])
                                     <= ingredients.qtFermento); // Fermento em gramas
                model.AddConstraint((100 * variaveis[0] + 150 * variaveis[2] + 50 * variaveis[3]) <= ingredients.qtAchocolatado); // Achocolatado em gramas
                model.AddConstraint((1 * variaveis[7]) <= ingredients.qtLimao); // Limao unidade
                model.AddConstraint((80 * variaveis[2] + 80 * variaveis[3] + 160 * variaveis[7]) <= ingredients.qtManteiga); // Manteiga em gramas
                model.AddConstraint((4 * variaveis[4]) <= ingredients.qtMexerica); // Meirica unidades
                model.AddConstraint((100 * variaveis[4] + 100 * variaveis[5]) <= ingredients.qtAcucarCristal); // Acucar Cristal em gramas
                model.AddConstraint((240 * variaveis[0] + 240 * variaveis[1] + 240 * variaveis[4] + 240 * variaveis[5]) <= ingredients.qtOleo); // Oleo
                model.AddConstraint((variaveis[0] + variaveis[2]) <= ingredients.qtLeiteCondensado); // Leite condensado unidade
                model.AddConstraint((4 * variaveis[5]) <= ingredients.qtLaranja); // Laranja unidade
                model.AddConstraint((120 * variaveis[6]) <= ingredients.qtFuba);// Fuba em gramas
                model.AddConstraint((30 * variaveis[6]) <= ingredients.qtMaisena); // Maisena em gramas
                model.AddConstraint((228 * variaveis[6]) <= ingredients.qtQueijoBranco); // Queijo Branco em gramas

                #endregion

                //inicio resolução
                using (var solver = new GLPKSolver())
                {
                    model.Name = "Maximizacao de lucros";
                    var solution = solver.Solve(model);

                    if (solution.VariableValues != null)
                    {
                        return solution.VariableValues;
                    }

                    //caso não haja solução, retorno nulo para o front end saber que nao houve solução
                    else
                    {
                        return null;
                    }
                }
            }
        }
    }
}