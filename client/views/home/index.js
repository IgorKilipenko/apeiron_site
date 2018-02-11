import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import ProductGroup from '../../components/products/product-group';
import ProductList from '../../components/products/product-list';
import ProductItem from '../../components/products/product-item';
import { menuUrls } from '../../components/menu/menu';

import doorImg from '../../public/imgs/doors.jpg';
import prodItemImg from '../../public/imgs/products/ruch.png';

const styles = theme => ({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        /*flexWrap: 'wrap',*/
        //[theme.breakpoints.down("sm")]: {
        //  flexDirection:'column',
        //  },
        height: '100%',
    }
});

export const WindowsProducts = () => (
    <ProductList>
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
    </ProductList>
);

export const DoorsProducts = () => (
    <ProductList>
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
        <ProductItem imgUrl={prodItemImg} />
    </ProductList>
);

const Index = props => (
    <section className={props.classes.flexContainer} >
        <ProductGroup to={menuUrls.products.for_doors} imgSrc={doorImg} revers={true}>
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
        </ProductGroup>
        <ProductGroup to={menuUrls.products.for_windows} imgSrc={doorImg}>
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
            <ProductItem imgUrl={prodItemImg} />
        </ProductGroup>
    </section>
);

export default withStyles(styles, { withTheme: true })(Index);
