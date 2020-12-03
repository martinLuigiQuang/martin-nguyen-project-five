import { months } from './calendarInfo';
import waxSeal from './assets/waxSeal.png';
import baroqueFloral from './assets/baroqueFloral.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as rHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as sHeart } from '@fortawesome/free-solid-svg-icons';
library.add(rHeart, sHeart);


const renderInformationTab = (heartIcon) => {
    return (
        <div className="information">
            <div className="about">
                <h3>About</h3>
                <p>Choose a date and discover what happened on the same day throughout history.</p> 
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

const renderIcons = () => {
    const fasHeart = <FontAwesomeIcon icon={sHeart} />;
    const farHeart = <FontAwesomeIcon icon={rHeart} />;
    return (
        <div className="icons">
            <label htmlFor="moreInformation" className="srOnly">more information</label>
            <input type="checkbox" name="moreInformation" id="moreInformation" defaultChecked={true}/>
            {
                renderInformationTab(fasHeart)
            }
            <img src={waxSeal} alt="more information" className="informationIcon" />
            <p className="informationSymbol">i</p>
            <div className="likeIcon">
                <label htmlFor="likeButton" className="srOnly">Like and save the historical event as one of your favourites</label>
                <input type="checkbox" name="likeButton" id="likeButton" />
                <i>{farHeart}</i>
                <i className="liked">{fasHeart}</i>
            </div>
        </div>
    )
}

const Header = ( { date } ) => {
    const month = months[date.getMonth()];
    const day = date.getDate();
    return (
        <header>
            <img src={baroqueFloral} alt="Baroque Floral Motif" className="firstPiece"/>
            <img src={baroqueFloral} alt="Baroque Floral Motif" className="secondPiece"/>
            <h3>{ month } { day }</h3>
            <h1>In History</h1>
            {
                renderIcons()
            }
        </header> 
    )
}

export default Header;