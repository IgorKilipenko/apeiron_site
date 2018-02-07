import React from 'react';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import { mailFolderListItems, otherMailFolderListItems } from './tileData'


export default ({classes}) => (
  <Drawer
    variant="persistent"
    classes={{
      paper: classes.drawerPaper,
    }}
    anchor={anchor}
    open={open}
  >
    <div className={classes.drawerInner}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={this.handleDrawerClose}>
          {<ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>{mailFolderListItems}</List>
      <Divider />
      <List>{otherMailFolderListItems}</List>
    </div>
  </Drawer>
);
