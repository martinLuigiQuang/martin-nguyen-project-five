import { Component } from 'react';
import stockImage from './assets/medieval2.jpg';
import waxSeal from './assets/waxSeal.png';
import wingedBeing from './assets/wingedBeing.png';
import eyeOfHorus from './assets/eyeOfHorus.jpg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as rHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as sHeart } from '@fortawesome/free-solid-svg-icons';
library.add(rHeart, sHeart);

class EventDisplay extends Component {
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
    checkText(text) {
        let checkedText = text;
        if (text.charAt(text.length - 1) === ']') {
            checkedText = text.slice(0, text.length - 3);
        }
        return checkedText;
    }
    renderInformationTab(heartIcon) {
        return(
            <div className="Information">
                <div>
                    <h3>About</h3>
                    <p>A web development bootcamp project. Built with React and Firebase.</p>
                </div>
                <div>
                    <h3>Navigation</h3>
                    <p><span>previous</span><span>event</span></p>
                    <p><span>open</span><span>calendar</span></p>
                    <p><span>next</span><span>event</span></p>
                    <img src={wingedBeing} alt="previous event" className="previousEvent"/>
                    <img src={eyeOfHorus} alt="open calendar" className="icon"/>
                    <img src={wingedBeing} alt="next event" className="nextEvent"/>
                    <i>{heartIcon}</i>
                    <p>Like and save an event</p>
                </div>
            </div>
        )
    }
    renderIcons() {
        const fasHeart = <FontAwesomeIcon icon={sHeart} />;
        const farHeart = <FontAwesomeIcon icon={rHeart} />;
        return(
            <div className="icons">
                <label htmlFor="moreInformation" className="srOnly"></label>
                <input type="checkbox" name="moreInformation" id="moreInformation"/>
                {
                    this.renderInformationTab(farHeart)
                }
                <img src={waxSeal} alt="more information" className="informationIcon"/>
                <p className="information">i</p>
                <div className="likeIcon">
                    <label htmlFor="likeButton" className="srOnly"></label>
                    <input type="checkbox" name="likeButton" id="likeButton"/>
                    <i>{farHeart}</i>
                    <i className="liked">{fasHeart}</i>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.props.events.map( (event, index) => {
                const { text, year } = event;
                const checkedText = this.checkText(text);
                let imageUrl = stockImage;
                const altText = '';
                const historicalYear = this.convertYear(year);
                return (
                    <div key={index} className="event">
                        {
                            this.renderIcons()
                        }
                        <img src={imageUrl} alt={altText} />
                        <div className="eventDescription">
                            <h3>{historicalYear}</h3>
                            <p>{checkedText}</p>
                        </div>
                    </div>
                )
            })
        )
    }
}

export default EventDisplay;