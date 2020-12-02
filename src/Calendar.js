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
            userClicked: false,
            eventNav: 0,
            checkbox: false,
            chosenDate: new Date(),
            daysInAWeek: daysInAWeek,
            savedDates: [],
            monthCalendar: []
        }
    }
    fillCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const weekdayOfFirstDay = firstDay.getDay();
        const numOfDaysInMonth = new Date(year, month + 1, 0).getDate();
        const maxNumOfDays = this.getMaxNumberOfDays(weekdayOfFirstDay, numOfDaysInMonth);
        let nextDay = 1;
        let filledCalendar = [];
        for (let i = 0; i < maxNumOfDays; i++) {
            if (i < weekdayOfFirstDay || i >= weekdayOfFirstDay + numOfDaysInMonth) {
                filledCalendar.push('');
            } else {
                filledCalendar.push(this.toString(nextDay));
                nextDay++;
            }
        }
        return filledCalendar;
    }
    toString(day) {
        if (day < 10) {
            day = '0' + day;
        } else {
            day = '' + day;
        }
        return day;
    }
    getMaxNumberOfDays(weekdayOfFirstDay, numOfDaysInMonth) {
        let maxNumOfDays = 35; // Default is a 5-week display
        if (weekdayOfFirstDay + numOfDaysInMonth > 35) {
            maxNumOfDays = 42; // 6-week display
        } else if (weekdayOfFirstDay + numOfDaysInMonth === 28) {
            maxNumOfDays = 28 // 4-week display for a normal year with February 1st on a Sunday
        }
        return maxNumOfDays;
    }
    displayDayInAWeek(day) {
        let checkedDay = day;
        if (window.outerWidth < 500) {
            checkedDay = day.charAt(0);
        }
        return (<li key={day}>{checkedDay}</li>)
    }
    checkToday(date, day) {
        return ( date.getFullYear() === this.state.today.getFullYear() && 
                 date.getMonth() === this.state.today.getMonth() && 
                 parseInt(day) === this.state.today.getDate() )
    }
    calendarEntry(day, index, today, callbackFunction) {
        return (
            <li
                key={index}
                className={`dayInMonth ${today}`}
                onClick={ callbackFunction }
            >
                <span>{day.charAt(0)}</span>
                <span>{day.charAt(1)}</span>
            </li>
        )
    } 
    getUserChosenDate(year, month, day) {
        const chosenDate = new Date(year, month, day);
        this.setState({
            userClicked: true,
            checkbox: !this.state.checkbox,
            chosenDate: chosenDate
        });
    }
    nextMonth(year, month) {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        const newChosenDate = new Date(year, month);
        this.setState({
            calendarDate: newChosenDate,
            monthCalendar: this.fillCalendar(newChosenDate)
        });
    }
    previousMonth(year, month) {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        const newChosenDate = new Date(year, month);
        this.setState({
            calendarDate: newChosenDate,
            monthCalendar: this.fillCalendar(newChosenDate)
        });
    }
    changeEvent(change) {
        this.setState({
            eventNav: change
        })
    }
    uncheckCheckbox() {
        if (this.state.checkbox) {
            this.setState({
                checkbox: !this.state.checkbox
            });
        }
    }
    reset() {
        this.setState({
            calendarDate: this.state.today,
            monthCalendar: this.fillCalendar(this.state.today)
        });
    }

    componentDidMount() {
        this.setState({
            monthCalendar: this.fillCalendar(this.state.today)
        });
    }

    componentDidUpdate() {
        this.uncheckCheckbox();
        if (this.state.userClicked) {
            this.props.onChange(this.state.chosenDate, this.state.userClicked, this.state.eventNav);
            this.setState({
                userClicked: false
            });
        }
        if (this.state.eventNav) {
            this.props.onChange(this.state.chosenDate, this.state.userClicked, this.state.eventNav);
            this.setState({
                eventNav: 0
            });
        }
    }

    renderCheckbox() {
        if (this.state.checkbox) {
            return(
                <input type="checkbox" name="calendar" id="calendar" checked
                    onClick={() => this.reset()} />
            )
        } else {
            return (
                <input type="checkbox" name="calendar" id="calendar"
                    onClick={() => this.reset()} />
            )
        }
    }

    renderCalendarIcon() {
        return(
            <div className="calendarIcon">
                <img src={wingedBeing} alt="previous event" className="previousEvent"
                    onClick={() => this.changeEvent(-1)} />
                <img src={wingedBeing} alt="next event" className="nextEvent"
                    onClick={() => this.changeEvent(1)} />
                <img src={eyeOfHorus} alt="select a date" className="icon"/>
            </div>
        )
    }
    
    render() {
        const chosenDate = this.state.calendarDate;
        const chosenYear = chosenDate.getFullYear();
        const chosenMonth = chosenDate.getMonth();
        return (
            <div className="calendar">
                <label htmlFor="calendar" className="srOnly">Choose a day</label>
                {
                    this.renderCheckbox()
                }
                {
                    this.renderCalendarIcon()
                }
                <img src={parchment} alt="parchment background" className="parchment hidden"/>
                <div className="calendarNav hidden">
                    <img src={ arrow } alt="previous month" className="leftArrow" 
                         onClick={ () => this.previousMonth(chosenYear, chosenMonth) }/>
                    <h3>{ months[chosenMonth] + ' ' + chosenYear }</h3>
                    <img src={arrow} alt="previous month" className="rightArrow" 
                         onClick={() => this.nextMonth(chosenYear, chosenMonth)} />
                </div>
                <div className="calendarDisplay hidden">
                    {
                        this.state.daysInAWeek.map( (day) => {
                            return this.displayDayInAWeek(day);
                        })
                    }
                    {
                        this.state.monthCalendar.map( (day, index) => {
                            let entry = this.calendarEntry(day, index, '', () => this.getUserChosenDate(chosenYear, chosenMonth, day) );
                            if (day === '') {
                                entry = this.calendarEntry(day, index, '');
                            } else if (this.checkToday(chosenDate, day)) {
                                entry = this.calendarEntry(day, index, 'today', () => this.getUserChosenDate(chosenYear, chosenMonth, day) );
                            }
                            return entry;
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Calendar;