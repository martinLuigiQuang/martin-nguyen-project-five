import { months } from './calendarInfo';

const Header = ( { date } ) => {
    const month = months[date.getMonth()];
    const day = date.getDate();
    return (
        <header>
            <h1>This day in history</h1>
            <h3>{ month } { day }</h3>
        </header> 
    )
}

export default Header;