import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { inject, observer } from 'mobx-react';

import MapComponent from '../../components/map-component/map-component';
import ContactForm from '../../components/contact-form/contact-form';
import ContactInfo from '../../components/contact-form/contact-info';
import Slider from '../../components/image-slider/image-slider';
import { auto } from 'async';

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
        position: 'relative'
    },
    contactInfo: {
        height: '100%',
        width: '50%',
        padding: '1em',
        position: 'inherit'
    },
    contactForm: {
        height: '100%',
        maxWidth: '50%',
        width: 400,
        padding: '1em'
    },
    contactContainer: {
        height: '40%',
        width: '100%',
        display: 'flex',
        flexFlow: 'row',
        position: 'inherit',
        minHeight: 300
    },
    mapContainer: {
        height: '60%',
        minHeight: 200,
        width: '100%',
        position: 'relative',
        boxShadow: theme.shadows[10],
        zIndex: theme.zIndex.appBar
    },
    sliderContainer: {
        height: '50%',
        width: '70%',
        position: 'absolute',
        bottom: '0%',
        left: '0%',
        right: 'auto',
        top: 'auto'
        //boxShadow: theme.shadows[10],
        //zIndex: theme.zIndex.appBar
    }
});

@inject('routing')
@observer
class Contacts extends React.Component {
    componentWillMount = () => {
        const {route, branch, routing} = this.props;
        routing.update(route, branch);
        console.log({routeMount: route})
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.contactContainer}>
                    <div className={classes.contactInfo}>

                        <ContactInfo />
                        {/*<div className={classes.sliderContainer}>
                            <Slider backgroundSize='cover'/>
                        </div>*/}
                    </div>
                    <div className={classes.contactForm}>
                        <Typography variant="headline">Напишите нам</Typography>
                        <ContactForm />
                    </div>
                </div>
                <div className={classes.mapContainer}>
                    <MapComponent />
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Contacts);
