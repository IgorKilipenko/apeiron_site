import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, 
  NavLink
} from 'react-router-dom';
import {menuUrls} from './components/menu/menu';

import logo from './public/logo.svg'

import App from './views/app';

const WindowsProducts = () => (
  <section>
    Продукция Provedal
  </section>
)

const DoorsProducts = () => (
  <section>
    Продукция для входных групп
  </section>
)

export default () => (
    <div style={{'height': '100%'}}>
      <Switch>
        <Route path={menuUrls.products.for_windows} component={DoorsProducts}/>
        <Route path={menuUrls.products.for_doors} component={WindowsProducts} />
      </Switch>
    </div>
);