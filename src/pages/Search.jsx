import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    name: '',
    isDisabled: true,
    dataAlbuns: [],
    isLoading: false,
    saveArtistBanda: '',
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

  handleClick = async (e) => {
    e.preventDefault();
    const { name } = this.state;
    this.setState({
      isLoading: true,
      saveArtistBanda: name,
    });

    const containerSongs = await searchAlbumsAPI(name);
    this.setState({
      dataAlbuns: containerSongs,
      isLoading: false,
      name: '',
    });
  };

  render() {
    const { isDisabled, isLoading, saveArtistBanda, dataAlbuns } = this.state;

    return (

      <form data-testid="page-search">
        <h1>Search</h1>
        <Header />
        { isLoading ? <Loading /> : (
          <>
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
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
            <div>
              {`Resultado de álbuns de: ${saveArtistBanda}`}
            </div>
            {
              dataAlbuns.length === 0 ? <div>Nenhum álbum foi encontrado</div> : (
                dataAlbuns.map((album) => (
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    key={ album.artistId }
                  >
                    <p>{album.collectionName}</p>
                    <p>{album.artistName}</p>
                    <img src={ album.artworkUrl100 } alt={ album.collectionId } />
                  </Link>
                ))
              )
            }
          </>
        )}
      </form>
    );
  }
}
export default Search;
