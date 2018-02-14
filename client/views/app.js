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
import FullpageWrapper from '../components/content-wrapper/fullpage-wrapper';
import ProductList from '../components/products/product-list';
import ProductItem from '../components/products/product-item';

import './global.css';
import prodItemImg from '../public/imgs/products/ruch.png';

const styles = theme => ({
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%'
    },
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
                <FullpageWrapper open={open}>
                    {this.props.children}
                </FullpageWrapper>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
