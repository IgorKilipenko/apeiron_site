import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import ProductGroup from '../../components/products/product-group';
import ProductList from '../../components/products/product-list';
import ProductItem from '../../components/products/product-item';
import { productListDoors, productListWindows } from '../../stores/products-store';

import doorImg from '../../public/imgs/doors.png';
import prodItemImg from '../../public/imgs/products/ruch.png';
import { isArray } from 'util';

const styles = theme => ({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        /*flexWrap: 'wrap',*/
        //[theme.breakpoints.down("sm")]: {
        //  flexDirection:'column',
        //  },
        height: '100%'
    }
});

export const WindowsProducts = () => (
    <ProductList>
        {productListDoors.map(
            product =>
                isArray(product) ? (
                    <ProductItem key={product[0].id} imgUrl={product[0].img} product={product[0]} />
                ) : (
                    <ProductItem key={product.id} imgUrl={product.img} product={product} />
                )
        )}
    </ProductList>
);

export const DoorsProducts = () => (
    <ProductList>
        {productListWindows.map(
            product =>
                isArray(product) ? (
                    <ProductItem key={product[0].id} imgUrl={product[0].img} product={product[0]} />
                ) : (
                    <ProductItem key={product.id} imgUrl={product.img} product={product} />
                )
        )}
    </ProductList>
);

class Index extends React.Component {
    constructor(props){
        super(props);
    }
    url = 'test';
    render() {
        return (
            <section className={this.props.classes.flexContainer}>
                <ProductGroup revers={true}>
                    {productListDoors.map(
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
                </ProductGroup>
                <ProductGroup colored={true}>
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
                </ProductGroup>
            </section>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Index);
