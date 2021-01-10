import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const cat = <FontAwesomeIcon icon={faCat} />;
    return(
        <footer>
            <div className="image"></div>
            <p><span>{cat}</span> Created at Juno College {cat}</p>
        </footer>
    )
}

export default Footer;