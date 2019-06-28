import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import LogoBright from '../../components/UI/LogoBright/LogoBright';
import crossIcon from '../../assets/images/white-cross.png';
import styles from './Settings.module.css';

class Settings extends Component {
  state = {
    containerStyles: [styles.container]
  }

  componentDidMount() {
    // for fade in effect
    setTimeout( () => (
      this.setState({
        containerStyles: [styles.container, styles.fade]
      })
    ), 10);
  }

  exitHandler = () => {
    // for fade out effect
    this.setState({
      containerStyles: [styles.container]
    })

    setTimeout( () => (
      this.props.history.push('/')
    ), 300);
  }

  clickHandler = location => {
    this.props.setWhere(location);

    this.exitHandler();
  }

  render() {
    const locations = ['Sydney', 'Melbourne', 'Adelaide', 'Perth', 'Brisbane', 'Canberra', 'Hobart'];

    const locationButtons = locations.map( (location, index) => {
      if (location === this.props.where) {
        return (
          <h3 
            key={index}
            onClick={() => this.clickHandler(location)}
            className={styles.selected}>{location}</h3>
        );
      } else {
        return (
          <h3 
            key={index}
            onClick={() => this.clickHandler(location)}>{location}</h3>
        );
      }
    });

    // only show exit button if a location has already been selected
    let exit = null;
    if (this.props.where) {
      exit = (
        <div className={styles.exit} onClick={this.exitHandler}>
          <div style={{ backgroundImage: `url(${crossIcon})` }}></div>
        </div>
      );
    }
  
    return (
      <div className={this.state.containerStyles.join(' ')}>
        <LogoBright />
        {locationButtons}
        {exit}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    where: state.where
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setWhere: where => dispatch({ type: actionTypes.SET_WHERE, payload: where })
  };
}

// Settings.propTypes = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));