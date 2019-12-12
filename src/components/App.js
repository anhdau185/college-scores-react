import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import { EntranceScore } from './EntranceScore';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route path="/entrannce_score" component={EntranceScore}/>
            </Switch>
        </Router>   
    );
}

export default App;