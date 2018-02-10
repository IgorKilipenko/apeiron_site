import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { NavLink } from 'react-router-dom';
import {menuUrls} from '../menu/menu';
import ButtonBase from 'material-ui/ButtonBase';

import './product-item-animation.css';

const styles = theme => ({
  card: {
    //maxWidth: '100%',
    width: `calc(50% - ${theme.spacing.unit * 3}px)`,
    minWidth: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
    },
    transition: theme.transitions.create('all'),
    position: "relative",
    "&:hover": {
      zIndex: 1,
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      [theme.breakpoints.up("sm")]: {
        transform: 'translate(0,-5px)',
      }
    },
    "&:hover $imageBackdrop": {
      opacity: 0.2
    }
  },
  media: {
    height: 400,
    [theme.breakpoints.down("sm")]: {
      height: 200
    }
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0366d6",
    opacity: 0.0,
    transition: theme.transitions.create("opacity"),
    [theme.breakpoints.down("sm")]: {
      height: 200
    }
  },
  active: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 999,
    "& $imageBackdrop": {
      opacity: 0.0,
      height: 0,
      width: 0
    }
  },
  // Animation
  enter: {
    opacity: 0.01,
    transform: "scaleX(0)",
    "& enterActive": {
      opacity: 1,
      transition: "all 500ms ease-in"
    }
  },
  leave: {
    opacity: 1,
    "& leaveActive": {
      opacity: 0.01,
      transition: "all 300ms ease-in"
    }
  },
});


class ProductGroupWindows extends React.Component {
  state = { active: false};
  render() {
    const { classes, to, imgSrc } = this.props;
    return (
      <Card className={this.state.active ? classes.active : classes.card}>
        <CardMedia
          
          className={classes.media}
          image={imgSrc}
          title="Фурнитура для входных групп"
        >
          <span className={classes.imageBackdrop} />
        </CardMedia>
        <CardContent>{this.props.children}</CardContent>
        <CardActions>
          <Button
            component={props => <NavLink to={to} {...props} />}
            size="small"
            color="primary"
          >
            Детали
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ProductGroupWindows.propTypes = {
  classes: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired
};

export default withStyles(styles)(ProductGroupWindows);