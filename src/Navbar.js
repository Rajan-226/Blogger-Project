import { Link } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';
import { Heading, Button } from "@chakra-ui/react"
import * as Constants from './Constants';

const Navbar = () => {

    const { currentUser, logout } = useAuth();

    function handleLogout(e) {
        e.preventDefault();
        logout();
    }

    return (
        <nav className="navbar">

            <img height="50px" width="70px" style={{ display: 'inline' }} src="/logo.png" />
            <Link style={{ margin: '0' }} className="main" to="/"><Heading color={Constants.primary_color}>The Blogger</Heading></Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>

                {
                    currentUser ?
                        <Link onClick={handleLogout}>
                            <Button _hover={{ bg: Constants.accent_color }} size="lg" bgColor={Constants.primary_color} color="white">Log Out</Button>
                        </Link> :
                        <Link to='/login'>
                            <Button border="none" size="lg" _hover={{ bg: Constants.accent_color }} bgColor={Constants.primary_color} color="white">Get Started</Button>
                        </Link>
                }
            </div >
        </nav >
    );
}

export default Navbar;