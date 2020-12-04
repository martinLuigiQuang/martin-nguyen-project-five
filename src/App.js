import { Component } from 'react';
import firebase from './firebase';
import axios from 'axios';
import Header from './Header';
import Calendar from './Calendar';
import EventDisplay from './EventDisplay.js';
import Footer from './Footer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    this.state = {
      today: new Date(),
      chosenDate: new Date(),
      aDateIsPicked: false,
      eventIndex: 1,
      events: [],
      favourites: []
    }
  }

  setUserChosenDate(date, picked) {
    this.setState({
      chosenDate: date,
      aDateIsPicked: picked
    });
  }

  getNewEvent(change) {
    let newEventIndex = this.state.eventIndex + change;
    if (newEventIndex < 1) {
      newEventIndex = 1;
    } else if (newEventIndex > this.state.events.length) {
      newEventIndex = this.state.events.length;
    }
    this.setState({
      eventIndex: newEventIndex
    });
  }

  apiCall() {
    axios({
      url: `${this.proxyUrl}http://history.muffinlabs.com/date/${this.state.chosenDate.getMonth() + 1}/${this.state.chosenDate.getDate()}`,
      method: `GET`,
      responseType: `json`
    }).then((response) => {
      this.setState({
        events: response.data.data.Events
      });
    }).catch( err => console.log(err) );
  }

  componentDidMount() {
    this.apiCall();
  }

  componentDidUpdate() {
    if (this.state.aDateIsPicked) {
      this.apiCall();
      this.setState({
        aDateIsPicked: false,
        eventIndex: 1
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header date={ this.state.chosenDate }/>

        <section className="eventDisplay">
          <div className="wrapper">
            <EventDisplay 
              events={this.state.events.slice(this.state.eventIndex - 1, this.state.eventIndex)}  
            />
          </div> {/* closing wrapper */}
        </section> {/* closing eventDisplay */}

        <Calendar 
          onDatePick={ (date, picked) => this.setUserChosenDate(date, picked) }
          onEventChange={ (change) => this.getNewEvent(change) }
        />
        <Footer />
      </div> /* closing App */
    );
  }
}

export default App;
