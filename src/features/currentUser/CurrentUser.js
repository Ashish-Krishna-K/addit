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

    return (
        <>
            <button onClick={handleLogin}>Login</button>
            {
                user.displayName === null ? 
                <p> Welcome, Anonymous user</p> :
                <Link to="/profile" state={{ user }}>
                    <p>Welcome, {user.displayName}</p>
                    <img src={user.photoURL} alt={user.displayName} />
                </Link>
            }
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default CurrentUser; 