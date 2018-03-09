import React from 'react';
import _ from 'lodash';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    NavLink,
    withRouter
} from 'react-router-dom';
import { menuUrls } from './components/menu/menu';

import App from './views/app';
import Index, { WindowsProducts, DoorsProducts } from './views/home/index';
import ProductGroup from './components/products/product-group';
import Slider from './components/image-slider/image-slider';
import Catalog, {
    productListDoors,
    productListWindows
} from './stores/products-store';
import ProductInfo from './views/product-info/product-info';

class RoutesConfig {
    routes = {
        index: {
            id: 0,
            path: '/',
            component: Index,
            exact: true,
            scrollOrder: 0,
            childRoutes: {
                slider: {
                    id: 1,
                    path: '/Галерея',
                    component: Slider,
                    scrollOrder: 1
                },
                doors: {
                    path: '/Продукция/Фурнитура-входных-групп',
                    component: () => <div>Фурнитура-входных-групп</div>,
                },
                windows: {
                    path: '/Продукция/Фурнитура-для-окон',
                    component: () => <div>Фурнитура-для-окон</div>
                },

            }
        },
        products: {
            id: 2,
            path: '/Продукция/:product',
            component: ProductInfo
        }
    }
    traverse = (obj, func, res=[], parent=null) => {
        let i = 0;
        for (const [key, val] of Object.entries(obj)){
            //console.log(key, val);
            if (_.isObject(val)) {
                if (val.hasOwnProperty('childRoutes')){
                    this.traverse(val.childRoutes, func, res, val)
                }
                res.push(func(key, val, parent,  i++));
            }
        };
        return res;
    }

    forEachRoute = (func) => {
        return this.traverse(this.routes, func);
    }
}
export const routes = () => {
    return routesConfig.forEachRoute((name, route, parent) => ({...route, name, parentRoute: parent}));
};

export const routesConfig = new RoutesConfig(); 

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                {/*
                {routes().map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={props => (
                            <route.component {...props} route={route}>
                                {route.routes
                                    ? route.routes.map((r, i) => (
                                          <Route
                                              key={i}
                                              path={route.path + r.path}
                                              exact={r.exact}
                                              //component={r.component}
                                              render={props => {
                                                  <r.component
                                                      {...props}
                                                      route={r}
                                                  />;
                                              }}
                                          />
                                      ))
                                    : null}
                            </route.component>
                        )}
                    />
                ))}
            */}

            {
                routesConfig.forEachRoute((name, route, i) => (
                    React.createElement(Route, {...this.props, key:i, exact:route.exact, path:route.path, render: props => <route.component {...props} route={{...route, name}}/>} )
                ))
            }
            </Switch>
        );
    }
}
