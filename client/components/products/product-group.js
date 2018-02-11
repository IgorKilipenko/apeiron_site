import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { NavLink } from 'react-router-dom';
import { menuUrls } from '../menu/menu';
import ButtonBase from 'material-ui/ButtonBase';

import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames';

//import './product-item-animation.css';
import doorIcon from '../../public/imgs/doors.jpg';

const styles = theme => ({
    root: {
        display: 'flex',
        'flexDirection': 'column',
        boxSizing: 'border-box',
        width: '50%',
        height: '100%',
        boxShadow: 'none',
        transition: theme.transitions.create('all'),
        position: 'relative',
        '&:nth-child(even)': {
            backgroundColor: 'rgb(234, 200, 83)',
            borderLeft: '1px solid #d6cf30',
        },

    },
    content: {
        height: '100%',
        width: '100%'
    },
    header: {
        position: 'relative',
        minHeight: '20%',
        width: '100%',
        display:'flex',
        flexDirection: 'row',
    },
    reversColumn: {
        flexDirection: 'column-reverse',
    },
    reversRow: {
        flexDirection: 'row-reverse',
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit +
            6}px`
    },
    imageSrc: {
        position: 'relative',
        backgroundSize: 'contain',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        height: '50px',
        width: '50px',
        top:0,
        left:0,
    }
});

class ProductGroup extends React.Component {
    render() {
        const { classes, revers = false, imageTitle } = this.props;
        return (
            <section className={classNames(classes.root, revers ? classes.reversColumn : '')}>
                <article className={classNames(classes.header, revers ? '' : classes.reversRow )}>
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${doorIcon})`
                            }}
                        />
                        <Typography
                            component="span"
                            variant="headline"
                            color="inherit"
                            className={classes.imageTitle}
                        >
                            Входные группы
                            {imageTitle}
                            <span className={classes.imageMarked} />
                        </Typography>
                </article>
                <section className={classNames(classes.content)}>{this.props.children}</section>
            </section>
        );
    }
}

ProductGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired
};

export default withStyles(styles)(ProductGroup);
