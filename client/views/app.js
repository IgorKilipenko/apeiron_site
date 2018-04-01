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
import { renderRoutes } from 'react-router-config';

import Menu from '../components/menu/menu';
import ScrollContainer from '../components/scroll-container/scroll-container';
import ProductList from '../components/products/product-list';
import ProductItem from '../components/products/product-item';
import Logo from '../components/main-logo/main-logo';

//import './global.css';
import prodItemImg from '../public/imgs/products/ruch.png';

const styles = theme => ({
    '@global': {
        body: {
            height: 'inherit',
            width: 'inherit',
            padding: 0,
            margin: 0,
            color: theme.palette.text.primary
        },
        html: {
            height: '100%',
            width: '100%',
            position: 'relative',
            padding: 0,
            margin: 0
        },
        '#app': {
            height: 'inherit',
            width: 'inherit',
            position: 'relative',
        },
        a: {
            textDecoration: 'none'
        },
    },
    root:{
        width: '100%', //`calc(100% - ${theme.customValues.drawerWidth}px)`,
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: `100%`,
        height: '100%',
        //color: theme.palette.text.primary
    },
    loader: {
        position: 'absolute',
        left:0,
        top:0,
        bottom: 0,
        right: 0,
        height: '100%',
        width: '100%',
        zIndex: 99999,
        opacity: 1,
        backgroundColor: 'white',
        //transition: 'none'
    },
    hiddenLoader: {
        //opacity: 0,
        transform: 'translateX(100%)',
        //zIndex:0
        transition: theme.transitions.create(['opacity', 'transform'])
    }

});

@inject('routing')
@inject('uiStore')
@withRouter
@observer
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleResize() {
        this.props.uiStore.setBreakpoint(this._getBreakpoint(window.innerWidth/*document.body.clientWidth*/));
        console.log({resize:window.innerWidth/*document.body.clientWidth*/})
        alert(window.innerWidth);
    }

    _getBreakpoint = (width) => {
        //console.log({innerWidth: width});
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
        const { routing } = this.props;
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        this.viewLoader();
        setTimeout(() => {
            this.setState({menuOpened: true})
        }, 0);
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
            //event.preventDefault();
        }

        this.scrollRoute(event.deltaY);

    }

    scrollRoute = (deltaY) => {
        const { routing } = this.props;
        if (!routing.isScroll) {
            return;
        }
        if (deltaY > 0) {
            //props.routing.push(route.next.path);
            this.viewLoader();
            routing.goNext();
            
        } else if (deltaY < 0) {
            //props.routing.push(route.prev.path);
            this.viewLoader();
            routing.goPrev();
        }
    }

    viewLoader(){
        this.setState({pageLoaded: false});
        setTimeout(() => {
            this.setState({pageLoaded: true})
        }, 1000);
    }

    render() {
        const { classes, theme, route, uiStore } = this.props;

        return (
            <div className={classes.appFrame}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Апейрон</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                    />
                    <link 
                        href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:300,300i,400,400i,500,500i,600,600i&amp;subset=cyrillic" 
                        rel="stylesheet"
                    />
                    
                </Helmet>
                <Logo opened={this.state.menuOpened}/>
                <div className={classes.root}>
                    <Menu/>
                    <ScrollContainer handleMouseWheel={this.handleMouseWhell} breakpoint={uiStore.getBreakpoint}>
                        {this.props.children}                   
                    </ScrollContainer>
                </div>

            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
