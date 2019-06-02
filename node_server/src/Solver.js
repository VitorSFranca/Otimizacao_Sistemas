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

    const unityPrice = {
        leite: ingredientes.leite.valor/ingredientes.leite.qt || 0,
        ovo: ingredientes.ovo.valor/ingredientes.ovo.qt || 0,
        banana: ingredientes.banana.valor/ingredientes.banana.qt || 0,
        acucarRefinado: ingredientes.acucarRefinado.valor/ingredientes.acucarRefinado.qt || 0,
        farinhaDeTrigo: ingredientes.farinhaDeTrigo.valor/ingredientes.farinhaDeTrigo.qt || 0,
        fermento: ingredientes.fermento.valor/ingredientes.fermento.qt || 0,
        achocolatado: ingredientes.achocolatado.valor/ingredientes.achocolatado.qt || 0,
        manteiga: ingredientes.manteiga.valor/ingredientes.manteiga.qt || 0,
        leiteCondensado: ingredientes.leiteCondensado.valor/ingredientes.leiteCondensado.qt || 0,
        laranja: ingredientes.laranja.valor/ingredientes.laranja.qt || 0,
        oleo: ingredientes.oleo.valor/ingredientes.oleo.qt || 0,
        acucarCristal: ingredientes.acucarCristal.valor/ingredientes.acucarCristal.qt || 0,
        cenoura: ingredientes.cenoura.valor/ingredientes.cenoura.qt || 0,
        fuba: ingredientes.fuba.valor/ingredientes.fuba.qt || 0,
        maisena: ingredientes.maisena.valor/ingredientes.maisena.qt || 0,
        queijoBranco: ingredientes.queijoBranco.valor/ingredientes.queijoBranco.qt || 0,
        limao: ingredientes.limao.valor/ingredientes.limao.qt || 0,
        mexerica: ingredientes.mexerica.valor/ingredientes.mexerica.qt || 0,
    }

    return {
        boloCenouraCalda: unityPrice.cenoura*340 + unityPrice.oleo*240 + unityPrice.acucarRefinado*400 +
                          unityPrice.fermento*15 + unityPrice.farinhaDeTrigo*360 + unityPrice.leiteCondensado*1 +
                          unityPrice.achocolatado*100 + unityPrice.ovo*4,
        boloCenoura: unityPrice.cenoura*340 + unityPrice.oleo*240 + unityPrice.acucarRefinado*400 +
                     unityPrice.fermento*15 + unityPrice.farinhaDeTrigo*360 + unityPrice.ovo*4,
        boloChocolateCalda: unityPrice.leite*250 + unityPrice.ovo*5 + unityPrice.achocolatado*150 +
                            unityPrice.manteiga*80 + unityPrice.farinhaDeTrigo*240 + unityPrice.acucarRefinado*300 +
                            unityPrice.fermento*15 + unityPrice.leiteCondensado*1,
        boloChocolate: unityPrice.leite*250 + unityPrice.ovo*5 + unityPrice.achocolatado*50 +
                       unityPrice.manteiga*80 + unityPrice.farinhaDeTrigo*240 + unityPrice.acucarRefinado*300 +
                       unityPrice.fermento*15 + unityPrice.leiteCondensado*1, 
        boloMexerica: unityPrice.mexerica*4 + unityPrice.ovo*4 + unityPrice.oleo*240 + unityPrice.acucarCristal*100 +
                      unityPrice.acucarRefinado*400 + unityPrice.farinhaDeTrigo*240 + unityPrice.fermento*15,
        boloLaranja: unityPrice.laranja*4 + unityPrice.ovo*4 + unityPrice.oleo*240 + unityPrice.acucarRefinado*400 +
                     unityPrice.acucarCristal*100 + unityPrice.farinhaDeTrigo*240 + unityPrice.fermento*15,
        boloFuba: unityPrice.leite*1000 + unityPrice.fuba*120 + unityPrice.farinhaDeTrigo*360 + unityPrice.maisena*30 +
                  unityPrice.acucarRefinado*400 + unityPrice.queijoBranco*228 + unityPrice.fermento*15,
        boloLimao: unityPrice.leite*190 + unityPrice.ovo*3 + unityPrice.manteiga*160 +
                   unityPrice.acucarRefinado*500 + unityPrice.farinhaDeTrigo*240 + unityPrice.fermento*15 +
                   unityPrice.limao*1,
        boloBanana: unityPrice.leite*250 + unityPrice.ovo*4 + unityPrice.banana*6 + 
                    unityPrice.acucarRefinado*400 + unityPrice.farinhaDeTrigo*360 + unityPrice.fermento*15,
    }
}

function calcProfit(cakeCost) {
    return {
        boloCenouraCalda: (40-cakeCost.boloCenouraCalda),
        boloCenoura: (35-cakeCost.boloCenoura),
        boloChocolateCalda: (45-cakeCost.boloChocolateCalda),
        boloChocolate: (40-cakeCost.boloChocolate),
        boloMexerica: (25-cakeCost.boloMexerica),
        boloLaranja: (25-cakeCost.boloLaranja),
        boloFuba: (35-cakeCost.boloFuba),
        boloLimao: (35-cakeCost.boloLimao),
        boloBanana: (30-cakeCost.boloBanana)
    }
}

