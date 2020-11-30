import { Component } from 'react';
import stockImage from './assets/medieval2.jpg';
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

    checkYear(year) {
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
                titles: event.links[1]['title'],
                format: "json",
                formatversion: '2'
            }
        }).then((response) => {
            const responsePages = response.data.query.pages;
            const wikipediaImageFileName = responsePages[0]['images'][0]['title'];
            const apiImageUrl = `https://en.wikipedia.org/wiki/${ wikipediaImageFileName }`;
            const imageData = {
                filename: wikipediaImageFileName,
                image_page_url: apiImageUrl,
                image_src: this.fetchImageSrc(wikipediaImageFileName)
            }
            
            
            // this.images.push(apiImageUrl);
            // this.setState({
            //     images: this.images
            // })
        });
    }

    fetchImageSrc(filename) {
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
            return imageUrl;
        });
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
                const altText = '';
                const checkedYear = this.checkYear(year);
                return (
                    <div key={index} className="event">
                        <img src={this.state.images[index]} alt={altText} />
                        <div className="eventDescription">
                            <h3>{checkedYear}</h3>
                            <p>{text}</p>
                        </div>
                    </div>
                )
            })
        )
    }
}

export default EventDisplay;