import React from 'react';
import PropTypes from 'prop-types';

import gigImage from '../../assets/images/gig-image.jpg';
import notAvailableCross from '../../assets/images/red-cross.png';
import styles from './Gig.module.css';

const Gig = props => {
  let etc = '';
  if (props.artist.length > 50) {
    etc = '...';
  }

  let backgroundImage = `url(${gigImage})`;
  if (props.image) {
    backgroundImage = `url(${props.image})`;
  }

  let gigStyles = [styles.container];
  if (!props.selected) {
    gigStyles.push(styles.unselected);
  }

  // displays a red cross to indicate that the artist wasn't found on spotify
  let notAvailable = '';
  if (!props.onSpotify) {
    notAvailable = (
      <div 
        className={styles.notAvailableCross} 
        style={{ backgroundImage: `url(${notAvailableCross})` }} />
    );
  }

  return (
    <div 
      className={gigStyles.join(' ')} 
      style={{ backgroundImage: backgroundImage }}
      onClick={() => {
        // only if on spotify, will gig be allowed to be deselected
        if (props.onSpotify) {
          props.toggleSelectGig(props.id);
        }
      }}>
      <h3>{props.artist.slice(0, 50) + etc}</h3>
      <h4>{props.venue}</h4>
      {notAvailable}
    </div>
  );
};

Gig.propTypes = {
  id: PropTypes.number.isRequired,
  artist: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  image: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  toggleSelectGig: PropTypes.func.isRequired
};

export default Gig;