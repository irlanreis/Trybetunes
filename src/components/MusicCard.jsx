import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    isChecked: false,
    isLoanding: false,
  };

  handleChange = async ({ target }) => {
    const { checked } = target;
    const { song } = this.props;

    this.setState({
      isLoanding: true,
    });

    await addSong(song);

    this.setState({
      isLoanding: false,
    });

    if (checked) {
      this.setState({
        isChecked: checked,
      });
    }

    this.setState({
      isChecked: checked,
    });
  };

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { isChecked, isLoanding } = this.state;

    return (
      <>
        { isLoanding && <Loading /> }
        <div
          className="container-card-music"
        >
          <div>
            <span>{ trackName }</span>
          </div>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            {/* <code>audio</code> */}
          </audio>
        </div>
        <label
          htmlFor={ `checkbox-music-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
            checked={ isChecked }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.arrayOf.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
