import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    album: {},
    song: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const [album, ...song] = await getMusics(id);
    console.log(album);
    this.setState({
      album,
      song,
    });
  }

  render() {
    const { album, song } = this.state;
    return (
      <div className="container">
        <Header />
        <section data-testid="page-album">
          <h2 data-testid="album-name">{ album.collectionName }</h2>
          <h3 data-testid="artist-name">{ album.artistName }</h3>
          {
            song.map((music) => (
              <MusicCard
                song={ music }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                key={ music.trackId }
              />
            ))
          }
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default Album;
