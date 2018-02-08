import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, 
  NavLink
} from 'react-router-dom';
import logo from './public/logo.svg'

import App from './views/app';
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
    <div style={{'height': '100%'}}>
      <header>
        <img src={logo} className="AppLogo" alt="apeiron"/>
      </header>
      <ul>
        <li>
          <NavLink to='/home'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/roster'>Roster</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/roster' component={Roster} />
      </Switch>
    </div>
);