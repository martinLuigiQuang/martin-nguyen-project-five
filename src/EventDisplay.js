import { Component } from 'react';
import stockImage from './assets/medieval2.jpg';
import wing from './assets/wing.png';
import axios from 'axios';

class EventDisplay extends Component {
    constructor() {
        super();
        this.events = [];
        this.images = [];
        this.proxyUrl = `https://cors-anywhere.herokuapp.com/`;
        this.state = {
            events: [],
            images: [],
            userInput: 0
        }
    }

    convertYear(year) {
        if (year > 0) {
            year = year + ' CE';
        } else if (year < 0) {
            year = year + ' BCE';
        } else {
            year = 'Year 0';
        }
        return year;
    }
    renderEventNav() {
        return(
            <div className="eventNav">
                <img src={wing} alt="previous event" className="previousEvent"
                     onClick={() => this.changeEvent(-1)} />
                <img src={wing} alt="next event" className="nextEvent"
                     onClick={() => this.changeEvent(1)} />
            </div>
        )
    }
    changeEvent(change) {
        this.setState({
            userInput: change
        })
    }

    componentDidMount() {
        this.setState({
            events: this.props.events
        })
    }

    componentDidUpdate() {
        if (this.events !== this.props.events) {
            this.events = this.props.events;
            this.setState({
                events: this.props.events
            });
        }
        if (this.state.userInput) {
            this.props.onChange(this.state.userInput);
            this.setState({
                userInput: 0
            });
        }
    }

    render() {
        return (
            this.state.events.map( (event, index) => {
                const { text, year } = event;
                let checkedText = text;
                if (text.charAt(text.length - 1) === ']') {
                    checkedText = text.slice(0, text.length - 3);
                }
                let imageUrl = stockImage;
                const altText = '';
                const historicalYear = this.convertYear(year);
                return (
                    <div key={index} className="event">
                        <img src={imageUrl} alt={altText} />
                        <div className="eventDescription">
                            <h3>{historicalYear}</h3>
                            <p>{checkedText}</p>
                        </div>
                        {
                            this.renderEventNav()
                        }
                    </div>
                )
            })
        )
    }
}

export default EventDisplay;