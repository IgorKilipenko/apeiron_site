// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';


const headerBlockHeght = 100,
    maxVisibleItems = 5;

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '50%',
        height: '100%',
        boxShadow: 'none',
        //transition: theme.transitions.create('all'),
        position: 'relative',
        //backgroundColor: theme.palette.primary.dark, //'#16151b',
        color: 'white',
        overflow: 'hidden',
        '&:hover $title': {
            //color: 'red !important',
            '&:after': {
                transformOrigin: 'bottom left',
                transform: 'scaleX(1)'
            }
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '50%'
        }
    },
    content: {
        //height: '100%',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        height: `calc(100% - ${headerBlockHeght}px)`
    },
    header: {
        position: 'relative',
        height: `${headerBlockHeght}px`,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
        //justifyContent: 'center'
        //        border: '1px solid #e5e5e5',
        //borderBottom: `1px solid ${theme.customValues.borderColor}`,
    },
    reversColumn: {
        flexDirection: 'column-reverse'
    },
    reversRow: {
        flexDirection: 'row-reverse'
    },
    title: {
        position: 'relative',
        color: theme.palette.text.primary,
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            4}px ${theme.spacing.unit + 6}px`,
        height: 'fit-content',
        '&:after': {
            content: "''",
            position: 'absolute',
            bottom: 10,
            left: 0,
            width: '100%',
            height: 2,
            backgroundColor: theme.palette.text.primary,
            transform: 'scaleX(0)',
            transformOrigin: 'bottom right',
            transition: theme.transitions.create(['transform'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.standart
            })
        }
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
        backgroundColor: '#ff7f00'
    },
    itemContainer: {
        //height: `${100 / maxVisibleItems}%`,
        width: `${100 / maxVisibleItems}%`,
        //borderRight: `1px solid ${theme.palette.divider}`,
        //borderBottom: `1px solid ${theme.palette.divider}`,
        /*[theme.breakpoints.down('xs')]: {
            width: '50%',
            height: '50%'
        },*/
        '&$smallScreen': {
            width: `${100 / 3}%`
            //height: `${100/2}%`
        },
        overflow: 'hidden'
    },
    smallScreen: {}
});

@inject('uiStore')
@observer
class ProductGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleScroll = e => {
        //console.log({e});
        this.setState({
                scrollHeight: e.scrollHeight,
                scrollTop: e.scrollTop,
                clientHeight: e.clientHeight
        });
    };
    render() {
        const {
            classes,
            revers = false,
            colored = false,
            title,
            uiStore
        } = this.props;
        const breakpoint = uiStore.getBreakpoint;
        const smallScreen = breakpoint === 'sm' || breakpoint === 'xs';
        return (
            <section
                className={classNames(
                    classes.root,
                    { [classes.reversColumn]: revers && breakpoint !== 'xs' },
                    { [classes.coloredRoot]: colored }
                )}
            >
                <article
                    className={classNames(
                        classes.header,
                        revers ? '' : classes.reversRow
                    )}
                >
                    <Typography
                        component="span"
                        variant={smallScreen ? 'title' : 'headline'}
                        color="inherit"
                        className={classes.title}
                    >
                        {title}
                    </Typography>
                </article>
                <Scrollbars
                    //onScroll={e => this.handleScroll(e)}
                    onUpdate={el => this.handleScroll(el)}
                >
                    <section className={classNames(classes.content)}>
                        {this.props.children &&
                            this.props.children.map((product, index) => (
                                <article
                                    key={index}
                                    className={classNames(
                                        classes.itemContainer,
                                        { [classes.smallScreen]: smallScreen }
                                    )}
                                >
                                    {React.cloneElement(product, {scrollHeight: this.state.scrollHeight, scrollTop: this.state.scrollTop, clientHeight: this.state.clientHeight})}
                                </article>
                            ))}
                    </section>
                </Scrollbars>
            </section>
        );
    }
}

ProductGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    revers: PropTypes.bool,
    colored: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(ProductGroup);
