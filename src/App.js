import { Component } from 'react';
import firebase from './firebase';
import axios from 'axios';
import Header from './Header';
import Calendar from './Calendar';
import EventDisplay from './EventDisplay';
import Footer from './Footer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    this.state = {
      today: new Date(),
      chosenDate: new Date(),
      userClicked: false,
      start: 0,
      events: [],
      favourites: []
    }
  }

  setUserChosenDate(date, clicked) {
    this.setState({
      chosenDate: date,
      userClicked: clicked
    });
  }

  setUpDataBase() {
    // Make reference to database
    const dbRef = firebase.database().ref();
    // Get data from database
    let firebaseDataObj;
    dbRef.on('value', (data) => {
      firebaseDataObj = data.val();
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
    });
  }

  componentDidMount() {
    this.setUpDataBase();
    this.apiCall();
  }

  componentDidUpdate() {
    if (this.state.userClicked) {
      this.apiCall();
      this.setState({
        userClicked: false
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Header date={ this.state.chosenDate }/>

        <section className="eventDisplay">
          <div className="wrapper">
            <EventDisplay events={this.state.events.slice(0,1)}/>
          </div> {/* closing wrapper */}
        </section> {/* closing eventDisplay */}

        <Calendar onChange={ (date, clicked) => this.setUserChosenDate(date, clicked) }/>
        <Footer/>
      </div> /* closing App */
    );
  }
}

export default App;
