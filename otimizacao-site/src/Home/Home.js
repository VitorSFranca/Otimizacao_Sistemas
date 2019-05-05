import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Constraints from '../Constraints';
import { withStyles } from '@material-ui/core/styles';


import './Home.scss';
import ResultsTable from '../ResultsTable';
import { API_URL } from '../Config/API_HELPER';

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
            classes,
            showResults: true,
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

    calculateOtimization = () => {
        const { values } = this.state;
        this.setState({
            showResults: true,
        });

        axios.get(API_URL)
        .then(res => {
          console.log(res);
        })
    }

    backToHome = () => {
        this.setState({
            showResults: false,
            constraints: {},
            totalConstraints: 0,
            values: {}
        });
    }

    renderContent = (showResults, classes, constraints) => {
        if(showResults) {
            return <ResultsTable
                data={[
                    {ingredient: 'ingrediente1', quantity: '400g'},
                    {ingredient: 'ingrediente2', quantity: '400g'},
                    {ingredient: 'ingrediente3', quantity: '400g'},
                ]}
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
        const { classes, constraints, showResults} = this.state;
        return(
            <div className="home">
                <div className="header">
                    <h1>Maximização de lucros: Delícias Caseiras</h1>
                </div>
                <div className="content">
                    {this.renderContent(showResults, classes, constraints)}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
