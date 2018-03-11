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
                exact: false,
                scrollOrder: 0,
                routes: [
                    {
                        name: 'products',
                        path: '/:product',
                        component: ProductInfo
                    }
                ]
            },
            {
                name: 'contacts',
                path: '/Контакты',
                component: props => <Contacts {...props} isMarkerShown 
                loadingElement={<div style={{ height: `100%` }} />} 
                containerElement={<div style={{ height: `100%` }} />} 
                mapElement={<div style={{ height: `100%` }} />}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.google.mapKey}&v=3.exp&libraries=geometry,drawing,places`}/>
            },
            {
                name: 'slider',
                id: 1,
                path: '/Галерея',
                component:  Slider,
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

        ]
    }
]
export default routes;

export const ScrollRouter = (props) => {
    const scrollRoutes = routes[0].routes;
    return (
        <Switch>
            {scrollRoutes.map((route,i) => (
                <Route key={i} exact={route.exact} path={route.path} render={props => <route.component {...props} route={route} routes={route.routes}/>} />
            ))}
        </Switch>
    )
}
