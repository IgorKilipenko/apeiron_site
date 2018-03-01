import React from 'react';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row no-wrap',
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    container:{
        height: '100%',
        width: '50%'
    },
    view: {
        backgroundColor: 'white'        
    },
    info: {

    }
})

class ProductInfo extends React.Component {
    render() {
        const {classes, component, match} = this.props;
        return (
            <section className={classes.root}>
                <div className={classNames(classes.container, classes.view)}>View</div>
                <div className={classNames(classes.container, classes.info)}>{match.params.id}</div>
            </section>
        )
    }
}

export default withStyles(styles, {withTheme: true})(ProductInfo);