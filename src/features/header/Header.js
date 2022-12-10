import CurrentUser from "../currentUser/CurrentUser";


const Header = () => {
    return (
        <header>
            <h1>ADDIT</h1>
            <button>Create Post</button>
            <CurrentUser />
        </header>
    )
}

export default Header;