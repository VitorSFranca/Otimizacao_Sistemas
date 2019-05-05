import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import './ResultsTable.scss';

class ResultsTable extends Component {

    renderResults = data => data.map(item => (
        <div className="itemDiv">
            <div className="itemName">{item.ingredient}</div>
            <div className="itemQt">{item.quantity}</div>
        </div>
    ));

    renderTitle = () => (
        <div className="itemDivTitle">
            <div className="itemTitleName">Ingrediente</div>
            <div className="itemTitleQt">Quantidade</div>
        </div>
    );

    render () {
        const { data, handleClick, classes } = this.props;
        return (
            <div id="resultsContent">
                <div id="resultsTableDiv">
                    {this.renderTitle()}
                    {this.renderResults(data)}
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