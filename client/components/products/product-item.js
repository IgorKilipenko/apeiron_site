import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { inject, observer } from 'mobx-react';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        boxSizing: 'border-box',
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        /*height: `calc(${100 / 3}% - 0px)`,
        width: `calc(${100 / 3}% - 0px)`,
        [theme.breakpoints.down('xs')]: {
            width: '50%',
            height: '50%'
        },*/
        '&:hover': {
            zIndex: 1
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
            transform: 'translateX(0)'
        },
        opacity: 1,
        transform: 'translateY(0%)',
        transition: theme.transitions.create(['opacity', 'transform']),
    },
    imageSrc: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        width: '100%',
        padding: 2,
        //bottom: '20%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 50%',
        paddingTop: '100%'
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white', //'#0366d6',
        opacity: 0.0,
        transform: 'translateX(100%)',
        //transformOrigin: 'bottom center',
        transition: theme.transitions.create(['opacity', 'transform'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.standart
        }),
        [theme.breakpoints.down('sm')]: {
            //height: 200
        }
    },
    productTitle: {
        position: 'relative',
        bottom: 0,
        //left: '50%',
        lineHeight: 1,
        paddingLeft: 2,
        paddingRight: 2,
        color: '#e5e5e5',
        //[theme.breakpoints.down('xs')]: {
        //    display: 'none'
        //},
    },
    fadeAnnimation:{
        transform: 'translateY(100%)',
        opacity: 0
    }
});

@inject('uiStore')
@observer
class ProductItem extends React.Component {
    constructor(props, ...rest){
        super(props);
        this.state = {};
        this.instace ={};
    }
    componentDidMount = () => {
        this.instace = ReactDOM.findDOMNode(this)
        setTimeout(() => {
            this.setState({offsetTop: this.instace.offsetTop, clientHeight: this.instace.clientHeight})
        }, 0);
        
    }
    componentWillReceiveProps = (nextProps) => {
        //this.instace = ReactDOM.findDOMNode(this)
        //this.rect = this.instace.getBoundingClientRect()
    }
    componentDidUpdate = (prevProps, prevState) => {
        this.instace = ReactDOM.findDOMNode(this)
    }
    render() {
        const {
            to: toComponent,
            classes,
            imgUrl,
            title,
            uiStore,
            scrollTop,
            scrollHeight,
            clientHeight
        } = this.props;
        const bottom = scrollTop + clientHeight;
        const currCenter = this.instace.offsetTop + this.instace.clientHeight / 2
        return (
            <Link to={toComponent ? toComponent : ''}
                //focusRipple
                className={classNames(classes.root, {[classes.fadeAnnimation]: currCenter > bottom})}
                //component={props => (
                //    <Link to={toComponent ? toComponent : ''} {...props}/>
                //)}
            >
                <span
                    className={classes.imageSrc}
                    style={{
                        backgroundImage: `url(${imgUrl})`
                    }}
                />
                <span className={classes.imageBackdrop} />
                <Typography
                    className={classes.productTitle}
                    variant= {this.props.uiStore.getBreakpoints === 'xs' ? 'body1' : 'body2'}
                    gutterBottom
                    align="center"
                >
                    <span>{title}</span>
                </Typography>
            </Link>
        );
    }
}

ProductItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductItem);
