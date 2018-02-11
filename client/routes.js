import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';
import { menuUrls } from './components/menu/menu';

import App from './views/app';
import Index, { WindowsProducts, DoorsProducts } from './views/home/index';
import ProductGroup from './components/products/product-group';

import prodItemImg from './public/imgs/products/ruch.png';

export default () => (
    <div style={{ height: '100%' }}>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route path={menuUrls.products.for_doors} component={DoorsProducts} />
            <Route path={menuUrls.products.for_windows} component={WindowsProducts} />
        </Switch>
    </div>
);
