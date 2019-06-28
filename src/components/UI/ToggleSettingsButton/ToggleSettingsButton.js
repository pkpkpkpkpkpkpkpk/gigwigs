import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import settingsIcon from '../../../assets/images/aus-icon.png';
import styles from './ToggleSettingsButton.module.css';

const ToggleSettingsButton = props => (
  <div className={styles.container} onClick={() => props.history.push('/settings')}>
    <div style={{ backgroundImage: `url(${settingsIcon})`}}>

    </div>
  </div>
);

// ToggleSettingsButton.propTypes = {};

export default withRouter(ToggleSettingsButton);