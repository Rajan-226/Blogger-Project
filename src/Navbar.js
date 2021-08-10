import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link className="main" to="/">The Blogger</Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
                <Link to='/Users'>Users</Link>
                <Link to='/AddUser'>Add User</Link>
            </div>
        </nav>
    );
}

export default Navbar;