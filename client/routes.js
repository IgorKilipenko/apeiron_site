import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch, 
  NavLink
} from 'react-router-dom';
import {menuUrls} from './components/menu/menu';


import App from './views/app';
import ProductGroup from './components/products/product-group';

const WindowsProducts = () => (
  <section>
    Продукция Provedal
  </section>
)

const DoorsProducts = () => (
  <section>
    Продукция фурнитура для входных групп
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