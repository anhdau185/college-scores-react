import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import { EntranceScore } from './EntranceScore';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/entrannce_score" component={EntranceScore}/>
            </Switch>
        </Router>   
    );
}

export default App;