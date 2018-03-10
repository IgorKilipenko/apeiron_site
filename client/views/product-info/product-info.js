import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row no-wrap',
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    container: {
        height: '100%',
        width: '50%',
        position: 'inherit'
    },
    view: {
        backgroundColor: 'white'
    },
    info: {
        paddingLeft: '10px'
    },
    imageSrc: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        height:'100%',
        width: '100%',
        maxWidth: 350,
        padding: '5%',
        transform: 'translate(-50%, -50%)',
        margin: 0,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
});

@inject('routing')
@inject('uiStore')
@withRouter
@observer
class ProductInfo extends React.Component {
    componentWillMount(){
        const {route, routing} = this.props;
        routing.updateRoute(route.path);
        console.log({routeMount: route})
    }
    render() {
        console.log(this.props.location)
        const { classes, component, match} = this.props;
        const {product} = this.props.location.state;
        //console.log({...this.props});
        return (
            <section className={classes.root}>
                <div className={classNames(classes.container, classes.view)}>
                    <div
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${new URL(product.image, window.location.href)})`
                        }}
                    />
                </div>
                <div className={classNames(classes.container, classes.info)}>
                    {/*match.params.id*/}
                    <Typography gutterBottom={true} variant='title'>{product.title}
                        <span>{" " + product.description}</span>
                    </Typography>
                    <Typography paragraph={true} variant='body1'>{product.content}</Typography>
                </div>
            </section>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ProductInfo);
