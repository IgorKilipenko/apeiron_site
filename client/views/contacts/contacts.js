import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import MapComponent from '../../components/map-component/map-component';

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
            <MapComponent/>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Contacts);