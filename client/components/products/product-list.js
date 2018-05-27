import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        minWidth: 300,
        width: '100%',
        height: '100%',
    },
});

const ProductList = ({ children, classes }) => (
    <section className={classes.root}>
        {children}
    </section>
);

export default withStyles(styles)(ProductList); 