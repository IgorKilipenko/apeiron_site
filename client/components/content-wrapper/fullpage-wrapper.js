import React from 'react';
import PropTypes from 'prop-types';
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
    'contentShiftLeft': {
        marginLeft: 0
    }
});

class FullpageWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        windowHeight: 0
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
        const {classes, open} = this.props;
        return (
            <main
                onWheel={event => {
                    console.log(`wellY=${event.deltaY}`);
                }}
                className={classNames(classes.content, classes[`content-left`], {
                    [classes.contentShift]: open,
                    [classes.contentShiftLeft]: open
                })}
            >
                {this.props.children}
            </main>
        );
    }
}

FullpageWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullpageWrapper);
