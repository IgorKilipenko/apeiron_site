import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import MapConponent from '../../components/map/map';
import config from '../../../user.config';

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%'

    },
    mapElements: {
        height: '100%', 
        width: '100%'
    }
});

class Contacts extends React.Component {
    render() {
        const {classes} = this.props; 
        return (
            <MapConponent className={classes.root }
                isMarkerShown
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                    config.google.mapKey
                }&v=3.exp&libraries=geometry,drawing,places`}
            />
        );
    }
}

export default withStyles(styles, {withTheme: true})(Contacts);