import React from 'react';
// import PropTypes from 'prop-types';

import styles from './Spinner.module.css';

const Spinner = props => (
  <div className={styles['lds-ellipsis']}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

// Spinner.propTypes = {};

export default Spinner;