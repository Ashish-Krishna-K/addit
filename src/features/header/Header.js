import { Link } from "react-router-dom";
import { resetQueryLast } from "../../app/firebase";
import CurrentUser from "../currentUser/CurrentUser";


const Header = () => {
    const handleHomeClick = (e) => {
        resetQueryLast();
    }
    return (
        <header>
            <Link to="/" onClick={handleHomeClick}>
                <h1>ADDIT</h1>
            </Link>
            <Link to="/createpost" >
                <button>Create Post</button>
            </Link>
            <CurrentUser />
        </header>
    )
}

export default Header;