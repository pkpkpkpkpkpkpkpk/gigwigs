import React from 'react';
// import PropTypes from 'prop-types';

import logoImage from '../../../assets/images/bright-long-hair.png';
import styles from './LogoBright.module.css';

const LogoBright = props => (
  <div className={styles.container}>
    <div style={{ backgroundImage: `url(${logoImage})` }}></div>
  </div>
);

// LogoBright.propTypes = {};

export default LogoBright;