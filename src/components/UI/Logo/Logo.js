import React from 'react';
// import PropTypes from 'prop-types';

import logoImage from '../../../assets/images/dark-long-hair.png';
import styles from './Logo.module.css';

const Logo = props => (
  <div className={styles.container}>
    <div style={{ backgroundImage: `url(${logoImage})` }}></div>
  </div>
);

// Logo.propTypes = {};

export default Logo;