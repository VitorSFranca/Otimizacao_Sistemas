import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import './ResultsTable.scss';

class ResultsTable extends Component {

    cakeMapping = {
        x1: 'Bolo de Cenoura com Calda',
        x2: 'Bolo de Cenoura',
        x3: 'Bolo de Chocolate com Calda',
        x4: 'Bolo de Chocolate',
        x5: 'Bolo de Mexerica',
        x6: 'Bolo de Laranja',
        x7: 'Bolo de Fubá',
        x8: 'Bolo de Limão',
        x9: 'Bolo de Banana'
    }

    getMediumQt = value => {
        return Math.floor((value%1/0.5));
    }

    getSmallQt = value => {
        return Math.floor((value%1 - this.getMediumQt(value)) / 0.25);
    }

    getCupCakeQt = value => {
        return Math.floor((value%1 - (0.25*this.getSmallQt(value) + 0.5*this.getMediumQt(value)))*100)/100;
    }

    renderResults = data => Object.keys(data).map((item) => {
        if(this.cakeMapping[item]) {
            return (
                <div className="itemDiv">
                    <div className="itemName">{this.cakeMapping[item]}</div>
                    <div className="itemQt itemQtBig"><span className="qtText">{Math.round(data[item])}</span></div>
                    <div className="itemQt itemQtMedium"><span className="qtText">{this.getMediumQt(data[item])}</span></div>
                    <div className="itemQt itemQtSmall"><span className="qtText">{this.getSmallQt(data[item])}</span></div>
                    <div className="itemQt itemQtCupCake"><span className="qtText">{this.getCupCakeQt(data[item])}</span></div>
                </div>
            );
        } else return null;
    });

    renderTitle = () => (
        <div className="itemDivTitle">
            <div className="itemTitleName">Bolo</div>
            <div className="itemTitleBigQt">Quantidade Grande</div>
            <div className="itemTitleMediumQt">Quantidade Médio</div>
            <div className="itemTitleSmallQt">Quantidade Pequeno</div>
            <div className="itemTitleCupCake">Quantidade CupCake</div>
        </div>
    );

    renderProfit = (data) => (
        <div id="profit">
            Lucro: {Math.floor(data.z * 100)/100}
        </div>
    );

    render () {
        const { data, handleClick, classes } = this.props;
        return (
            <div id="resultsContent">
                <div id="resultsTableDiv">
                    {this.renderTitle()}
                    {this.renderResults(data)}
                    {this.renderProfit(data)}
                </div>
                <div id="backDiv">
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        className={classes}
                        onClick={handleClick}
                        >
                        Retornar
                    </Button>
                </div>
            </div>);
    }
}

export default ResultsTable;