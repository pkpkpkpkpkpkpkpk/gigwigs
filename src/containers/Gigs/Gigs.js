import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Gig from '../../components/Gig/Gig';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';
import styles from './Gigs.module.css';

class Gigs extends Component {
  state = {
    errorMessage: null
  }

  componentDidMount() {
    this.getGigs();
  }

  componentDidUpdate(prevProps) {
    // get gigs if date changes
    if (this.props.when !== prevProps.when) {
      this.getGigs();

      // clear any messages if there are any
      this.setState({
        errorMessage: null
      });
    }
  }

  getGigs = async () => {
    // clear gigs first so spinner will show
    this.props.setGigs( [] );

    let res = await axios.post('/getGigs', {
      where: this.props.where,
      when: new Date(this.props.when).toUTCString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })

    // return if post request error
    if (res.status !== 200) {
      this.errorhandler(res.statusText);
      return;
    }

    // return if post request data error
    if (res.data.error) {
      this.errorhandler(res.data.error);
      return;
    }

    const gigs = res.data.gigs;

    // if no gigs on selected date/location, display a message and return
    if (gigs.length <= 0) {
      this.setState({
        errorMessage: `Nothing's on...`
      });
      return;
    }

    // if gigs found
    this.props.setGigs(gigs);
    this.getSpotifyOAuthToken();
  }

  getSpotifyOAuthToken = async () => {
    let res = await axios.get('/spotifyAuth');

    // return if post request error
    if (res.status !== 200) {
      this.errorhandler(res.statusText);
      return;
    }

    // return if post request data error
    if (res.data.error) {
      this.errorhandler(res.data.error);
      return;
    }
    
    const spotifyToken = res.data.token;
    this.props.setSpotifyToken(spotifyToken);
    this.getImages();
  }

  getImages = () => {
    let updatedGigs = [];

    // axios instance created in order to use a different base URL 
    // than the default set in app.js
    let axiosInstance = axios.create({ baseURL: '/', timeout: 5000 });
    
    this.props.gigs.forEach(async gig => {
      let res = await axiosInstance
        .get('https://api.spotify.com/v1/search?type=artist', {
          params: {
            q: gig.title
          },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.spotifyToken}`
          }
        });

      // if artist isn't found on Spotify or error
      if (res.data.artists.items.length <= 0 || res.status !== 200 || res.data.error) {
        updatedGigs.push(gig);
        updateState();
        return;
      }

      const image = res.data.artists.items[0].images[1].url;
      const spotifyArtistId = res.data.artists.items[0].id;
      const updatedGig = {
        ...gig,
        image: image,
        spotifyArtistId: spotifyArtistId
      }

      updatedGigs.push(updatedGig);
      updateState();
    });

    const updateState = () => {
      if (updatedGigs.length === this.props.gigs.length) {
        this.props.setGigs(updatedGigs);
      }
    }
  }

  toggleSelectGigHandler = id => {
    let updatedGigs = [
      ...this.props.gigs
    ]

    updatedGigs.forEach( (gig, index) => {
      if (gig.id === id) (
        updatedGigs[index].selected = !updatedGigs[index].selected
      );
    });

    this.props.setGigs(updatedGigs);
  }

  errorhandler = error => {
    this.setState({
      errorMessage: `Something went wrong, try turning it off and on again... (${error})`
    });
  }

  render() {
    let gigs = null;
    if (this.props.gigs.length === 0) {
      gigs = (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      );
    } else {
      gigs = this.props.gigs.map(gig => ( 
        <Gig 
          key = {gig.id}
          id = {gig.id}
          artist = {gig.artist}
          venue = {gig.venue}
          image={gig.image}
          selected={gig.selected}
          toggleSelectGig={this.toggleSelectGigHandler}
          onSpotify={gig.spotifyArtistId} />
      ));
    }

    if (this.state.errorMessage) {
      gigs = (
        <div className={styles.errorContainer}>
          <div>
            <h4>{this.state.errorMessage}</h4>
          </div>
        </div>
      );
    }

    return ( 
      <div className = {styles.container}> 
        {gigs} 
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    when: state.when,
    where: state.where,
    spotifyToken: state.spotifyToken,
    gigs: state.gigs
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setGigs: gigs => dispatch({ type: actionTypes.SET_GIGS, payload: gigs }),
    setSpotifyToken: spotifyToken => dispatch({ type: actionTypes.SET_SPOTIFY_TOKEN, payload: spotifyToken })
  };
}

// Gigs.propTypes = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gigs));