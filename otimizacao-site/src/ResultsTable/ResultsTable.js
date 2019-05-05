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

    renderResults = data => Object.keys(data).map((item) => {
        if(this.cakeMapping[item]) {
            return (
                <div className="itemDiv">
                    <div className="itemName">{this.cakeMapping[item]}</div>
                    <div className="itemQt">{data[item]}</div>
                </div>
            );
        } else return null;
    });

    renderTitle = () => (
        <div className="itemDivTitle">
            <div className="itemTitleName">Bolo</div>
            <div className="itemTitleQt">Quantidade</div>
        </div>
    );

    renderProfit = (data) => (
        <div id="profit">
            Lucro: {data.z}
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
                <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    className={classes}
                    onClick={handleClick}
                    >
                    Retornar
                </Button>
            </div>);
    }
}

export default ResultsTable;