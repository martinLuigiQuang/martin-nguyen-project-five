import { Component } from 'react';
import stockImage from './assets/medieval2.jpg'
import axios from 'axios';

class EventDisplay extends Component {
    constructor() {
        super();
        this.events = [];
        this.images = [];
        this.proxyUrl = `https://cors-anywhere.herokuapp.com/`;
        this.state = {
            events: [],
            images: []
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

    imageApiCall(event) {
        axios({
            url: `${this.proxyUrl}https://en.wikipedia.org/w/api.php`,
            method: `GET`,
            responseType: `json`,
            params: {
                action: "query",
                prop: "images",
                titles: event.links[2]['title'],
                format: "json",
                formatversion: '2'
            }
        }).then((response) => {
            const wikipediaImageFileName = response.data.query.pages[0]['images'][0]['title'];
            this.imageSrcApiCall(event.year, wikipediaImageFileName);
        }).catch( err => err );
    }
    imageSrcApiCall(year, filename) {
        axios({
            url: `${this.proxyUrl}https://en.wikipedia.org/w/api.php`,
            method: 'GET',
            responseType: 'json',
            params: {
                action: 'query',
                format: 'json',
                prop: 'imageinfo',
                iiprop: 'url',
                titles: filename
            }
        }).then((response) => {
            const imageUrl = response.data.query.pages[-1].imageinfo[0].url;
            const imageUrlObj = {
                year: year,
                url: imageUrl
            }
            this.images.push(imageUrlObj);
            this.setState({
                images: this.images
            });
        }).catch( err => err );
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
            })
            this.events.forEach((event) => {
                this.imageApiCall(event);
            });
        }
    }

    render() {
        return (
            this.state.events.map( (event, index) => {
                const { text, year } = event;
                let imageUrl = this.state.images[0];
                console.log(this.state.images[0])
                const altText = '';
                const historicalYear = this.convertYear(year);
                return (
                    <div key={index} className="event">
                        <img src={imageUrl} alt={altText} />
                        <div className="eventDescription">
                            <h3>{historicalYear}</h3>
                            <p>{text}</p>
                        </div>
                    </div>
                )
            })
        )
    }
}

export default EventDisplay;