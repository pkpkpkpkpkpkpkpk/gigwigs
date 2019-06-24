import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Calendar from 'react-calendar'

import * as actionTypes from '../../store/actions';
import styles from './DateSelector.module.css';
import './calendar.css';

class DateSelector extends Component {
  state = {
    selectedDate: new Date(),
    showCalendar: false
  }

  changeDateHandler = selectedDate => {
    this.setState({ 
      selectedDate,
      showCalendar: false
    });

    this.props.onDateSelected(this.state.selectedDate);
  }

  render() {
    let displayDate = `${this.state.selectedDate.toLocaleDateString('en-US', { weekday: 'short' })} ${this.state.selectedDate.toLocaleDateString('en-US', { day: '2-digit' })} ${this.state.selectedDate.toLocaleDateString('en-US', { month: 'short' })}`;

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
            value={this.state.selectedDate}
            className={styles.calendar}
            minDetail='year'
            minDate={new Date(new Date().setMonth(new Date().getMonth() - 3))}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))} />
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDateSelected: selectedDate => dispatch({ type: actionTypes.DATE_SELECTED, payload: selectedDate })
  };
}

// DateSelector.propTypes = {};

export default connect(null, mapDispatchToProps)(DateSelector);