import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import { NavLink } from 'react-router-dom';
import Divider from 'material-ui/Divider';

const styles = theme => ({
    image: {
        boxSizing: 'border-box',
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
        /*height: `calc(${100 / 3}% - 0px)`,
        width: `calc(${100 / 3}% - 0px)`,
        [theme.breakpoints.down('xs')]: {
            width: '50%',
            height: '50%'
        },*/
        '&:hover': {
            zIndex: 1
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15
        }
    },
    imageSrc: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height:'100%',
        width: '100%',
        //bottom: '20%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 40%'
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#0366d6',
        opacity: 0.0,
        transition: theme.transitions.create('opacity'),
        [theme.breakpoints.down('sm')]: {
            height: 200
        }
    },
    productTitle: {
        position: 'relative',
        bottom: 0,
        //left: '50%',
        lineHeight: 1,
        
    }
});

const ProductItem = ({ to: toComponent, classes, imgUrl, product }) => (
    <ButtonBase
        focusRipple
        className={classes.image}
        component={props => <NavLink to={toComponent ? toComponent : ''} {...props} />}
    >
        <span
            className={classes.imageSrc}
            style={{
                backgroundImage: `url(${imgUrl})`
            }}
        />
        <span className={classes.imageBackdrop} />
        <Divider />
        <Typography className={classes.productTitle} variant="body2" gutterBottom align="center">
            <span>{product.title}</span>
        </Typography>
    </ButtonBase>
);

ProductItem.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductItem);
