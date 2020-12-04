import { months } from './calendarInfo';
import waxSeal from './assets/waxSeal.png';
import baroqueFloral from './assets/baroqueFloral.png';

const renderInformationTab = () => {
    return (
        <div className="information">
            <div className="infoImageContainer"></div>
            <div className="about">
                <h3>About</h3>
                <p>Choose a date and discover what happened on the same day throughout history.</p> 
            </div>
            <div className="navigation">
                <h3>Navigation</h3>
                <p><span>previous</span><span>event</span><span></span></p>
                <p><span>open</span><span>calendar</span><span></span></p>
                <p><span>next</span><span>event</span><span></span></p>
            </div>
        </div>
    )
}

const renderIcon = () => {
    return (
        <div className="icons">
            <label htmlFor="moreInformation" className="srOnly">more information</label>
            <input type="checkbox" name="moreInformation" id="moreInformation" defaultChecked={true}/>
            {
                renderInformationTab()
            }
            <img src={waxSeal} alt="more information" className="informationIcon" />
            <p className="informationSymbol">i</p>
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
            <div className="headerImageContainer"></div>
            {
                renderIcon()
            }
        </header> 
    )
}

export default Header;