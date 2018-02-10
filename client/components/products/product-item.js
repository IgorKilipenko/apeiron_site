import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
    image: {
        border: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
        boxSizing: 'border-box',
        position: 'relative',
        height: `calc(${100/4}% - 0px)`,
        width: `calc(${100/4}% - 0px)`,
        [theme.breakpoints.down('xs')]: {
          width: '50%',
          height: '50%',
        },
        '&:hover': {
          zIndex: 1,
        },
        /*'&:hover $imageBackdrop': {
          opacity: 0.15,
        },*/
      },
      imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 40%',
      },
});

const ProductItem = ({to: toComponent, classes, imgUrl }) => (
    <ButtonBase focusRipple className={classes.image}
    component={props => <NavLink to={toComponent ? toComponent : ''} {...props} />}>
      <span
        className={classes.imageSrc}
        style={{
          backgroundImage: `url(${imgUrl})`
        }}
      />
      <span className={classes.imageBackdrop} />
    </ButtonBase>
);

ProductItem.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(ProductItem);