import { Component } from 'react';
import stockImage from './assets/medieval2.jpg';
import waxSeal from './assets/waxSeal.png';
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
            <div className="information">
                <div className="about">
                    <h3>About</h3>
                    <p>A web development bootcamp project. Built with React and Firebase.</p>
                </div>
                <div className="navigation">
                    <h3>Navigation</h3>
                    <i>{heartIcon}</i>
                    <p className="likeButtonDescription">Like and save a historical event</p>
                    <p><span>previous</span><span>event</span><span></span></p>
                    <p><span>open</span><span>calendar</span><span></span></p>
                    <p><span>next</span><span>event</span><span></span></p>
                </div>
            </div>
        )
    }
    renderIcons() {
        const fasHeart = <FontAwesomeIcon icon={sHeart} />;
        const farHeart = <FontAwesomeIcon icon={rHeart} />;
        return(
            <div className="icons">
                <label htmlFor="moreInformation" className="srOnly">more information</label>
                <input type="checkbox" name="moreInformation" id="moreInformation" />
                {
                    this.renderInformationTab(fasHeart)
                }
                <img src={waxSeal} alt="more information" className="informationIcon"/>
                <p className="informationSymbol">i</p>
                <div className="likeIcon">
                    <label htmlFor="likeButton" className="srOnly">Like and save the historical event as one of your favourites</label>
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