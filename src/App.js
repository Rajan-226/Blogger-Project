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


function App() {

    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <Navbar />
                    <div className="content">
                        <Switch>
                            <Route exact path="/" >
                                <Home />
                            </Route>

                            <PrivateRoute wantUser={false} path="/login">
                                <Login />
                            </PrivateRoute>

                            <PrivateRoute wantUser={false} path="/signup">
                                <Signup />
                            </PrivateRoute>

                            <PrivateRoute wantUser={true} component={Create} path="/create" />

                            <Route path="/blogs/:id">
                                <BlogDetails />
                            </Route>

                            <Route path="*">
                                <NotFound />
                            </Route>

                        </Switch>
                    </div>
                </AuthProvider>
            </div >
        </Router >
    );
}

export default App;