import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { duration } from 'material-ui/styles/transitions';

function importAll(r) {
    const images = {};
    r.keys().map(item => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(require.context('../../public/imgs/products', false, /\.(png|jpe?g|svg)$/));

export const styles = theme => ({
    root: {
        height: '300px',
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
    },
    currentSlide: {
        transform: 'translateX(0)',
        opacity: 1,
        clipPath: 'inset(0 0 0 0)',
        //transition:  theme.transitions.create(['transform', 'clip-path', 'opacity'], {easing: 'cubic-bezier(0.8, 0, 0.2, 1)', duration: '1s'}),
    },
    slide: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
        transition:  theme.transitions.create(['transform', 'clip-path'], {easing: 'cubic-bezier(0.8, 0, 0.2, 1)', duration: '1.5s'}) + " , opacity 1.5s ease 167ms"
        //transition:  theme.transitions.create(['opacity'], {easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.standart}),
        //transition: 'clip-path 1.1s cubic-bezier(.19,1,.22,1), opacity 1.1s ease 167ms',
        
    },
    nextSlide: {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
    },
    prevSlide: {
        clipPath: 'inset(0 0 0 100%)',
        opacity: 0
    },
    imageSrc: {
        height:'100%',
        width:'100%',
        position:'absolute',
        backgroundSize: 'contain',
        backgroundPosition:'center',
        backgroundRepeat: 'no-repeat',
        top: 0,
        left:0
    }

});

class ImageSlider extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.images = importAll(require.context('../../public/imgs/products', false, /\.(png|jpe?g|svg)$/));
        this.imageCount = Object.values(this.images).length;
    }

    state = {
        current: 0
    };
    images = null;
    imageCount = null;


    componentDidMount() {
        //this.setState({current:0})
        this.timer = setInterval(() => {
            this.setState((prev, props) => {
                const current =
                    prev.current < this.imageCount ? prev.current +1 : 0;
                return { current };
            });
            console.log({current:this.state.current})
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { classes, children } = this.props;
        const images = Object.values(this.images);
        return (
            <div className={classes.root}>
                {images.map((image, i) => (
                    <div
                        key={i}
                        className={classNames(classes.slide, {
                            [classes.currentSlide]: this.state.current == i,
                            [classes.prevSlide]: this.state.current > i,
                            [classes.nextSlide]: this.state.current < i
                        })}
                    >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image})`
                            }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ImageSlider);
