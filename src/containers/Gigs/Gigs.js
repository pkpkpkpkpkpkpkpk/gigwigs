import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import cheerio from 'cheerio';

import Gig from '../../components/Gig/Gig';
import styles from './Gigs.module.css';

class Gigs extends Component {
  state = {
    gigs: []
  }

  componentDidMount() {
    this.getGigs();
  }

  getGigs = () => {
    const location = 'sydney';
    const date = `${new Date().getFullYear()}-${new Date().toLocaleDateString('en-US', { month: 'short' })}-${new Date().toLocaleDateString('en-US', { day: '2-digit' })}`;

    axios.get(`https://cors-anywhere.herokuapp.com/https://thebrag.com/gigs/${location}/${date}`)
      .then(res => {
        const $ = cheerio.load(res.data);

        const gigs = $('div.gig-title').map((index, el) => {
            let gig = {
              title: '',
              artist: '',
              venue: ''
            };

            gig.title = el.firstChild.lastChild.firstChild.data.trim();
            gig.artist = $('div.gig-artist')[index].firstChild.data.trim();
            if ($('.gig-location')[index].lastChild.data) {
              gig.venue = `${$('.gig-location')[index].children[1].firstChild.data},${$('.gig-location')[index].lastChild.data}`;
              //else if suburb isn't available
            } else {
              gig.venue = $('.gig-location')[index].children[1].firstChild.data
            }

            return gig;
          })
          // to turn cheerio jQuery object into a regular array
          .get();

        this.setState({
          gigs: gigs
        });
      })
      .catch(error => (
        console.log(error)
      ));
  }

  render() {
    const gigs = this.state.gigs.map( (el, index) => ( 
      <Gig 
        key = {index}
        title = {el.title}
        artist = {el.artist}
        venue = {el.venue} />
    ));

    return ( 
      <div className = {styles.container}> 
        {gigs} 
      </div>
    );
  }
}

// Gigs.propTypes = {};

export default Gigs;