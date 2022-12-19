import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, logOut } from '../../app/firebase';

const CurrentUser = () => {
    const user = useSelector(state => state.loggedInUser);

    const handleLogin = () => {
        signIn();
    }

    const handleLogout = () => {
        logOut();
    }

    const handleClick = () => {
        // window.location.reload();
    }

    return (
        <div id='current-user-display'>
            {
                user.displayName === null ? 
                <p> Welcome, Anonymous user</p> :
                <Link to="/profile" state={user} key={user.uid} id="loggedin-user" onClick={handleClick}>
                    <img src={user.photoURL} alt={user.displayName}/>
                    <p>Welcome, {user.displayName}</p>
                </Link>
            }
            <div id='login-buttons'>
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default CurrentUser; 