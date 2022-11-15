import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/CardMusic.css';

class CardMusic extends Component {
  render() {
    const { musica } = this.props;
    return (
      musica.map(({ previewUrl, trackName, artworkUrl100, artworkUrl20 }, e) => (
        <div key={ e } className="container-card-music">
          <img src={ artworkUrl100 } alt={ artworkUrl20 } />
          <span>{trackName}</span>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            {/* <code>audio</code> */}
          </audio>
        </div>
      ))
    );
  }
}

CardMusic.propTypes = {
  musica: PropTypes.arrayOf.isRequired,
};

export default CardMusic;
