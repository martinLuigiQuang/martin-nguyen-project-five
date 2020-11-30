import { Component } from 'react';
import firebase from './firebase';
import axios from 'axios';
import Header from './Header';
import Calendar from './Calendar';
import EventDisplay from './EventDisplay';
import Footer from './Footer';
import stockImage from './assets/medieval2.jpg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.proxyUrl = `https://cors-anywhere.herokuapp.com/`;
    this.state = {
      today: new Date(),
      chosenDate: new Date(),
      userClicked: false,
      images: [],
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
    // Make reference to database
    const dbRef = firebase.database().ref();
    // Get data from database
    let firebaseDataObj;
    dbRef.on('value', (data) => {
      firebaseDataObj = data.val();
    });

    // API call
    this.apiCall();
  }

  componentDidUpdate() {
    if (this.state.userClicked) {
      this.apiCall();
      this.setState({
        userClicked: false
      });
    }
    // console.log(this.state.events)
    // axios({
    //   url: `${this.proxyUrl}https://en.wikipedia.org/w/api.php`,
    //   method: `GET`,
    //   responseType: `json`,
    //   params: {
    //     action: "query",
    //     prop: "images",
    //     titles: this.state.events[11].links[1]['title'],
    //     format: "json"
    //   }
    // }).then((response) => {
    //   const responsePages = response.data.query.pages;
    //   for (let page in responsePages) {
    //     const wikipediaImageFileName = responsePages[page][`images`][1][`title`]
    //     const apiImageUrl = `https://en.wikipedia.org/wiki/${ wikipediaImageFileName }`;
    //     console.log(apiImageUrl);
    //   }
    // });
    // this.state.events.forEach( (event, index) => {
    //   if (index === 0) {
        
    //   }
    // });
  }

  render() {
    return (
      <div className="App">
        <Header date={ this.state.chosenDate }/>
        <section className="eventDisplay">
          <div className="wrapper">
            {
              this.state.events.map( (event, index) => {
                const { text, year } = event;
                if (index < 4) {
                  return (
                    <EventDisplay
                      key={index}
                      description={text}
                      year={year}
                      imageUrl={stockImage}
                      altText=''
                    />
                  )
                }
              })
            }
          </div> {/* closing wrapper */}
        </section> {/* closing eventDisplay */}
        <Calendar onChange={ (date, clicked) => this.setUserChosenDate(date, clicked) }/>
        <Footer/>
      </div> /* closing App */
    );
  }
}

export default App;
