import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BlogDetails from './BlogDetails';
import { useState } from 'react';
import NotFound from './NotFound';
import Users from './Users.js';
import AddUser from './AddUser.js';
import Temp from './Temp.js';
// npx json-server --watch data/db.json --port 8000

function App() {

    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home />
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
                        <Route path="/AddUser">
                            <AddUser />
                        </Route>
                        <Route path="/Temp">
                            <Temp />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;