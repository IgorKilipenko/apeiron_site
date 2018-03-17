import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
    products
} from '../../stores/products-store';
import {Route, Switch} from 'react-router-dom';

import ProductInfo from '../product-info/product-info';


import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const productsQuery = gql`
    query Query {
        catalog {
            id
            title
            description
            content
            category {
                title
            }
            metaTitle
            metaDescription
            group {
                title
            }
            image
        }
    }
`;


@graphql(productsQuery)
@inject('routing')
@inject('uiStore')
@withRouter
@observer
export default class Products extends React.Component {
    componentWillMount(){
        const {route, routing} = this.props;
        //routing.updateRoute(route.path);
        //console.log({routeMount: route})
        routing.update(route);
    }
    findById = (id) =>{
        if (id == null) return null
        const product = products.find(p => p.id == id);
        return product;
    }
    transformProduct = (product) => {
        const image = products.find(p => p.id == product.id).img;
        return {...product, image};
    }
    render() {
        const { data: { catalog, refetch } } = this.props;
        console.log({data: this.props.data})
        if (this.props.data.loading  || (!catalog || !catalog.length === 0) && refetch() ) return <div>LOADING</div>
        //console.log({...this.props});
        console.log({catalog})
        const routes = catalog.map(product => {
            return (
            {
                path:'/Продукция/' + product.id,
                mame: product.title,
                component: ProductInfo,
                product
            })
        })
        return (
            <Switch>
                {
                    routes.map((route, i, products) => (
                        <Route key={i} path={route.path} render={props => <route.component {...props} route={route} routes={routes} products={products} product={route.product} />} />
                    ))
                }
            </Switch>
        );
    }
}
