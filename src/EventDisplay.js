import stockImage from './assets/medieval2.jpg';

const convertYear = (year) => {
    if (year > 0) {
        year = year + ' CE';
    } else if (year < 0) {
        year = year + ' BCE';
    } else {
        year = 'Year 0';
    }
const checkText = (text) => {
        let checkedText = text;
        if (text.charAt(text.length - 1) === ']') {
            checkedText = text.slice(0, text.length - 3);
        }
        return checkedText;
}

const checkText = (text)=>  {
    let checkedText = text;
    if (text.charAt(text.length - 1) === ']') {
        checkedText = text.slice(0, text.length - 3);
    }
    return checkedText;
}

const renderEvent = (index, imageUrl, altText, historicalYear, checkedText) => {
    return(
        <div key={index} className="event">
            <img src={imageUrl} alt={altText} />
            <div className="eventDescription">
                <h3>{historicalYear}</h3>
                <p>{checkedText}</p>
            </div>
        </div>
    )
}

const EventDisplay = (props) => {
    return (
        props.events.map( (event, index) => {
            const { text, year } = event;
            const checkedText = checkText(text);
            let imageUrl = stockImage;
            const altText = '';
            const historicalYear = convertYear(year);
            return renderEvent(index, imageUrl, altText, historicalYear, checkedText);
        })
    )
}

export default EventDisplay;