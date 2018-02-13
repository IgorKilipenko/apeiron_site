import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import Menu, { menuUrls } from '../components/menu/menu';
import TopBar from '../components/app-bar/app-bar';
import ProductList from '../components/products/product-list';
import ProductItem from '../components/products/product-item';

import './global.css';
import prodItemImg from '../public/imgs/products/ruch.png';

const drawerWidth = 240;
const styles = theme => ({
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        width: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        /*flexGrow: 1,*/
        backgroundColor: theme.palette.background.default,
        //padding: theme.spacing.unit * 3,
        //overflowY: 'scroll',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        height: 'calc(100% - 56px)',
        paddingTop: 56,
        /*[`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {   // Добавил
      minHeight: 48,
    },*/
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            paddingTop: 64
        }
    },
    'content-left': {
        marginLeft: -drawerWidth,
        height: '100%'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    'contentShift-left': {
        marginLeft: 0
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        open: document.body.clientWidth >= 600,
        windowHeight: 0,
    };

    handleResize() {
        this.setState({
            windowHeight: window.innerHeight
        });
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChangeAnchor = event => {
        this.setState({
            anchor: event.target.value
        });
    };

    hanglerMouseWhell = event => {

    }

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.appFrame}>
                <TopBar open={open} handleDrawerOpen={this.handleDrawerOpen} />
                <Menu open={open} onClick={this.handleDrawerClose} />
                <main onWheel={event => {console.log(`wellY=${event.deltaY}`)}}
                    className={classNames(classes.content, classes[`content-left`], {
                        [classes.contentShift]: open,
                        [classes[`contentShift-left`]]: open
                    })}
                >
                    {this.props.children}
                </main>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
