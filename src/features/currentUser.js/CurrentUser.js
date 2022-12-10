import { useSelector, useDispatch } from 'react-redux';
import { signIn, logOut } from '../../firebase'

const CurrentUser = () => {
    const user = useSelector(state => state.loggedInUser);
    const dispatch = useDispatch();

    const handleLogin = () => {
        signIn(dispatch);
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
                <>
                    <p>Welcome, {user.displayName}</p>
                    <img src={user.photoURL} alt={user.displayName} />
                </>
            }
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default CurrentUser; 