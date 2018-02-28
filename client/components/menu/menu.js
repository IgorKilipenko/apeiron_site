import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import door_icon from '../../public/icons/4hz79g8msi.gif';
import window_icon from '../../public/icons/q6s54q48gu.png';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: theme.customValues.drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    active: {
        textDecoration: 'none',
        backgroundColor: theme.palette.action.hover,
        // Reset on mouse devices
        '@media (hover: none)': {
            backgroundColor: 'transparent'
        }
    },
});


const Menu = ({ classes, open, onClick }) => (
    <Drawer
        variant="persistent"
        classes={{
            paper: classes.drawerPaper
        }}
        open={open}
    >


        <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={onClick}>{<ChevronLeftIcon />}</IconButton>
            </div>
            <Divider />
            <List>
                <ListItem
                    button
                    component={props => (
                        <NavLink
                            to={'/Продукция/Фурнитура-входных-групп'}
                            activeClassName={classes.active}
                            {...props}
                        />
                    )}
                >
                    <ListItemIcon>
                        <img src={door_icon} />
                    </ListItemIcon>
                    <ListItemText primary="Фурнитура для входных групп" />
                </ListItem>
                <ListItem
                    button
                    component={props => (
                        <NavLink
                            to={'/Продукция/Фурнитура-для-окон'}
                            activeClassName={classes.active}
                            {...props}
                        />
                    )}
                >
                    <ListItemIcon>
                        <img src={window_icon} />
                    </ListItemIcon>
                    <ListItemText primary="Фурнитура для системы Provedal" />
                </ListItem>
            </List>
            <Divider />
            <List>{mailFolderListItems}</List>
            <Divider />
            <List>{otherMailFolderListItems}</List>
        </div>
    </Drawer>
);

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Menu);
