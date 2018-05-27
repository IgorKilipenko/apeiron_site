import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root:{
        height: '100%',
        width: '100%',
    },
    row: {
        paddingBottom: '0.5em'
    }
})

class ContactInfo extends React.Component {
    render(){
        const {classes} = this.props;
        return(
            <address className={classes.root}>
                <div className={classes.row}>
                    <Typography variant='title'>Адрес</Typography>
                    <Typography variant='title'>630083, г.Новосибирск, ул. Большевистская, 177</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant='title'>Телефон</Typography>
                    <Typography variant='title'>+7 (383) 227-73-02</Typography>
                </div>
                <div className={classes.row}>
                    <Typography variant='title'>Почта</Typography>
                    <Typography variant='title'>td@apeiron.su</Typography>
                </div>
            </address>
        )
    }
}

export default withStyles(styles, {withTheme: true})(ContactInfo)