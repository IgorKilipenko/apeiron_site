import React from 'react';

import Index from './views/home/index'
import App from './views/app';
import Slider from './components/image-slider/image-slider';
import ProductInfo from './views/product-info/product-info';
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
                name: 'doors',
                path: '/Фурнитура-входных-групп',
                component: () => <div>Фурнитура-входных-групп</div>
            },
            {
                name: 'windows',
                path: '/Фурнитура-для-окон',
                component: () => <div>Фурнитура-для-окон</div>
            },
            {
                name: 'products',
                exact: false,
                path: '/Продукция/:product',
                component: ProductInfo
            }

        ]
    }
]
export default routes;

export const ScrollRouter = (props) => {
    const scrollRoutes = routes[0].routes;
    return (
            scrollRoutes.map((route,i) => (
                <Route key={i} exact={route.exact} path={route.path} render={props => props.match && <route.component {...props} route={route} routes={route.routes}/>} />
            ))
    )
}
