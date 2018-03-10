import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Route, Switch, withRouter } from 'react-router-dom';
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


const styles = theme => ({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        /*flexWrap: 'wrap',*/
        //[theme.breakpoints.down("sm")]: {
        //  flexDirection:'column',
        //  },
        height: 'calc(100% - 25%)'
    }
});

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const productsListQuery = gql`
    query Query {
        catalog {
            id
            title
            description
            content
            categoryId
            languageCode
            metaTitle
            metaDescription
            parentId
            parentTitle
        }
    }
`;
@graphql(productsListQuery)
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
        const {route, routing} = this.props;
        routing.updateRoute(route.path);
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

    render() {
        //console.log({props: this.props})
        //const {uiStore} = this.props;
        const pattern = /\s+/gi;
        const { data: { catalog, refetch } } = this.props;
        let prods = this._productsFilter();
        return (
            <React.Fragment>
                <section className={this.props.classes.flexContainer}>
                    <ProductGroup
                        revers={true}
                        title="Фурнитура для входных групп"
                    >
                        {catalog &&
                            prods
                                .filter(product => product.parentId === 24)
                                .map(product => {
                                    return (
                                        <ProductItem
                                            key={product.id}
                                            imgUrl={product.image}
                                            title={product.title}
                                            to={{
                                                pathname:
                                                    '/Продукция/Продукт-' +
                                                    product.title.replace(
                                                        pattern,
                                                        '-'
                                                    ),
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
                        {catalog &&
                            prods
                                .filter(product => product.parentId === 4)
                                .map(product => {
                                    return (
                                        <ProductItem
                                            key={product.id}
                                            imgUrl={product.image}
                                            title={product.title}
                                            to={{
                                                pathname:
                                                    '/Продукция/Продукт-' +
                                                    product.title.replace(
                                                        pattern,
                                                        '-'
                                                    ),
                                                state: { product: product }
                                            }}
                                        />
                                    );
                                })}
                    </ProductGroup>
                </section>
                <Slider />
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Index);