function setSignal(value) {
    if(value > 0) return `+${value}`;
}

module.exports = {
    solve: entry => {
        const cakeProfit = calcProfit(cakeCost(entry));
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
            acucarCristal: entry.acucarCristal.qt,
            oleo: entry.oleo.qt,
            fermento: entry.fermento.qt,
            leiteCondensado: entry.leiteCondensado.qt,
            laranja: entry.laranja.qt,
            fuba: entry.fuba.qt,
            maisena: entry.maisena.qt,
            queijoBranco: entry.queijoBranco.qt,
        };
        input = {
            type: 'maximize',
            // objective: '30.828333333333333x1+27.17066666666667x2+35.38033333333333x3+31.71366666666667x4+19.982666666666667x5+20.249333333333333x6+24.688000000000002x7+24.524x8+24.550666666666668x9',
            objective: `${setSignal(cakeProfit.boloCenouraCalda)}x1${setSignal(cakeProfit.boloCenoura)}x2
                        ${setSignal(cakeProfit.boloChocolateCalda)}x3${setSignal(cakeProfit.boloChocolate)}x4
                        ${setSignal(cakeProfit.boloMexerica)}x5${setSignal(cakeProfit.boloLaranja)}x6
                        ${setSignal(cakeProfit.boloFuba)}x7${setSignal(cakeProfit.boloLimao)}x8
                        ${setSignal(cakeProfit.boloBanana)}x9`,
            constraints: [
                // '360x1 + 360x2 + 240x3 + 240x4 + 240x5 + 240x6 + 360x7 + 240x8 + 360x9  <= 10000',
                // '400x1 + 400x2 + 300x3 + 300x4 + 400x5 + 400x6 + 400x7 + 500x8 + 400x9  <= 6000',
                // '250x3 + 250x4 + 1000x7 + 190x8 + 250x9 <= 10000',
                // '3x1 + 3x2 + 5x3 + 5x4 + 4x5 +  4x6 + 3x8 + 4x9<= 30',
                // '340x1 + 340x2 <= 400',
                // '6x9 <= 15',
                // '15x1 + 15x2 + 15x3 + 15x4 + 15x5 + 15x6 + 15x7 + 15x8 + 15x9 <= 300',
                // '100x1 + 150x3 + 50x4 <= 1200',
                // '1x8 <= 10',
                // '80x3 + 80x4 + 160x8 <= 400',
                // '4x5 <= 10',
                // '100x5 + 100x6 <= 5000',
                // '240x1 + 240x2 + 240x5 + 240x6 <= 2000',
                // '1x1 + 1x3 <= 1000',
                // '4x6 <= 15',
                // '120x7 <=1000',
                // '30x7 <=500',
                // '228x7 <=1000'
                `360x1 + 360x2 + 240x3 + 240x4 + 240x5 + 240x6 + 360x7 + 240x8 + 360x9  <= ${ing.farinhaDeTrigo}`, // Farinha de trigo em gramas
                `400x1 + 400x2 + 300x3 + 300x4 + 400x5 + 400x6 + 400x7 + 500x8 + 400x9  <= ${ing.acucarRefinado}`, // Acucar refinado em gramas
                `250x3 + 250x4 + 1000x7 + 190x8 + 250x9 <= ${ing.leite}`, // Leite em ml
                `3x1 + 3x2 + 5x3 + 5x4 + 4x5 +  4x6 + 3x8 + 4x9<= ${ing.ovo}`, // Ovo unidades
                `340x1 + 340x2 <= ${ing.cenoura}`, // Cenoura em gramas
                `6x9 <= ${ing.banana}`, // Banana caturra unidades
                `15x1 + 15x2 + 15x3 + 15x4 + 15x5 + 15x6 + 15x7 + 15x8 + 15x9 <= ${ing.fermento}`, // Fermento em gramas
                `100x1 + 150x3 + 50x4 <= ${ing.achocolatado}`, // Achocolatado em gramas
                `1x8 <= ${ing.limao}`, // Limao unidade
                `80x3 + 80x4 + 160x8 <= ${ing.manteiga}`, // Manteiga em gramas
                `4x5 <= ${ing.mexerica}`, // Mexirica unidades
                `100x5 + 100x6 <= ${ing.acucarCristal}`, // Acucar Cristal em gramas
                `240x1 + 240x2 + 240x5 + 240x6 <= ${ing.oleo}`, // Oleo
                `1x1 + 1x3 <= ${ing.leiteCondensado}`, // Leite condensado unidade
                `4x6 <= ${ing.laranja}`, // Laranja unidade
                `120x7 <=${ing.fuba}`, // Fuba em gramas
                `30x7 <=${ing.maisena}`, // Maisena em gramas
                `228x7 <=${ing.queijoBranco}`, // Queijo Branco em gramas
            ]
        }

        const output = yasmij.solve( input );
        return output;
    }
}