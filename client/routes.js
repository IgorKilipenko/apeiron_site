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
import Index from './views/home/index';
import ProductGroup from './components/products/product-group';
import ProductList from "./components/products/product-list";
import ProductItem from "./components/products/product-item";

import prodItemImg from "./public/imgs/products/ruch.png";

const WindowsProducts = () => (
  <section>
  <ProductList>
  <ProductItem imgUrl={prodItemImg} />
  <ProductItem imgUrl={prodItemImg} />
  <ProductItem imgUrl={prodItemImg} />
  <ProductItem imgUrl={prodItemImg} />
  <ProductItem imgUrl={prodItemImg} />
  <ProductItem imgUrl={prodItemImg} />
  <ProductItem imgUrl={prodItemImg} />
</ProductList>
  </section>
)

const DoorsProducts = () => (
  <ProductList>
    <ProductItem imgUrl={prodItemImg} />
    <ProductItem imgUrl={prodItemImg} />
    <ProductItem imgUrl={prodItemImg} />
    <ProductItem imgUrl={prodItemImg} />
    <ProductItem imgUrl={prodItemImg} />
    <ProductItem imgUrl={prodItemImg} />
    <ProductItem imgUrl={prodItemImg} />
    <ProductItem imgUrl={prodItemImg} />
    <ProductItem imgUrl={prodItemImg} />
    <ProductItem imgUrl={prodItemImg} />
  </ProductList>
);

export default () => (
    <div style={{'height': '100%'}}>
      <Switch>
        <Route exact path='/' component={Index}/>
        <Route path={menuUrls.products.for_doors} component={DoorsProducts}/>
        <Route path={menuUrls.products.for_windows} component={WindowsProducts} />
      </Switch>
    </div>
);