import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { NavLink } from 'react-router-dom';
import {menuUrls} from '../menu/menu';

import doorImg from '../../public/imgs/doors.jpg';

const styles = theme => ({
  card: {
    //maxWidth: '100%',
    width: `calc(50% - ${theme.spacing.unit * 3}px)`,
    minWidth: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 3
    },
    position: "relative",
    "&:hover": {
      zIndex: 1
    },
    "&:hover $imageBackdrop": {
      opacity: 0.0
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
    backgroundColor: theme.palette.common.black,
    opacity: 0.1,
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
  }
});


class ProductGroupWindows extends React.Component {
  state = {active:false};
  render(){
    const { classes } = this.props;
  return (
      <Card className={this.state.active? classes.active : classes.card}>
      
        <CardMedia
          className={classes.media}
          image={doorImg}
          title="Contemplative Reptile"
        >
        <span className={classes.imageBackdrop} />
        </CardMedia>
        <CardContent>
          <Typography variant="headline" component="h2">
            Фурнитура для входных групп 
          </Typography>
          <Typography component="p">
          - Закладные для систем КП-45
          - Петли дверные
          - Ручки бугельные
          - Нажимные гарнитуры
          - Переходники
          - Кондукторы
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={props => <NavLink to={menuUrls.products.for_windows} {...props}/>} size="small" color="primary">
            Детали
          </Button>
        </CardActions>
      </Card>
  )}
}

ProductGroupWindows.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductGroupWindows);