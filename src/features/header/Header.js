import { Link } from "react-router-dom";
import CurrentUser from "../currentUser/CurrentUser";


const Header = () => {
    return (
        <header>
            <Link to="/" >
                <h1>ADDIT</h1>
            </Link>
            <button>Create Post</button>
            <CurrentUser />
        </header>
    )
}

export default Header;