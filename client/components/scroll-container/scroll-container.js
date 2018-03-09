import React from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';


const styles = theme => ({
    content: {
        width: `calc(100% - ${theme.customValues.drawerWidth}px)`,
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
        height: '100%', //'calc(100% - 56px)',
        paddingTop: 0, //56,
        /*[`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {   // Добавил
      minHeight: 48,
    },*/
//        [theme.breakpoints.up('sm')]: {
//            height: 'calc(100% - 64px)',
//            paddingTop: 64
//        }
    },
//    contentLeft: {
//        marginLeft: -theme.customValues.drawerWidth,
//        height: '100%'
//    },
//    contentShift: {
//        transition: theme.transitions.create('margin', {
//            easing: theme.transitions.easing.easeOut,
//            duration: theme.transitions.duration.enteringScreen
//        })
//    },
//    contentShiftLeft: {
//        marginLeft: 0
//    }
});

//@inject('routing')
//@withRouter
//@observer
class ScrollContainer extends React.Component {
    constructor(props) {
        super(props);
        this.touchStart = null
    }

    state = {
        windowHeight: 0,
        mouseWheel: 0,
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

    handleMouseWheel(event) {
        //this.setState({eventType: event.type})
        console.log({event: event.target});
        //event.preventDefault();
        //event.stopPropagation();

        this.props.handleMouseWheel(event)
    }

    handleTouchStart(event){
        //event.preventDefault();
        const touch = event.changedTouches[0];
        console.log({touch});
        this.touchStart = touch
    }
    handleTouchEnd(event){
        //event.preventDefault();
        const touch = event.changedTouches[0];
        console.log({touch});
        if (this.touchStart){
            const deltaY = this.touchStart.pageY - touch.pageY;
            this.props.handleMouseWheel({deltaY})
            console.log({dY: deltaY});
        }
        this.touchStart = null
    }

    render() {
        const { classes, open } = this.props;
        return (
            <main
                onWheel={(event) => {this.handleMouseWheel(event)}}
                onTouchStart={event => this.handleTouchStart(event)}
                onTouchEnd={event => this.handleTouchEnd(event)}
                className={classNames(
                    classes.content
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


