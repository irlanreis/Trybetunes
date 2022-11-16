import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    album: {},
    song: [],
    saveSong: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const [album, ...song] = await getMusics(id);
    const allFavoriteMusic = await getFavoriteSongs();
    this.setState({
      album,
      song,
      saveSong: allFavoriteMusic,
    });
  }

  render() {
    const { album, song, saveSong } = this.state;
    console.log(song);
    return (
      <div className="container">
        <Header />
        <section data-testid="page-album">
          {
            song.map((music) => (
              <MusicCard
                song={ music }
                image={ music.artworkUrl100 }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                key={ music.trackId }
                saveSong={ saveSong }
              />
            ))
          }
          <h2 data-testid="album-name">{ album.collectionName }</h2>
          <h3 data-testid="artist-name">{ album.artistName }</h3>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.oneOfType({
    params: PropTypes.oneOfType({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default Album;
