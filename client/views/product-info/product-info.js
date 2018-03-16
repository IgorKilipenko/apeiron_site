import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
    products
} from '../../stores/products-store';
import { transaction } from 'mobx';

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
        position: 'inherit',
        overflow: 'hidden'
    },
    view: {
        backgroundColor: 'white'
    },
    info: {
        paddingLeft: '10px',
        position: 'relative',

    },
    loaded:{
    },
    loading:{
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
    title: {
        position: 'relative',
        transform: 'translateX(150%)',
        transition: theme.transitions.create('transform', {delay: '0ms'}),
        width: '100%',
        '&$loaded':{
            transform: 'translateX(0)',
        }
    }
});


@inject('routing')
@inject('uiStore')
@withRouter
@observer
class ProductInfo extends React.Component {

    state = {loaded:false}
    componentDidMount = () =>{
        setTimeout(() => {
            this.setState({loaded:true})
        }, 0);
        
    }
    componentWillMount =() =>{
        const {route, routing, routes} = this.props;
        routing.update(route, {routes});
        console.log({routeMount: route})
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
                            backgroundImage:  `url(${require('../../public/imgs/products/' + product.image)})` //`url(${new URL(product.image, window.location.href)})`
                        }}
                    />
                </div>
                <div className={classNames(classes.container, classes.info )}>
                    {/*match.params.id*/}
                    <article className={classNames(classes.title, {[classes.loaded]: this.state.loaded})}>
                        <Typography gutterBottom={true} variant='title'>{product.title}
                            <span>{" " + product.description}</span>
                        </Typography>
                        <Typography paragraph={true} variant='body1'>{product.content}</Typography>
                    </article>
                </div>
            </section>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ProductInfo);
