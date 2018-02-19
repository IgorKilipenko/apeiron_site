import React from 'react';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles'

export const styles = theme => {

}

class ImageSlider extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const { children } = this.props;
        return (
            <div>
                {children.map((item, i) => {
                    item.props.isVisible;
                })}
            </div>
        );
    }
}
