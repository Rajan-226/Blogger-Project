import { Link } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';


const Navbar = () => {

    const { currentUser, logout } = useAuth();
    
    console.log(currentUser);
    
    function handleLogout(e) {
        e.preventDefault();
        logout();
    }

    return (
        <nav className="navbar">
            <Link className="main" to="/">The Blogger</Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
                {
                    currentUser ?
                        <Link onClick={handleLogout}>Log Out</Link> :
                        <Link to='/login'>Login / Sign Up</Link>
                }
            </div>
        </nav>
    );
}

export default Navbar;