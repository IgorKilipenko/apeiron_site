import React from 'react';
import classNames from 'classnames';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { withStyles } from 'material-ui/styles';
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

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 54.992822, lng: 82.980441 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 54.992822, lng: 82.980441 }} />}
  </GoogleMap>
))


class Contacts extends React.Component {
  render() {
      const {classes} = this.props; 
      return (
          <Map className={classes.root }
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