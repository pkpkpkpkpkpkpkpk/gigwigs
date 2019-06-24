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
    gigs: [],
    spotifyToken: null,
    errorMessage: null
  }

  componentDidMount() {
    this.getGigs();
  }

  componentDidUpdate(prevProps) {
    // get gigs if date changes
    if (this.props.selectedDate !== prevProps.selectedDate) {
      // clear gigs first so spinner will show
      this.setState({ 
        gigs: [] 
      });

      this.getGigs();
    }
  }

  getGigs = () => {
    axios.post('https://gigwigs-server.herokuapp.com/getGigs', {
      where: this.props.where,
      selectedDate: `${new Date(this.props.selectedDate).getFullYear()}-${new Date(this.props.selectedDate).toLocaleDateString('en-US', { month: 'short' })}-${new Date(this.props.selectedDate).toLocaleDateString('en-US', { day: '2-digit' })}`
    })
      .then(res => {
        const gigs = res.data.gigs;

        this.setState({
          gigs: gigs
        });

        this.getSpotifyOAuthToken();
      })
      .catch(error => (
        this.errorhandler(error)
      ));
  }

  getSpotifyOAuthToken = () => {
    axios.get('https://gigwigs-server.herokuapp.com/spotifyAuth')
      .then(res => {
        this.setState({
          spotifyToken: res.data.token
        })

        this.getImages();

        this.props.onGetSpotifyToken(this.state.spotifyToken);
      })
      .catch(error => (
        this.errorhandler(error)
      ));
  }

  getImages = () => {
    let updatedGigs = [];

    this.state.gigs.forEach(gig => {
      axios.get('https://api.spotify.com/v1/search?type=artist', {
        params: {
          q: gig.title
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.spotifyToken
        }
      })
        .then(res => {
          const image = res.data.artists.items[0].images[1].url;
          const spotifyArtistId = res.data.artists.items[0].id;

          const updatedGig = {
            ...gig,
            image: image,
            spotifyArtistId: spotifyArtistId
          }

          updatedGigs.push(updatedGig);

          updateState();
        })
        .catch( () => {
          // if artist isn't found on Spotify
          updatedGigs.push(gig);
          
          updateState();
        });
    });

    const updateState = () => {
      if (updatedGigs.length === this.state.gigs.length) {
        this.setState({
          gigs: updatedGigs
        });

        this.props.onGigsPopulated(this.state.gigs);
      }
    }
  }

  toggleSelectGigHandler = id => {
    let updatedGigs = [
      ...this.state.gigs
    ]

    updatedGigs.forEach( (gig, index) => {
      if (gig.id === id) (
        updatedGigs[index].selected = !updatedGigs[index].selected
      );
    });

    this.setState({
      gigs: updatedGigs
    })

    this.props.onGigsPopulated(this.state.gigs);
  }

  errorhandler = error => {
    this.setState({
      errorMessage: `Something went wrong, the app will refresh shortly... (${error})`
    });

    // setTimeout( () => (
    //   this.props.history.go()
    // ), 3000);
  }

  render() {
    let gigs = null;
    if (this.state.gigs.length === 0) {
      gigs = (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      );
    } else {
      gigs = this.state.gigs.map(gig => ( 
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
    selectedDate: state.selectedDate,
    where: state.where
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGigsPopulated: gigs => dispatch({ type: actionTypes.GIGS_POPULATED, payload: gigs }),
    onGetSpotifyToken: spotifyToken => dispatch({ type: actionTypes.SPOTIFY_TOKEN, payload: spotifyToken })
  };
}

// Gigs.propTypes = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gigs));