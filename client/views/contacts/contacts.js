import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { inject, observer } from 'mobx-react';
import { Scrollbars } from 'react-custom-scrollbars';
import Avatar from 'material-ui/Avatar';
import avatar from './media/images/аватар_контакты.png';

import MapComponent from '../../components/map-component/map-component';
import ContactForm from '../../components/contact-form/contact-form';
import ContactInfo from '../../components/contact-form/contact-info';
import Slider from '../../components/image-slider/image-slider';

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
        position: 'inherit',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: 'auto'
        }
    },
    contactForm: {
        height: '100%',
        maxWidth: '50%',
        width: 400,
        padding: '1em',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: 'auto',
            maxWidth: 'none'
        }
    },
    contactContainer: {
        height: '40%',
        width: '100%',
        display: 'flex',
        flexFlow: 'row',
        position: 'inherit',
        minHeight: 300,
        [theme.breakpoints.down('sm')]: {
            minHeight: 600,
            flexFlow: 'column'
        }
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
    },
    formHeader:{
        display:'flex',
        flexFlow:'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    avatar: {
        margin: 5,
        width: 60,
        height: 60,
        backgroundColor: 'wheat'
    }
});

@inject('routing')
@inject('uiStore')
@observer
class Contacts extends React.Component {
    componentWillMount = () => {
        const { route, branch, routing } = this.props;
        routing.update(route /*branch*/);
        console.log({ routeMount: route });
    };
    renderComponent() {
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
                        <div className={classes.formHeader}>
                            <Avatar
                                alt="Adelle Charles"
                                src={avatar}
                                className={classNames(
                                    classes.avatar,
                                    classes.bigAvatar
                                )}
                            />
                            <Typography variant="headline">Напишите нам</Typography>
                        </div>
                        <ContactForm />
                    </div>
                </div>
                <div className={classes.mapContainer}>
                    <MapComponent />
                </div>
            </div>
        );
    }
    render() {
        const { classes } = this.props;
        const breakpoint = this.props.uiStore.getBreakpoint;
        if (breakpoint === 'sm' || breakpoint === 'xs') {
            return <Scrollbars>{this.renderComponent()}</Scrollbars>;
        } else {
            return this.renderComponent();
        }
    }
}

export default withStyles(styles, { withTheme: true })(Contacts);
