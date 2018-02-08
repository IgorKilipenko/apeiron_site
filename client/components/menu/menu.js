import React from 'react';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import doorIcon from '../../public/icons/4hz79g8msi.gif';

const styles = theme => ({

  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

const drawerWidth = 240;

const Menu = ({ classes, anchor, open, onClick }) => (
  <Drawer
    variant="persistent"
    classes={{
      paper: classes.drawerPaper
    }}
    anchor={anchor}
    open={open}
  >
    <div className={classes.drawerInner}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClick}>{<ChevronLeftIcon />}</IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to='/test'> 
          <ListItemIcon>
            <img src={doorIcon}/>
          </ListItemIcon>
          <ListItemText primary="Фурнитура для входных групп" />
        </ListItem>
      </List>
      <Divider />
      <List>{mailFolderListItems}</List>
      <Divider />
      <List>{otherMailFolderListItems}</List>
    </div>
  </Drawer>
);

export default withStyles(styles, { withTheme: true })(Menu);