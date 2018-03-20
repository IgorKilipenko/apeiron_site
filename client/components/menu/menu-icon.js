import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';

const styles = theme => {
    const width = 40;
    const lineHeight = 1;
    const lineSpace = 8;
    const transition = theme.transitions.create();
    return {
        root: {
            width: 40,
            height: lineHeight * 3 + lineSpace * 2,
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'row'
        },
        line: {
            transition,
            backgroundColor: theme.palette.text.primary,
            width: '100%',
            height: lineHeight,
            position: 'relative',
            '&$opened': {
                backgroundColor: 'transparent',
                width: '50%',
                transform: 'translateX(50%)',
                '&:before': {
                    transform: `translateY(${-lineSpace}px) rotate(-45deg)`
                },
                '&:after': {
                    transform: `translateY(${lineSpace}px) rotate(45deg)`
                }
            },
            '&:before, &:after': {
                content: '""',
                backgroundColor: theme.palette.text.primary,
                position: 'absolute',
                width: '100%',
                height: lineHeight,
                transition
            },
            '&:before': {
                top: lineSpace
            },
            '&:after': {
                top: -lineSpace
            }
        },
        opened: {}
    };
};

@inject('uiStore')
@observer
class MenuIcon extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {
        //    opened: props.opened || false
        //};
    }
    handleClick = e => {
        e.stopPropagation();
        e.preventDefault();
        //this.setState((prevState, props) => ({
        //    ...prevState,
        //    opened: !prevState.opened
        //}));
        this.props.uiStore.setState(prevState => ({
            ...prevState,
            menuOpened: !prevState.menuOpened
        }))
    };
    render() {
        const { classes, uiStore } = this.props;
        return (
            <div
                className={this.props.className + ' ' + classes.root}
                onClick={e => this.handleClick(e)}
            >
                <span
                    className={classNames(classes.line, {
                        [classes.opened]: uiStore.state.menuOpened
                    })}
                />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MenuIcon);
