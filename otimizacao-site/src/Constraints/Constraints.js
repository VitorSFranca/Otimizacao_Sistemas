import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';


import './Constraints.scss';

const ingredients = [
    'Leite',
    'Ovos',
    'Banana Caturra',
    'Açúcar Refinado',
    'Farinha de trigo',
    'Fermento',
    'Achocolatado',
    'Manteiga',
    'Leite condensado',
    'Laranja',
    'Óleo',
    'Açúcar Cristal',
    'Cenouras',
    'Fubá',
    'Maisena',
    'Queijo branco',
    'Limão',
    'Mexerica'
];

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing.unit * 3,
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '200px',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

class Constraints extends React.Component {
  state = {
    ingrediente: '',
    quantidade: 0,
    valor: 0,
  };

  handleChangeValue = () => {
    const{onChangeValue} = this.props;
    const {ingrediente, quantidade} = this.state;
    onChangeValue(ingrediente, quantidade);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    },
        this.handleChangeValue
    );
  };

  handleOnClick = () => {
      const { id, onDelete } = this.props;
      const {ingrediente} = this.state;
 
      onDelete(id, ingrediente);
  }

  renderMenuItem = () => {
    const { isDisabled } = this.props;
      const menuItens = [];
      for(const item of ingredients) {
        menuItens.push(<MenuItem value={item} disabled={isDisabled(item)}>{item}</MenuItem>)
      }
      return menuItens
  }

  render() {
    const { classes, isDisabled } = this.props;

    return (
        <div className="constraint">
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="ingrediente-customized-select" className={classes.bootstrapFormLabel}>
                    Ingrediente
                </InputLabel>
                <Select
                    value={this.state.ingrediente}
                    onChange={this.handleChange('ingrediente')}
                    input={<BootstrapInput name="ingrediente" id="ingrediente-customized-select" />}
                >
                {this.renderMenuItem()}
                </Select>
            </FormControl>
            <TextField
                id="outlined-number"
                label="Quantidade"
                value={this.state.quantidade}
                onChange={this.handleChange('quantidade')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="outlined-number"
                label="Valor"
                value={this.state.valor}
                onChange={this.handleChange('valor')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                variant="outlined"
            />

            <IconButton
                className={classes.button}
                aria-label="Delete"
                onClick={this.handleOnClick}
                >
                <DeleteIcon />
            </IconButton>
        </div>
    );
  }
}

Constraints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Constraints);
