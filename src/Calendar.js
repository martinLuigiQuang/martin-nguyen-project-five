import { Component } from 'react';
import { months, daysInAWeek } from './calendarInfo';
import arrow from './assets/arrow.png';
import eyeOfHorus from './assets/eyeOfHorus.jpg';
import parchment from './assets/parchment.png';
import wingedBeing from './assets/wingedBeing.png';

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            today: new Date(),
            calendarDate: new Date(),
            chosenDate: new Date(),
            aDateIsPicked: false,
            eventNav: 0,
            isChecked: false,
            savedDates: [],
            monthCalendar: []
        }
    }
    // fill the calendar with the seed (input) being the current day's date
    fillCalendar(date) {
        // Get current year and month
        const year = date.getFullYear();
        const month = date.getMonth();
        // Get how many days current month has; year is an input to account for leap years
        const numOfDaysInMonth = new Date(year, month + 1, 0).getDate();
        // Get first day of the month and its weekday
        const firstDay = new Date(year, month, 1);
        const weekdayOfFirstDay = firstDay.getDay();
        // maxNumOfDays indicates how many weeks (including all blank entries) to display on the calendar
        const maxNumOfDays = this.getMaxNumberOfDays(weekdayOfFirstDay, numOfDaysInMonth);
        // Fill the calendar starting from first entry
        let nextDay = 1;
        let filledCalendar = [];
        for (let i = 0; i < maxNumOfDays; i++) {
            if (i < weekdayOfFirstDay || i >= weekdayOfFirstDay + numOfDaysInMonth) {
                // blank entries for before first day and after last day in the month
                filledCalendar.push('');
            } else {
                // date entries
                const stringDate = this.toString(nextDay);
                filledCalendar.push(stringDate);
                nextDay++;
            }
        }
        return filledCalendar;
    }
    // Convert single-digit dates into 2-digit string format
    toString(day) {
        if (day < 10) {
            day = '0' + day;
        } else {
            day = '' + day;
        }
        return day;
    }
    // Determine the maximum number of entries for the monthly calendar
    getMaxNumberOfDays(weekdayOfFirstDay, numOfDaysInMonth) {
        let maxNumOfDays = 35; // Default is a 5-week display
        if (weekdayOfFirstDay + numOfDaysInMonth > 35) {
            maxNumOfDays = 42; // 6-week display
        } else if (weekdayOfFirstDay + numOfDaysInMonth === 28) {
            maxNumOfDays = 28 // 4-week display for a normal year with February 1st on a Sunday
        }
        return maxNumOfDays;
    }
    // Display the names of the days in a week; shorten the names for narrow screens
    displayDayInAWeek(day) {
        let checkedDay = day;
        if (window.outerWidth < 500) {
            checkedDay = day.charAt(0);
        }
        return (<li key={day}>{checkedDay}</li>)
    }
    // Return true if the day on the calendar display is the current date; the purpose is to highlight it
    checkToday(date, day) {
        return ( date.getFullYear() === this.state.today.getFullYear() && 
                 date.getMonth() === this.state.today.getMonth() && 
                 parseInt(day) === this.state.today.getDate() )
    }
    // To render the calendar entries on screen; callback function parameter to record user's date pick
    calendarEntry(day, index, today, callbackFunction) {
        return (
            <button
                key={index}
                className={`dayInMonth ${today}`}
                onClick={ callbackFunction }
            >
                <span>{day.charAt(0)}</span>
                <span>{day.charAt(1)}</span>
            </button>
        )
    } 
    // Update the state of the component when the user selects a date
    getUserChosenDate(calendarYear, calendarMonth, chosenDay) {
        // chosenDate variable to set the component state and to be passed to App.js Component to update Header.js Component
        const chosenDate = new Date(calendarYear, calendarMonth, chosenDay);
        this.setState({
            aDateIsPicked: true,
            isChecked: !this.state.isChecked,
            chosenDate: chosenDate
        });
    }
    // Callback function to return to the current month and reset the calendar display
    reset() {
        console.log('checked')
        this.setState({
            calendarDate: this.state.today,
            monthCalendar: this.fillCalendar(this.state.today),
            isChecked: !this.state.isChecked
        });
    }
    // Callback function that allows the user to navigate the calendar
    changeMonth(calendarYear, calendarMonth, change) {
        calendarMonth += change;
        if (calendarMonth > 11) {
            calendarMonth = 0;
            calendarYear++;
        } else if (calendarMonth < 0) {
            calendarMonth = 11;
            calendarYear--;
        }
        const newCalendarDate = new Date(calendarYear, calendarMonth);
        this.setState({
            calendarDate: newCalendarDate,
            monthCalendar: this.fillCalendar(newCalendarDate)
        });
    }
    //  Callback function to allow the user to navigate through the events
    changeEvent(change) {
        this.setState({
            eventNav: change
        })
    }
    // Render the calendar icon and event nav icons
    renderCalendarIcon() {
        return (
            <div className="calendarIcon">
                <button className="previousEvent" onClick={() => this.changeEvent(-1)} >
                    <img src={wingedBeing} alt="previous event" />
                </button>
                <div className="icon">
                    <img src={eyeOfHorus} alt="select a date" />
                </div>
                <button className="nextEvent" onClick={() => this.changeEvent(1)} >
                    <img src={wingedBeing} alt="next event" />
                </button>
            </div>
        )
    }
    // Render the calendar nav
    renderCalendarNav(calendarYear, calendarMonth) {
        return (
            <div className="calendarNav hidden">
                <button className="leftArrow" onClick={() => this.changeMonth(calendarYear, calendarMonth, -1)}>
                    <img src={arrow} alt="previous month" />
                </button>
                <h3>{months[calendarMonth] + ' ' + calendarYear}</h3>
                <button className="rightArrow" onClick={() => this.changeMonth(calendarYear, calendarMonth, 1)}>
                    <img src={arrow} alt="previous month" />
                </button>
            </div>
        )
    }
    // Redner the calendar display
    renderCalendarDisplay(calendarDate, calendarYear, calendarMonth) {
        return(
            <div className="calendarDisplay hidden">
                {
                    daysInAWeek.map((day) => {
                        return this.displayDayInAWeek(day);
                    })
                }
                {
                    this.state.monthCalendar.map((day, index) => {
                        let entry = this.calendarEntry(day, index, '', () => this.getUserChosenDate(calendarYear, calendarMonth, day));
                        if (day === '') {
                            entry = this.calendarEntry(day, index, '');
                        } else if (this.checkToday(calendarDate, day)) {
                            entry = this.calendarEntry(day, index, 'today', () => this.getUserChosenDate(calendarYear, calendarMonth, day));
                        }
                        return entry;
                    })
                }
            </div>
        )
    }
    
    componentDidMount() {
        this.setState({
            monthCalendar: this.fillCalendar(this.state.today)
        });
    }

    // componentDidUpdate() to pass the specified states of Calendar component to the onChange props of <Calendar /> in App.js Component
    componentDidUpdate() {
        if (this.state.aDateIsPicked) {
            this.props.onUserChange(this.state.chosenDate, this.state.aDateIsPicked, this.state.eventNav);
            this.setState({
                aDateIsPicked: false
            });
        }
        if (this.state.eventNav) {
            this.props.onUserChange(this.state.chosenDate, this.state.aDateIsPicked, this.state.eventNav);
            this.setState({
                eventNav: 0
            });
        }
    }
    
    render() {
        const calendarDate = this.state.calendarDate;
        const calendarYear = calendarDate.getFullYear();
        const calendarMonth = calendarDate.getMonth();
        return (
            <div className="calendar">
                {/* Input checkbox to toggle calendar display */}
                <label htmlFor="calendar" className="srOnly">Choose a day</label>
                <input type="checkbox" name="calendar" id="calendar"
                    checked={this.state.isChecked}
                    onChange={() => this.reset()}
                />
                {
                    this.renderCalendarIcon()
                }
                {/* Background image */}
                <img src={parchment} alt="parchment background" className="parchment hidden" />
                {
                    this.renderCalendarNav(calendarYear, calendarMonth)
                }
                {
                    this.renderCalendarDisplay(calendarDate, calendarYear, calendarMonth)
                }
            </div>
        )
    }
}

export default Calendar;