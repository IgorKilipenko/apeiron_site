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
import apeironLogo from '../../public/logo-menu.svg';

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
    menuLogo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        filter: 'drop-shadow(12px 12px 7px rgba(0,0,0,0.5))',
        [`& #${apeironLogo.id} svg path`]: {
            stroke: 'white !important'
        },
    },
    logoContainer: {
        position: 'absolute',
        top: 200,
        left: 250,
        height: '100px',
        width: '100px',
        zIndex: 99999,
    },
    [`#${apeironLogo.id} svg path`]: {
        stroke: 'white !important'
    },
});

// Решение времменое! надо исправить - выделение активного элемнта!!
export const menuUrls = {
    products: {
        for_windows: '/Фурнитура-системы-Provedal',
        for_doors: '/Фурнитура-входых-групп'
    }
};

const Menu = ({ classes, open, onClick }) => (
    <React.Fragment>
                <div className={classes.logoContainer} >  
            <svg id="logo1" className={classes.menuLogo} viewBox={apeironLogo.viewBox}>
                <use xlinkHref={`#${apeironLogo.id}`} stroke="red" xmlns="http://www.w3.org/2000/svg"/>
            </svg>
        </div>
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
    </React.Fragment>
);

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Menu);
