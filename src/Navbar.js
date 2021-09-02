import { Link } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';
import { Heading } from "@chakra-ui/react"
import { Pane } from 'evergreen-ui'
const Navbar = () => {

    const { currentUser, logout } = useAuth();

    function handleLogout(e) {
        e.preventDefault();
        logout();
    }

    return (
        <nav className="navbar">
            <Link className="main" to="/"><Heading>The Blogger</Heading></Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>

                {
                    currentUser ?
                        <Link onClick={handleLogout}>
                            <Pane display="inline" background="black" padding="15px" borderRadius="50px" color="white" fontWeight="bold">Log Out</Pane>
                        </Link> :
                        <Link to='/login'>
                            <Pane display="inline" background="black" padding="15px" borderRadius="50px" color="white" fontWeight="bold">Get Started</Pane>
                        </Link>
                }
            </div >
        </nav >
    );
}

export default Navbar;