import React from 'react';

import Index from './views/home/index'
import App from './views/app';
import Slider from './components/image-slider/image-slider';
import ProductInfo from './views/product-info/product-info';
import Contacts from '../client/views/contacts/contacts';

import config from '../user.config';

export default [
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
                    {
                        name : 'test1',
                        path: '/test1',
                        component: () => <div>Test1</div>
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
            {
                name: 'products',
                path: '/:product',
                component: ProductInfo
            }
        ]
    }
]
