import ancient from './assets/illustrations/ancient.jpg';
import medieval from './assets/illustrations/medieval.jpg';
import renaissance from './assets/illustrations/renaissance.jpg';
import modern from './assets/illustrations/modern.jpg';
import current from './assets/illustrations/current.jpg';

const convertYear = (year) => {
    if (year > 0) {
        year = year + ' CE';
    } else if (year < 0) {
        year = year + ' BCE';
    } else {
        year = 'Year 0';
    }
    return year;
}

const getEra = (year) => {
    let imageSrc = '';
    let altText = '';
    if (year < 500) {
        imageSrc = ancient;
        altText = 'ancient';
    } else if (year < 1500) {
        imageSrc = medieval;
        altText = 'medieval';
    } else if (year < 1700) {
        imageSrc = renaissance;
        altText = 'renaissance';
    } else if (year < 2000) {
        imageSrc = modern;
        altText = 'modern';
    } else {
        imageSrc = current;
        altText = 'current';
    }
    return [imageSrc, altText];
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
    );
}

const EventDisplay = (props) => {
    return (
        props.events.map( (event, index) => {
            const { text, year } = event;
            const checkedText = checkText(text);
            const eraInfo = getEra(year);
            const imageUrl = eraInfo[0];
            const altText = `Illustration picture for ${ eraInfo[1] } period of history`;
            const historicalYear = convertYear(year);
            return renderEvent(index, imageUrl, altText, historicalYear, checkedText);
        })
    );
}

export default EventDisplay;