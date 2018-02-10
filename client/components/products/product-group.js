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
    boxSizing: 'border-box',
    width: '50%',
    height: '100%',
    border: '1px solid #e5e5e5',
    boxShadow: 'none',
    transition: theme.transitions.create('all'),
    position: "relative",

  },
  media: {
    height: '70%',
    //[theme.breakpoints.down("sm")]: {
    //  height: 200
    //},
    backgroundSize: 'contain'
  },
});


class ProductGroup extends React.Component {
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
          {/*<span className={classes.imageBackdrop} />*/}
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

ProductGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired
};

export default withStyles(styles)(ProductGroup);