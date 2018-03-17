import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import MapComponent from '../../components/map-component/map-component';
import ContactForm from '../../components/contact-form/contact-form';

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexFlow: 'column'
    },
    contact: {
        height: '60%',
        width: '50%'
    },
    mapElements: {
        height: '40%', 
        width: '100%'
    }
});

class Contacts extends React.Component {
    render() {
        const {classes} = this.props; 
        return (
            <div className={classes.root}>
                <div className={classes.contact}>
                    <ContactForm/>
                </div>
                <div className={classes.mapElements}>
                    <MapComponent/>
                </div>
            </div>
            
        );
    }
}

export default withStyles(styles, {withTheme: true})(Contacts);