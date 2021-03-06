import React from 'react';
import apeironLogoUrl, { ReactComponent as Logo } from './logo-menu.svg';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import MenuIcon from '../menu/menu-icon';

const styles = theme => ({
    root: {
        height: '100%',
        width: theme.customValues.drawerWidth,
        transform: 'scaleX(0)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.standart
        }),
        '&$opened': {
            transform: 'scaleX(1)'
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.customValues.drawerWidth * 0.7,
        }
    },
    opened: {
        borderRight: '1px solid white'
    },
    menuLogo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(12px 12px 7px rgba(0,0,0,0.5))',
        '& path, text': {
            stroke: '#fef5ff'
        },
        fill: '#fef5ff',
        '&:hover #round1, &:hover #round2': {
            animationDuration: '3s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear', //theme.transitions.easing.ease,
            transformOrigin: 'center'
        },
        '&:hover #round1': {
            animationName: 'rotate'
        },
        '&:hover #round2': {
            animationName: 'rotate-back'
        },
        '&:hover': {
            cursor: 'pointer'
        }
    },
    '#round1': {
        animation: 'rotate 2s linear infinite',
        transformOrigin: 'center'
    },

    logoContainer: {
        position: 'absolute',
        top: 0,
        margin: 0,
        left: '50%',
        marginRight: '-50%',
        height: '100px',
        width: '100%',
        transform: 'translate(-50%)'
    },
    '@keyframes rotate': {
        to: {
            transform: 'rotate(360deg)'
        }
    },
    '@keyframes rotate-back': {
        to: {
            transform: 'rotate(-360deg)'
        }
    },
    logoTitle: {
        color: '#fef5ff',
        margin: 0,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%) rotate(-90deg)',
        '@media screen and (max-height: 400px)':{
            display: 'none'
        }
    },
    menuIcon: {
        position: 'absolute',
        top: 110,
        left: '50%',
        transform: 'translateX(-50%)'
    }
});

class MainLogo extends React.Component {
    render() {
        const { classes, opened } = this.props;
        return (
            <div
                className={classNames(classes.root, {
                    [classes.opened]: opened
                })}
            >
                <Link className={classNames(classes.logoContainer)} to="/">
                    <Logo className={classes.menuLogo} />
                </Link>
                <MenuIcon className={classes.menuIcon}/>
                <Typography
                    component="span"
                    variant="headline"
                    color="inherit"
                    className={classes.logoTitle}
                >
                    Апейрон
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MainLogo);
