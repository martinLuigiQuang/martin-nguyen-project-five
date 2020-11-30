const checkYear = (year) => {
    if (year > 0) {
        year = year + ' CE';
    } else if (year < 0) {
        year = year + ' BCE';
    } else {
        year = 'Year 0';
    }
    return year;
}


const EventDisplay = ( { imageUrl, altText, year, description } ) => {
    year = checkYear( year );
    return(
        <div className="event">
            <img src={ imageUrl } alt={ altText } />
            <div className="eventDescription">
                <h3>{ year }</h3>
                <p>{ description }</p>
            </div>
        </div>
    )
}

export default EventDisplay;