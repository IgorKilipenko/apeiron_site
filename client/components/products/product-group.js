// @ts-nocheck
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
import doorIcon from '../../public/imgs/doors.png';

const headerBlockHeght = 10,
    maxVisibleItems = 4;

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '50%',
        boxShadow: 'none',
        //transition: theme.transitions.create('all'),
        position: 'relative',
        //backgroundColor: theme.palette.primary.dark, //'#16151b',
        color: 'white'
    },
    content: {
        //height: '100%',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        height: `calc(100% - ${headerBlockHeght}%)`,
    },
    header: {
        position: 'relative',
        minHeight: `${headerBlockHeght}%`,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
//        border: '1px solid #e5e5e5',
        //borderBottom: `1px solid ${theme.customValues.borderColor}`,
    },
    reversColumn: {
        flexDirection: 'column-reverse'
    },
    reversRow: {
        flexDirection: 'row-reverse'
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
        top: 0,
        left: 0
    },
    coloredRoot: {
        backgroundColor: '#ff7f00',
        borderLeft: '1px solid #ff7f00'
    },
    groupItemOverride: {
        height: `${100/maxVisibleItems}%`,
        width: `${100/maxVisibleItems}%`,
        //borderRight: `1px solid ${theme.palette.divider}`,
        //borderBottom: `1px solid ${theme.palette.divider}`,
        /*[theme.breakpoints.down('xs')]: {
            width: '50%',
            height: '50%'
        },*/
    }
});

class ProductGroup extends React.Component {
    render() {
        const { classes, revers = false, colored = false, imageTitle } = this.props;
        return (
            <section
                className={classNames(
                    classes.root,
                    { [classes.reversColumn]: revers },
                    { [classes.coloredRoot]: colored }
                )}
            >
                <article className={classNames(classes.header, revers ? '' : classes.reversRow)}>
                    <span
                        className={classes.imageSrc}
//                        style={{
//                            backgroundImage: `url(${doorIcon})`
//                        }}
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
                <section className={classNames(classes.content)}>
                    {this.props.children.map((item, index) => (
                        <article key={index} className={classes.groupItemOverride}>
                            {item}
                        </article>
                    ))}
                </section>
            </section>
        );
    }
}

ProductGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    rvers: PropTypes.bool,
    colored: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(ProductGroup);
