import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    nameUser: '',
    isLoading: true,
  };

  async componentDidMount() {
    const name = await getUser();

    this.setState({
      nameUser: name,
      isLoading: false,
    });
  }

  render() {
    const { nameUser, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        {
          isLoading ? <Loading /> : (
            <div data-testid="header-user-name">
              {nameUser.name}
            </div>
          )
        }
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Musicas Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          <Link data-testid="link-to-album" to="/album">Album</Link>
          <Link data-testid="link-to-profile-edit" to="/profile/edit">Editar Perfil</Link>
        </nav>
      </header>
    );
  }
}
export default Header;
