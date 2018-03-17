import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { matchPath, Route, Switch, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { renderRoutes } from 'react-router-config';

import ProductGroup from '../../components/products/product-group';
import ProductList from '../../components/products/product-list';
import ProductItem from '../../components/products/product-item';
import {
    products,
    productListDoors,
    productListWindows
} from '../../stores/products-store';

import doorImg from '../../public/imgs/doors.png';
import prodItemImg from '../../public/imgs/products/ruch.png';
import Slider from '../../components/image-slider/image-slider';
import MapComponent from '../../components/map-component/map-component';
import { matchRoutes } from 'react-router-config'

const styles = theme => ({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        /*flexWrap: 'wrap',*/
        //[theme.breakpoints.down("sm")]: {
        //  flexDirection:'column',
        //  },
        height: 'calc(100% - 0%)'
    },
    footer: {
        height: '25%',
        width: '50%'
    }
});

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const productsListQuery = gql`
    query Query {
        catalog {
            id
            title
            category {
                title
            }
            group {
                title
            }
            image
        }
    }
`;
@graphql(productsListQuery, {options: { notifyOnNetworkStatusChange: true } })
@inject('routing')
@inject('uiStore')
@withRouter
@observer
class Index extends React.Component {
    constructor(props) {
        super(props);
        //this.props.data.refetch();
    }
    componentWillMount(){
        const {route, branch, routing} = this.props;
        routing.update(route, branch);
        console.log({routeMount: route})
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }
    _productsFilter() {
        const { data: { catalog, refetch } } = this.props;
        const buff = products.map(p => (Array.isArray(p) ? p[0] : p));
        const prods = catalog
            ? catalog.map(cat =>{
                const prod =
                  buff.find(
                      prod => cat.id == prod.id
                  )
                return prod && {...cat, image: prod.img }
            }).filter(cat => cat)
            : [];
        return prods;
    }

    rendeRoutes = () => {
        const {routes} = this.props
        if (routes){
            return routes.map((route, i) => <Route key={i} exact={route.exact} path={route.path} render={props => <route.component {...props} route={route} routes={route.routes}/>} />)
        }
        return {}
    } 


    render() {
        //console.log({props: this.props})
        //const {uiStore} = this.props;
        const pattern = /\s+/gi;
        const { data: { catalog, refetch }, classes } = this.props;
        console.log({indexData: this.props.data})
        //let prods = this._productsFilter();
        console.log({index:this.props})
        return (
            this.props.data.loading  || (!catalog || !catalog.length === 0) && refetch() ? <div>LOADING</div>
            :
            <React.Fragment>
                <section className={this.props.classes.flexContainer}>
                    <ProductGroup
                        revers={true}
                        title="Фурнитура для входных групп"
                    >
                        {catalog
                                .filter(product => product.category.title.match(/^Фурнитура для входных групп/))
                                .map(product => {
                                    return (
                                        <ProductItem
                                            key={product.id}
                                            imgUrl={require('../../public/imgs/products/' + product.image)}
                                            title={product.title}
                                            to={{
                                                pathname: '/Продукция/' + product.id,
                                                    //'/Продукция/Продукт-' +
                                                    //product.title.replace(
                                                    //    pattern,
                                                    //    '-'
                                                    //) + `_${product.id}`,
                                                state: { product: product }
                                            }}
                                        />
                                    );
                                })}
                    </ProductGroup>
                    <ProductGroup
                        colored={true}
                        title="Фурнитура для системы Provedal"
                    >
                        {catalog
                            .filter(product => product.category.title.match(/^Фурнитура для системы Provedal/))
                                .map(product => {
                                    return (
                                        <ProductItem
                                            key={product.id}
                                            imgUrl={require('../../public/imgs/products/' + product.image)}
                                            title={product.title}
                                            to={{
                                                pathname: '/Продукция/' + product.id,
                                                    //'/Продукция/Продукт-' +
                                                    //product.title.replace(
                                                    //    pattern,
                                                    //    '-'
                                                    //) + `_${product.id}`,
                                                state: { product: product }
                                            }}
                                        />
                                    );
                                })}
                    </ProductGroup>
                </section>

            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Index);
