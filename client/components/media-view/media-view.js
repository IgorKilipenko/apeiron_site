import React from 'react';
import withStyles from 'material-ui/styles';
import Modal from 'material-ui/Modal'


const styles = theme => ({
    root:{
        position: 'fixed',
        height: '100%',
        maxHeight: '100%',
        width: '100%',
        zIndex: theme.zIndex.modal
    }
})

class ModalView extends React.Component{
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {this.props.children}
            </div>
        )
    }
}

