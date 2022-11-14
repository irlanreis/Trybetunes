import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    name: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.activeButton());
  };

  activeButton = () => {
    const { name } = this.state;
    const numberLengthMin = 2;
    const validateButton = name.length < numberLengthMin;

    this.setState({
      isDisabled: validateButton,
    });
  };

  render() {
    const { isDisabled } = this.state;

    return (

      <form data-testid="page-search">
        <h1>Search</h1>
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          name="name"
          onChange={ this.handleChange }
          placeholder="Nome do Artista"
        />

        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isDisabled }
          onClick={ ' ' }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}
export default Search;
