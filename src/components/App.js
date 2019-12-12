import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/home" component={Home} />
            </Switch>
        </Router>
    );
}

export default App;