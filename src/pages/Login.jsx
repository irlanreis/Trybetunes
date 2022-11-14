import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

const maxName = 3;

class Login extends Component {
  state = {
    name: '',
    isLoading: false,
    isButtonDisabled: true,
  };

  handleChangeButton = () => {
    const { name } = this.state;
    this.setState({
      isButtonDisabled: name.length < maxName,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, this.handleChangeButton);
  };

  handleClick = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name });
    this.setState({
      isLoading: false,
    });
    history.push('/search');
  };

  render() {
    const { isButtonDisabled, name, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading ? <h1>Carregando...</h1> : (
          <div>
            <label htmlFor="input-name">
              <input
                data-testid="login-name-input"
                type="text"
                name="name"
                value={ name }
                id="input-name"
                onChange={ this.handleChange }
              />
            </label>
            <button
              onClick={ this.handleClick }
              type="button"
              disabled={ isButtonDisabled }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
