import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';
import { menuUrls } from './components/menu/menu';

import App from './views/app';
import Index, { WindowsProducts, DoorsProducts } from './views/home/index';
import ProductGroup from './components/products/product-group';

import prodItemImg from './public/imgs/products/ruch.png';

export default (props) => {
    /*if (props.nextPage){
        props.push(props.nextPage)
    } */
    return (
    <Switch>
        <Route exact path="/" component={Index} ref={(item) => testProps.item1 = item}/>
        <Route path={menuUrls.products.for_doors} component={DoorsProducts} />
        <Route path={menuUrls.products.for_windows} component={WindowsProducts} />
        <Route path='/nextPage' component={() => <div>Next PAGE</div>} />
        <Route path='/prevPage' component={() => <div>Prev PAGE</div>} />
        <Route component={() => <div>Нет такой страницы</div>}/>
    </Switch>
    )
};
