import React from 'react';

import Index from './views/home/index'
import App from './views/app';
import Slider from './components/image-slider/image-slider';
import ProductInfo from './views/product-info/product-info';
import Products from './views/products/products';
import Contacts from '../client/views/contacts/contacts';
import {Route, Switch} from 'react-router-dom';

import config from '../user.config';

const routes = [
        {
            name: 'Root',
            component: App,
            routes: [
            {
                name: 'index',
                path: '/',
                component: Index,
                exact: true,
                scrollOrder: 0,
                routes: [

                ]
            },
            {
                name: 'contacts',
                path: '/Контакты',
                component: Contacts
            },
            {
                name: 'slider',
                id: 1,
                path: '/Галерея',
                component: Slider,
                scrollOrder: 1
            },
            {
                name: 'products',
                noView : true,
                exact: false,
                path: '/Продукция',
                component: Products,
                routes:[]
            }

        ]
    }
]
export default routes;

export const ScrollRouter = (props) => {
    const scrollRoutes = routes[0].routes;
    return (
            scrollRoutes.map((route,i, branch) => (
                <Route key={i} exact={route.exact} path={route.path} render={props => props.match && <route.component {...props} route={route} routes={route.routes} branch={{routes:branch}}/>} />
            ))
    )
}
