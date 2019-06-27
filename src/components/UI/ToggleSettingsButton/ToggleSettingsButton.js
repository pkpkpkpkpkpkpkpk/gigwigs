import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import gearIcon from '../../../assets/images/gear-icon.png';
import styles from './ToggleSettingsButton.module.css';

const ToggleSettingsButton = props => (
  <div className={styles.container} onClick={() => props.history.push('/settings')}>
    <div style={{ backgroundImage: `url(${gearIcon})`}}>

    </div>
  </div>
);

// ToggleSettingsButton.propTypes = {};

export default withRouter(ToggleSettingsButton);