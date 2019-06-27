import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spotifyWebApi from 'spotify-web-api-node';

import styles from './CreatePlaylistButton.module.css';

const CreatePlaylistButton = props => {
  // disable button if no spotify artists selected
  let enabled = false;
  let containerStyles = [styles.container];
  if ( props.gigs && props.gigs.some(gig => gig.spotifyArtistId !== undefined && gig.selected === true) ) {
    enabled = true;
    containerStyles.push(styles.enabled);
  }

  const scopes = ['playlist-modify-public'];
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'https://www.gigwigs.org/playlist',
    clientId: 'e395299ea7a84cf2b3833d140e0fb40f'
  });
  const authUrl = spotifyApi.createAuthorizeURL(scopes);

  const onClickHandler = () => {
    if (enabled) {
      window.location.href = authUrl
    }
  }

  return (
    <div className={containerStyles.join(' ')} onClick={onClickHandler}>
      <h3>Create Playlist</h3>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    gigs: state.gigs
  };
}

// CreatePlaylistButton.propTypes = {};

export default connect(mapStateToProps)(CreatePlaylistButton);