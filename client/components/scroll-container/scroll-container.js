import React from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import s from './scroll-container.css';

const styles = theme => ({
    content: {
        width: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        /*flexGrow: 1,*/
        //backgroundColor: theme.palette.background.default,
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
    contentLeft: {
        marginLeft: -theme.customValues.drawerWidth,
        height: '100%'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    contentShiftLeft: {
        marginLeft: 0
    }
});

//@inject('routing')
//@withRouter
//@observer
class ScrollContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        windowHeight: 0,
        mouseWheel: 0
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

    render() {
        const { classes, open, handleMouseWheel} = this.props;
        /*var childrenWithProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, { ref: (n) => this.childSection}));*/
        //var childrenWithProps = React.Children.map(this.props.children, child =>
        // React.cloneElement(child, { ref: (n) => this.childSection}));
        return (
            <main
                onWheel={(event) => {this.props.handleMouseWheel(event)}}
                className={classNames(
                    classes.content,
                    classes.contentLeft,
                    {
                        [classes.contentShift]: open,
                        [classes.contentShiftLeft]: open
                    },
                    s['container-background']
                )}
            >
                {React.cloneElement(this.props.children, {
                    ref: n => (this.childSection = n)
                })}
            </main>
        );
    }
}

ScrollContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ScrollContainer);


