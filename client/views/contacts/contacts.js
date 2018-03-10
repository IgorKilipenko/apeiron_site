import React from 'react';
import classNames from 'classnames';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        height: 200,
        width: 300
    }
});

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat: 54.993425, lng: 82.976490 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 54.993425, lng: 82.976490 }} />}
  </GoogleMap>
))


export default MyMapComponent
