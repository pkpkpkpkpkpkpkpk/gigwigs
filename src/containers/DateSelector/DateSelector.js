import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Calendar from 'react-calendar'

import * as actionTypes from '../../store/actions';
import styles from './DateSelector.module.css';
import './calendar.css';

class DateSelector extends Component {
  state = {
    showCalendar: false
  }

  changeDateHandler = date => {
    this.setState({ 
      showCalendar: false
    });

    this.props.setWhen(date);
  }

  render() {
    let displayDate = `${new Date(this.props.when).toLocaleDateString('en-US', { weekday: 'short' })} ${new Date(this.props.when).toLocaleDateString('en-US', { day: '2-digit' })} ${new Date(this.props.when).toLocaleDateString('en-US', { month: 'short' })}`;

    const today = `${new Date().toLocaleDateString('en-US', { weekday: 'short' })} ${new Date().toLocaleDateString('en-US', { day: '2-digit' })} ${new Date().toLocaleDateString('en-US', { month: 'short' })}`;
    const tomorrow = `${new Date().toLocaleDateString('en-US', { weekday: 'short' })} ${new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', { day: '2-digit' })} ${new Date().toLocaleDateString('en-US', { month: 'short' })}`;
    const yesterday = `${new Date().toLocaleDateString('en-US', { weekday: 'short' })} ${new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('en-US', { day: '2-digit' })} ${new Date().toLocaleDateString('en-US', { month: 'short' })}`;
    let prefix = '';
    if (displayDate.slice(4) === today.slice(4)) {
      prefix = 'Today - ';
    } else if (displayDate.slice(4) === tomorrow.slice(4)) {
      prefix = 'Tomorrow - ';
    } else if (displayDate.slice(4) === yesterday.slice(4)) {
      prefix = 'Yesterday - ';
    }

    let calendarContainerStyles = [styles.calendarContainer];
    if (this.state.showCalendar) {
      calendarContainerStyles.push(styles.showCalendar);
    }

    return (
      <Fragment>
        <div 
          className={styles.container} 
          onClick={() => this.setState(prevState => ({ showCalendar: !prevState.showCalendar }))}>
          <h3>{`${prefix}${displayDate}`}</h3>
        </div>
        <div className={calendarContainerStyles.join(' ')}>
          <Calendar 
            onChange={this.changeDateHandler} 
            value={new Date(this.props.when)}
            className={styles.calendar}
            minDetail='year'
            minDate={new Date(new Date().setMonth(new Date().getMonth() - 3))}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    when: state.when
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setWhen: when => dispatch({ type: actionTypes.SET_WHEN, payload: when })
  };
}

// DateSelector.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);