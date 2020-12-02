import { months } from './calendarInfo';
import baroqueFloral from './assets/baroqueFloral.png';

const Header = ( { date } ) => {
    const month = months[date.getMonth()];
    const day = date.getDate();
    return (
        <header>
            <img src={baroqueFloral} alt="Baroque Floral Motif" className="firstPiece"/>
            <img src={baroqueFloral} alt="Baroque Floral Motif" className="secondPiece"/>
            <h3>{ month } { day }</h3>
            <h1>In History</h1>
        </header> 
    )
}

export default Header;