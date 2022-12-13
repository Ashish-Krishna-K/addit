import { Link } from "react-router-dom";
import CurrentUser from "../currentUser/CurrentUser";


const Header = () => {
    return (
        <header>
            <Link to="/" >
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