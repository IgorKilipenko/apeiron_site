import React from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const styles = theme => ({
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

    handleMouseWheel(event, props) {
        const { routing } = props;
        console.log(this.childSection);
        console.log(routing)
        if (event.deltaY > 0) {
            props.routing.push('/page2');
        } else if (event.deltaY < 0) {
            props.routing.go(-1);
        }
    }

    getNextPage(routes) {
    }

    render() {
        const { classes, open, routing } = this.props;
        /*var childrenWithProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, { ref: (n) => this.childSection}));*/
        //var childrenWithProps = React.Children.map(this.props.children, child =>
        // React.cloneElement(child, { ref: (n) => this.childSection}));
        return (
            <main
                onWheel={event => {
                    this.handleMouseWheel(event, this.props);
                }}
                className={classNames(
                    classes.content,
                    classes[`content-left`],
                    {
                        [classes.contentShift]: open,
                        [classes.contentShiftLeft]: open
                    }
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
