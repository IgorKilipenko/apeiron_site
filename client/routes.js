import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, 
  NavLink
} from 'react-router-dom';

const Home = () => (
  <div>
    HOME
  </div>
);

const Roster = () => (
  <div>
    Roster
  </div>
);

export default () => (
  <Router>
    <div>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/roster'>Roster</NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/roster' component={Roster} />
      </Switch>
    </div>
  </Router>
);