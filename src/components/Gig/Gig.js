import React from 'react';
import PropTypes from 'prop-types';

import styles from './Gig.module.css';

const Gig = props => {
  let etc = '';
  if (props.artist.length > 50) {
    etc = '...';
  }

  return (
    <div className={styles.container}>
      <h3>{props.title}</h3>
      <h4>{props.artist.slice(0, 50) + etc}</h4>
      <h5>{props.venue}</h5>
      {/* <img src={props.image} alt={props.artist}/> */}
    </div>
  );
};

Gig.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default Gig;