import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

class ContentWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        windowHeight: 0,
    };

    handleResize() {
        this.setState({
            windowHeight: window.innerHeight
        });
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }
    render() {
        return <div />;
    }
}

ContentWrapper.PropTypes = {
    class: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ContentWrapper);