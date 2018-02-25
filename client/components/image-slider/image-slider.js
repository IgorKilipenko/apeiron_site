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
        height: '25%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },

    slide: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: '#424242',
        transition:  theme.transitions.create(['transform', 'clip-path'], {easing: 'cubic-bezier(0.8, 0, 0.2, 1)', duration: '1.5s'}) + " , opacity 1.5s ease 167ms",
        transform:'translateX(0)',
        //transition:  theme.transitions.create(['opacity'], {easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.standart}),
        //transition: 'clip-path 1.1s cubic-bezier(.19,1,.22,1), opacity 1.1s ease 167ms',
    },
    currentSlide: {
        opacity: 1,
        clipPath: 'inset(0 0 0 0)',
        //transition:  theme.transitions.create(['transform', 'clip-path', 'opacity'], {easing: 'cubic-bezier(0.8, 0, 0.2, 1)', duration: '1s'}),
    },
    nextSlide: {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        '& $imageSrc': {
            left:'-55%',
            
        }
    },
    prevSlide: {
        composes: '$nextSlide',
        clipPath: 'inset(0 0 0 100%)',
        opacity: 0,
    },
    imageSrc: {
        height:'100%',
        width:'100%',
        position:'absolute',
        backgroundSize: 'contain',
        backgroundPosition:'center',
        backgroundRepeat: 'no-repeat',
        top: 0,
        left:0,
        transition:  theme.transitions.create('left', {easing: 'cubic-bezier(0.8, 0, 0.2, 1)', duration: '1.8s'}),
    },
    transitionOff:{
        transitionProperty: 'none !important',
        opacity: 0
    }

});

class ImageSlider extends React.Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.images = importAll(require.context('../../public/imgs/products', false, /\.(png|jpe?g|svg)$/));
        this.imageCount = Object.values(this.images).length;
    }

    state = {
        current: 0
    };
    images = null;
    imageCount = null;


    componentDidMount() {
        this.setState({current:0})
        this.animate();
    }

    componentWillUnmount() {
        if (this.state.interval){ 
            clearInterval(this.state.interval);
            this.setState({interval:null})
        }
    }

    componentWillUpdate(nextProps, nextState) {
    }

    getNextIndex(current){
        //current = current + 1;
        return ++current % this.imageCount;
    }
    getPreviousIndex(current) {
        if (current === 0){
            current = this.imageCount;
        }
        return --current;
    }

    animate(){
        if (this.state.interval){
            this.clearInterval(this.state.interval);
            this.setState({ interval: null });
        }
        const interval = setInterval(() => {
            this.setState((prev, props) => {
                const current =
                    prev.current < this.imageCount -1 ? prev.current +1 : 0;
                return { current, next: this.getNextIndex(current), previous: this.getPreviousIndex(current) };
            });
            console.log({previous:this.state.previous, current:this.state.current, next: this.state.next})
        }, 3000);
        this.setState({interval})
    }

    clearAnimate() {
        if (this.state.interval){ 
            clearInterval(this.state.interval);
            this.setState({interval:null})
        }
    }

    render() {
        const { classes, children } = this.props;
        const images = Object.values(this.images).filter((img, i) => i >= 0 && i < this.imageCount);
        
        return (
            <div className={classes.root}>
                {images.map((image, i, arr) => {
                    //console.log({index:i, current:this.state.current, count:arr.length})
                    const cn = {
                        [classes.currentSlide]: this.state.current === i,
                        [classes.prevSlide]: i === this.state.previous,
                        [classes.nextSlide]: i !== this.state.current && i != this.state.previous
                    }
                return(
                    <div
                        key={i}
                        className={classNames(classes.slide, cn)}
                    >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image})`
                            }}
                        />
                    </div>
                )})}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ImageSlider);
