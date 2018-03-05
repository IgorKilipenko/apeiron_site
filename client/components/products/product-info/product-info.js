import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

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
        width: '50%'
    },
    view: {
        backgroundColor: 'white'
    },
    info: {

    },
    imageSrc: {
        position: 'relative',
        left: 0,
        right: 0,
        top: 0,
        height:'100%',
        width: '100%',
        padding: 2,
        //bottom: '20%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 40%'
    },
});

@withRouter
class ProductInfo extends React.Component {
    render() {
        const { classes, component, match} = this.props;
        const {product} = this.props.location.state;
        //console.log({...this.props});
        return (
            <section className={classes.root}>
                <div className={classNames(classes.container, classes.view)}>
                    <span
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${product.img})`
                        }}
                    />
                    <img src={product.img} style={{height:'200px', width:'200px'}}/>
                </div>
                <div className={classNames(classes.container, classes.info)}>
                    {match.params.id}
                    <h2>{product.title}</h2>
                    <h3>{product.description}</h3>
                </div>
            </section>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ProductInfo);
