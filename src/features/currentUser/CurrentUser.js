import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, logOut } from '../../app/firebase';

import { ReactComponent as LoginIcon } from '../../images/login.svg';
import { ReactComponent as LogoutIcon } from '../../images/logout.svg';

const CurrentUser = () => {
    const user = useSelector(state => state.loggedInUser);

    const handleLogin = () => {
        signIn();
    }

    const handleLogout = () => {
        logOut();
    }

    return (
        <div id='current-user-display'>
            {
                user.displayName === null ? 
                <p> Welcome, Anonymous user</p> :
                <Link to="/profile" state={user} key={user.uid} id="loggedin-user">
                    <img src={user.photoURL} alt={user.displayName}/>
                    <p>Welcome, {user.displayName}</p>
                </Link>
            }
            <div id='login-buttons'>
                {user.displayName === null ?
                    <div id='login'>
                        <button id='login-button' onClick={handleLogin}>
                            <LoginIcon />
                        </button>
                        <span>Login</span>
                    </div> : 
                    <div id='logout'>
                        <button id='logout-button' onClick={handleLogout}>
                            <LogoutIcon />
                        </button>
                        <span>Logout</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default CurrentUser; 