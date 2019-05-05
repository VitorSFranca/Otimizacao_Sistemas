const yasmij = require('yasmij');

/*
boloCenouraCalda,
boloCenoura,
boloChocolateCalda,
boloChocolate,
boloMexerica,
boloLaranja,
boloFuba,
boloLimao,
boloBanana
*/

function cakeCost(ingredientes) {
    return {
        boloCenouraCalda: ingredientes.cenoura.valor + ingredientes.oleo.valor + ingredientes.acucarRefinado.valor +
                          ingredientes.fermento.valor + ingredientes.farinhaDeTrigo.valor + ingredientes.leiteCondensado.valor +
                          ingredientes.achocolatado.valor,
        boloCenoura: ingredientes.cenoura.valor + ingredientes.oleo.valor + ingredientes.acucarRefinado.valor +
                     ingredientes.fermento.valor + ingredientes.farinhaDeTrigo.valor,
        boloChocolateCalda: (ingredientes.leite.valor + ingredientes.ovo.valor + ingredientes.achocolatado.valor +
                            ingredientes.manteiga.valor + ingredientes.farinhaDeTrigo.valor + ingredientes.acucarRefinado.valor +
                            ingredientes.fermento.valor + ingredientes.leiteCondensado.valor + ingredientes.achocolatado.valor),
        boloChocolate: ingredientes.leite.valor + ingredientes.ovo.valor + ingredientes.achocolatado.valor +
                       ingredientes.manteiga.valor + ingredientes.farinhaDeTrigo.valor + ingredientes.acucarRefinado.valor +
                       ingredientes.fermento.valor, 
        boloMexerica: ingredientes.mexerica.valor + ingredientes.ovo.valor + ingredientes.oleo.valor + ingredientes.acucarCristal.valor +
                      ingredientes.acucarRefinado.valor + ingredientes.farinhaDeTrigo.valor + ingredientes.fermento.valor,
        boloLaranja: ingredientes.laranja.valor + ingredientes.ovo.valor + ingredientes.oleo.valor + ingredientes.acucarRefinado.valor +
                     ingredientes.acucarCristal.valor + ingredientes.farinhaDeTrigo.valor + ingredientes.fermento.valor,
        boloFuba: ingredientes.leite.valor + ingredientes.fuba.valor + ingredientes.farinhaDeTrigo.valor + ingredientes.maisena.valor +
                  ingredientes.acucarRefinado.valor + ingredientes.queijoBranco.valor + ingredientes.fermento.valor,
        boloLimao: ingredientes.leite.valor + ingredientes.ovo.valor + ingredientes.manteiga.valor +
                   ingredientes.acucarRefinado.valor + ingredientes.farinhaDeTrigo.valor + ingredientes.fermento.valor +
                   ingredientes.limao.valor,
        boloBanana: ingredientes.leite.valor + ingredientes.ovo.valor + ingredientes.banana.valor + 
                    ingredientes.acucarRefinado.valor + ingredientes.farinhaDeTrigo.valor + ingredientes.fermento.valor,
    }
}

function calcProfit(cakeCost) {
    return {
        boloCenouraCalda: (40-cakeCost.boloCenouraCalda),
        boloCenoura: (30-cakeCost.boloBanana),
        boloChocolateCalda: (44-cakeCost.boloChocolateCalda),
        boloChocolate: (34-cakeCost.boloChocolate),
        boloMexerica: (25-cakeCost.boloMexerica),
        boloLaranja: (25-cakeCost.boloLaranja),
        boloFuba: (35-cakeCost.boloFuba),
        boloLimao: (28-cakeCost.boloLimao),
        boloBanana: (55-cakeCost.boloBanana)
    }
}

function setSignal(value) {
    if(value > 0) return `+${value}`;
}

module.exports = {
    solve: entry => {
        const cakeProfit = calcProfit(cakeCost(entry));
        console.log(cakeCost(entry));
        const ing = {
            farinhaDeTrigo: entry.farinhaDeTrigo.qt,
            ovo: entry.ovo.qt,
            acucarRefinado: entry.acucarRefinado.qt,
            leite: entry.leite.qt,
            cenoura: entry.cenoura.qt,
            banana: entry.banana.qt,
            achocolatado: entry.achocolatado.qt,
            limao: entry.limao.qt,
            manteiga: entry.manteiga.qt,
            mexerica: entry.mexerica.qt,
            farinhaDeTrigo: entry.farinhaDeTrigo.qt,
            acucarCristal: entry.acucarCristal.qt,
            oleo: entry.oleo.qt,
            fermento: entry.fermento.qt,
        };
        input = {
            type: 'maximize',
            objective: `${setSignal(cakeProfit.boloCenouraCalda)}x1${setSignal(cakeProfit.boloCenoura)}x2
                        ${setSignal(cakeProfit.boloChocolateCalda)}x3${setSignal(cakeProfit.boloChocolate)}x4
                        ${setSignal(cakeProfit.boloMexerica)}x5${setSignal(cakeProfit.boloLaranja)}x6
                        ${setSignal(cakeProfit.boloFuba)}x7${setSignal(cakeProfit.boloLimao)}x8
                        ${setSignal(cakeProfit.boloBanana)}x9`,
            constraints: [
                `360x1 + 240x2 + 240x3 + 240x4 + 360x5 + 360x6 + 360x7 + 240x8 + 240x9 <= ${ing.farinhaDeTrigo}`, // Farinha de trigo
                `400x1 + 300x2 + 300x3 + 400x4 + 360x5 + 400x6 + 400x7 + 400x8 + 5000x9 <= ${ing.acucarRefinado}`, // Acuca refinado
                `1000x2 + 300x3 + 400x4 + 360x5 + 400x6 + 400x7 + 400x8 + 5000x9 <= ${ing.leite}`, // Leite
                `4x1 + 5x2 + 5x3 + 4x4 + 4x9 <= ${ing.ovo}`, // Ovo 
                `340x5 + 340x6 <= ${ing.cenoura}`, // Cenoura
                `6x1 <= ${ing.banana}`, // Banana caturra
                `15x1 + 15x2 + 15x3 + 15x4 + 15x5 + 15x6 + 15x7 + 15x8 + 15x9 <= ${ing.fermento}`, // Fermento
                `50x2 + 50x3 <= ${ing.achocolatado}`, // Achocolatado
                `1x8 <= ${ing.limao}`, // Limao
                `80x2 + 80x3 +160x8 + 240x9 <= ${ing.manteiga}`, // Manteiga
                `4x9 <= ${ing.mexerica}`, // Mexirica
                `360x1 + 240x2 + 240x3 + 240x4 + 360x5 + 360x6 + 360x7 + 240x8 + 240x9 <= ${ing.farinhaDeTrigo}`, // Farinha de Trigo
                `100x4 + 100x9 <= ${ing.acucarCristal}`, // Acucar Cristal
                `240x4 + 240x5 + 240x6 + 240x9 <= ${ing.oleo}` // Oleo
            ]
        }

        const output = yasmij.solve( input );
        return output;
    }
}