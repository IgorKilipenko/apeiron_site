import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
    products
} from '../../stores/products-store';

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
    componentWillMount =() =>{
        const {route, routing, routes} = this.props;
        routing.update(route, {routes});
        console.log({routeMount: route})
    }
    parseId = (path) => {
        let id = path.match(/_(\d+)$/)
        id = id && (id.length > 1 ? id[1] : null);
        return id;
    }
    findById = (id) =>{
        if (id == null) return null
        const product = this.props.data.catalog.find(p => p.id == id);
        return this.transformProduct(product);
    }
    transformProduct = (product) => {
        const image = products.find(p => p.id == product.id).img;
        return {...product, image};
    }
    render() {
        const { classes, product } = this.props;
        //const product = this.findById(this.parseId(this.props.location.pathname)) //this.props.location.state;
        console.log({product})
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
