import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Route, Switch, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import ProductGroup from '../../components/products/product-group';
import ProductList from '../../components/products/product-list';
import ProductItem from '../../components/products/product-item';
import {
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

export const WindowsProducts = () => (
    <ProductList>
        {productListDoors.map(
            product =>
                Array.isArray(product) ? (
                    <ProductItem
                        key={product[0].id}
                        imgUrl={product[0].img}
                        product={product[0]}
                    />
                ) : (
                    <ProductItem
                        key={product.id}
                        imgUrl={product.img}
                        product={product}
                    />
                )
        )}
    </ProductList>
);

export const DoorsProducts = () => (
    <ProductList>
        {productListWindows.map(
            product =>
                isArray(product) ? (
                    <ProductItem
                        key={product[0].id}
                        imgUrl={product[0].img}
                        product={product[0]}
                    />
                ) : (
                    <ProductItem
                        key={product.id}
                        imgUrl={product.img}
                        product={product}
                    />
                )
        )}
    </ProductList>
);

//@inject('uiStore')
//@observer
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }

    render() {
        //const {uiStore} = this.props;
        const pattern = /\s+/gi;
        return (
            <React.Fragment>
                <section className={this.props.classes.flexContainer}>
                    <ProductGroup
                        revers={true}
                        title="Фурнитура для входных групп"
                    >
                        {productListDoors.map(product => {
                            const p = Array.isArray(product)
                                ? product[0]
                                : product;
                            return (
                                <ProductItem
                                    key={p.id}
                                    imgUrl={p.img}
                                    product={p}
                                    to={{
                                        pathname: '/Продукция/Продукт-' + p.title.replace(pattern, '-'),
                                        state: {product: p}
                                    }}
                                />
                            );
                        })}
                    </ProductGroup>
                    <ProductGroup
                        colored={true}
                        title="Фурнитура для системы Provedal"
                    >
                        {productListWindows.map(product => {
                            const p = Array.isArray(product)
                                ? product[0]
                                : product;
                            return (
                                <ProductItem
                                    key={p.id}
                                    imgUrl={p.img}
                                    product={p}
                                    to={{
                                        pathname: '/Продукция/Продукт-' + p.title.replace(pattern, '-'),
                                        state: {product: p}
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
