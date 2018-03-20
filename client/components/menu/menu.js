import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Typography from 'material-ui/Typography';
import { inject, observer } from 'mobx-react';

const styles = theme => {
    const transition = theme.transitions.create(['all']);
    return {
        root: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            overflow: 'hidden',
            opacity: 0,
            zIndex: theme.zIndex.modal,
            backgroundColor: theme.palette.background.default,
            transform: 'translateX(-100%) scaleX(0)',
            transition,
            '&$opened': {
                transform: 'translateX(0) scaleX(1)',
                opacity: 0.9,
            }
        },
        menu: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        menuItem: {
            padding: '0.2em'
        },
        opened: {}
    };
};

@inject('uiStore')
@observer
class Menu extends React.Component {
    componentDidMount = () => {
        this.didMount = true;
    }
    closeMenu = (e) => {
        if (this.didMount){
            this.props.uiStore.setState({menuOpened: false})
        }
    }
    render() {
        const { classes, uiStore: {state} } = this.props;
        return (
            <div className={classNames(classes.root, {[classes.opened]: state.menuOpened})}>
                <div className={classes.menu} >
                    <div className={classes.menuItem}>
                        <Link to="/"  onClick={e => this.closeMenu(e)}>
                            <Typography className={classes.menuItem} variant="headline">Продукция</Typography>
                        </Link>
                    </div>
                    <div className={classes.menuItem}>
                        <Link to="/Контакты" onClick={e => this.closeMenu(e)}>
                            <Typography className={classes.menuItem} variant="headline">Контакты</Typography>
                        </Link>
                    </div>
                    <div className={classes.menuItem}>
                        <Link to="/Галерея" onClick={e => this.closeMenu(e)}>
                            <Typography className={classes.menuItem} variant="headline">Галерея</Typography>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Menu);
