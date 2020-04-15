import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Note from './Note';
import NewNote from './NewNote';
import EditNote from './EditNote';
import Home from './Home';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/edit/:noteId">
                        <EditNote />
                    </Route>
                    <Route path="/create">
                        <NewNote />
                    </Route>
                    <Route path={`/:noteId`}>
                        <Note />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
