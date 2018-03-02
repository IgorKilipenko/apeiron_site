import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { Helmet } from 'react-helmet';

import Menu, { menuUrls } from '../components/menu/menu';
import TopBar from '../components/app-bar/app-bar';
import ScrollContainer from '../components/scroll-container/scroll-container';
import ProductList from '../components/products/product-list';
import ProductItem from '../components/products/product-item';
import Logo from '../components/main-logo/main-logo';

import './global.css';
import prodItemImg from '../public/imgs/products/ruch.png';

const styles = theme => ({
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: `100%`,
        height: '100%',
        //color: theme.palette.text.primary
    }
});

@inject('routing')
//@inject('scrollRouting')
@withRouter
@observer
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        open: document.body.clientWidth >= 600,
        //windowHeight: 0
    };

    handleResize() {
        
//        this.setState({
//            windowHeight: window.innerHeight
//        });
//        console.log({ window: window, routing: this.props.routing });

        this.setState( {breakpoint: this._getBreakpoint(window.innerWidth)});
    }

    _getBreakpoint(width){
        if (width <= 600){
            return 'xs'
        }
        if (width > 600 && width <= 960 ){
            return 'sm'
        }
        if (width > 960 && width <= 1280 ){
            return 'md'
        }
        if (width > 1280 && width <= 1920 ){
            return 'lg'
        }
        if (width > 1920 ){
            return 'xl'
        }
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        setTimeout(() => this.setState({menuOpened: true}), 300);
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

    handleMouseWhell = (event) => {
        if (event.type){
            event.preventDefault();
        }
        const { routing } = this.props;
        if (event.deltaY > 0) {
            //props.routing.push(route.next.path);
            routing.goNext();
        } else if (event.deltaY < 0) {
            //props.routing.push(route.prev.path);
            routing.goPrev();
        }
    }

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;
        //const { location, push, goBack } = this.props.routing;

        return (
            <div className={classes.appFrame}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Апейрон</title>
                    {/*<meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />*/}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                    />
                    <link 
                        href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:300,300i,400,400i,500,500i,600,600i&amp;subset=cyrillic" 
                        rel="stylesheet"
                    />
                </Helmet>
                {/*<TopBar open={open} handleDrawerOpen={this.handleDrawerOpen} />*/}
                {/*<Menu open={open} onClick={this.handleDrawerClose} />*/}
                <Logo opened={this.state.menuOpened}/>
                <ScrollContainer open={open} routing={this.props.routing} handleMouseWheel={this.handleMouseWhell}>
                    {this.props.children}
                </ScrollContainer>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
