import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import MenuIcon from "material-ui-icons/Menu";
import IconButton from "material-ui/IconButton";
import classNames from "classnames";
import Toolbar from "material-ui/Toolbar";
import AppBar from "material-ui/AppBar";

import logo from "../../public/logo.svg";

const drawerWidth = 240;
const appBarHeight = '64px';
const styles = theme => ({
  appBar: {
    position: "absolute",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "#000000" //Надо настроит в теме на черный цвет!!
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  "appBarShift-left": {
    marginLeft: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  imgLogo: {
    maxHeight: 50,
    margin: 6
  },

});

const TopBar = ({classes, open, handleDrawerOpen}) => (
    <AppBar className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
        [classes[`appBarShift-left`]]: open
      })}>
      <Toolbar disableGutters={!open} className={classes.toolBarRoot}>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide)}>
          <MenuIcon />
        </IconButton>
        <img className={classNames(classes.imgLogo)} src={logo} alt="Апейрион" />
      </Toolbar>
    </AppBar>
);

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  export default withStyles(styles, { withTheme: true })(TopBar);