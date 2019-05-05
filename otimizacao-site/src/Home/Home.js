import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Constraints from '../Constraints';
import { withStyles } from '@material-ui/core/styles';


import './Home.scss';
import ResultsTable from '../ResultsTable';
import { API_URL } from '../Config/API_HELPER';

const axiosInstance = axios.create({
    baseURL: API_URL,
  });

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });

class Home extends Component {
    constructor(props) {
        super(props);
        const { classes } = props;
        this.state = {
            data:{},
            classes,
            showResults: false,
            constraints: {},
            totalConstraints: 0,
            values: {}
        };
    }

    changeValue = (id, value) => {
        const { values } = this.state;

        values[id] = value;
        this.setState({
            values
        });
    }

    checkDisabledConstraint = (id) => {
        const { values } = this.state;
        return id in values;
    }

    addConstraint = () => {
        const { constraints } = this.state;
        let { totalConstraints } = this.state;
        constraints[totalConstraints] = <Constraints
                                            key={totalConstraints}
                                            onDelete={this.removeConstraint}
                                            onChangeValue={this.changeValue}
                                            isDisabled={this.checkDisabledConstraint}
                                            id={totalConstraints}/>;
        totalConstraints++;

        this.setState({
            constraints,
            totalConstraints,
        });
    }

    removeConstraint = (id, ingrediente) => {
        const { constraints, values } = this.state;

        delete constraints[id];
        delete values[ingrediente];

        this.setState({
            constraints,
            values
        });
    }

    renderConstraints = () => {
        return (
            <div className="vitor">
                {Object.values(this.state.constraints)}
            </div>
        );
    }

    createBody = () => {
        const { values } = this.state;
        return { 
            leite: values['Leite'] || {qt: 0, valor: 0},
            ovo: values['Ovos'] || {qt: 0, valor: 0},
            banana: values['Banana Caturra'] || {qt: 0, valor: 0},
            acucarRefinado: values['Açúcar Refinado'] || {qt: 0, valor: 0},
            farinhaDeTrigo: values['Farinha de trigo'] || {qt: 0, valor: 0},
            fermento: values['Fermento'] || {qt: 0, valor: 0},
            achocolatado: values['Achocolatado'] || {qt: 0, valor: 0},
            manteiga: values['Manteiga'] || {qt: 0, valor: 0},
            leiteCondensado: values['Leite condensado'] || {qt: 0, valor: 0},
            laranja: values['Laranja'] || {qt: 0, valor: 0},
            oleo: values['Óleo'] || {qt: 0, valor: 0},
            acucarCristal: values['Açúcar Cristal'] || {qt: 0, valor: 0},
            cenoura: values['Cenouras'] || {qt: 0, valor: 0},
            fuba: values['Fubá'] || {qt: 0, valor: 0},
            maisena: values['Maisena'] || {qt: 0, valor: 0},
            queijoBranco: values['Queijo branco'] || {qt: 0, valor: 0},
            limao: values['Limão'] || {qt: 0, valor: 0},
            mexerica: values['Mexerica'] || {qt: 0, valor: 0},
         }
    }

    calculateOtimization = () => {
        axiosInstance.post('/solve', this.createBody())
        .then(res => {
            this.setState({
                data: res.data.result,
                showResults: true,
            });
        })
    }

    backToHome = () => {
        this.setState({
            showResults: false,
            constraints: {},
            totalConstraints: 0,
            values: {},
            data: {}
        });
    }

    renderContent = (showResults, classes, constraints,data) => {
        if(showResults) {
            return <ResultsTable
                data={data}
                handleClick={this.backToHome}
                classes={classes}
            ></ResultsTable>
        }
        return (
            <div className="inputContent">
                {this.renderConstraints()}
                <div className="buttons-div">
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        className={classes}
                        onClick={this.calculateOtimization}
                        disabled={Object.keys(constraints).length === 0}
                        >
                        Calcular otimização
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        className={this.state.classes.margin}
                        onClick={this.addConstraint}
                        >
                        Adicionar ingrediente
                    </Button>
                </div>
            </div>
        );
    }

    render(){
        const { classes, constraints, showResults, data} = this.state;
        return(
            <div className="home">
                <div className="header">
                    <h1>Maximização de lucros: Delícias Caseiras</h1>
                </div>
                <div className="content">
                    {this.renderContent(showResults, classes, constraints, data)}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
