import React from 'react';
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
import {productListDoors, productListWindows} from './stores/products-store';
import ProductInfo from './components/products/product-info/product-info'

export const routesConfig = {
    index: {
        path: '/',
        component: Index,
        exact: true,
    },
    slider: {
        path: '/Галерея',
        component: Slider
    },
    doors: {
        path: '/Продукция/Фурнитура-входных-групп',
        component: () => <div>Фурнитура-входных-групп</div>,
        routes: [
            {
                path: '/np',
                component: () => <div>Nested page</div>,
                exact:true
            }
        ]
    },
    windows: {
        path: '/Продукция/Фурнитура-для-окон',
        component: () => <div>Фурнитура-для-окон</div>
    },
    page2: {
        path: '/page2',
        component: () => <div>Page 2</div>
    },
    products: {
        path:'/Продукция/:id',
        component: ({match}) => <ProductInfo match={match}>Product id:</ProductInfo>
    }
};
export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                {Object.values(routesConfig).map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={props => (
                            <route.component {...props} route={route}>
                                {route.routes
                                    ? route.routes.map((r, i) => (
                                          <Route
                                            key= {i}
                                              path={route.path + r.path}
                                              exact={r.exact}
                                              component={r.component}
                                          />
                                      ))
                                    : null}
                            </route.component>
                        )}
                    />
                ))}
            </Switch>
        );
    }
}
