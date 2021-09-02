import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Login from './Login';
import Signup from './Signup';
import { AuthProvider } from './provider/AuthContext';
import { ChakraProvider } from "@chakra-ui/react"


function App() {
    return (
        <ChakraProvider >
            <Router>
                <div className="App" >
                    <AuthProvider>
                        <Navbar />
                        <div className="content">
                            <Switch>
                                <Route component={Home} exact path="/" />
                                <PrivateRoute wantUser={false} component={Login} path="/login" />
                                <PrivateRoute wantUser={false} component={Signup} path="/signup" />
                                <PrivateRoute wantUser={true} component={Create} path="/create" />
                                <Route component={BlogDetails} path="/blogs/:id" />
                                <Route component={NotFound} path="*" />
                            </Switch>
                        </div>
                    </AuthProvider>
                </div >
            </Router >
         </ChakraProvider >
    );
}

export default App;