import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import { useState } from 'react';
import NotFound from './NotFound';
import Users from './Users.js';
import Login from './Login';
import Signup from './Signup';
import { AuthProvider } from './provider/AuthContext';

// npx json-server --watch data/db.json --port 8000

// var x= "<p>Hello</p>"
// <div dangerouslySetInnerHTML={{ __html: x }} />

function App() {

    return (
        <Router>
            <div className="App">
                <AuthProvider>
                    <Navbar />
                    <div className="content">
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/signup">
                                <Signup />
                            </Route>
                            <Route path="/create">
                                <Create />
                            </Route>
                            <Route path="/blogs/:id">
                                <BlogDetails />
                            </Route>
                            <Route path="/users">
                                <Users />
                            </Route>
                            <Route path="*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </div>
                </AuthProvider>
            </div>
        </Router>
    );
}

export default App;