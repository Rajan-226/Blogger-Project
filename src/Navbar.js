import { Link } from 'react-router-dom';
import { useAuth } from './provider/AuthContext';
import { Heading, Button } from "@chakra-ui/react"
import { Pane } from 'evergreen-ui'
const Navbar = () => {

    const { currentUser, logout } = useAuth();

    function handleLogout(e) {
        e.preventDefault();
        logout();
    }

    return (
        <nav className="navbar">
            <img height="50px" width="70px" style={{ display: 'inline' }} src="logo.png" />
            <Link style={{ margin: '0' }} className="main" to="/"><Heading color="#222831">The Blogger</Heading></Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>

                {
                    currentUser ?
                        <Link onClick={handleLogout}>
                            <Button _hover={{ bg: "#F05454" }} size="lg" bgColor="#222831" color="white">Log Out</Button>
                        </Link> :
                        <Link to='/login'>
                            <Button border="none" size="md" _hover={{ bg: "#F05454" }} bgColor="#222831" color="white">Get Started</Button>
                        </Link>
                }
            </div >
        </nav >
    );
}

export default Navbar;