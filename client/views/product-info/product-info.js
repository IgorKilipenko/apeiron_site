import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { products } from '../../stores/products-store';
import { Scrollbars } from 'react-custom-scrollbars';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import { Document, Page, setOptions } from 'react-pdf/dist/entry.webpack';
//import GridList, { GridListTile, GridListTileBar } from '@material-ui/core/GridList';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Subheader from '@material-ui/core/ListSubheader';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row',
        height: '100%',
        width: '100%',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column'
        }
    },
    container: {
        position: 'inherit',
        overflow: 'hidden'
    },
    view: {
        backgroundColor: 'white',
        height: '100%',
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            height: '35%',
            width: '100%'
        }
    },
    info: {
        //paddingLeft: '10px',
        position: 'relative',
        height: '100%',
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            height: '65%',
            width: '100%'
        }
    },
    loaded: {},
    loading: {},
    imageSrc: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        height: '100%',
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
        transition: theme.transitions.create('transform', { delay: '0ms' }),
        width: '100%',
        '&$loaded': {
            transform: 'translateX(0)'
        }
    },
    video: {},
    videoIframe: {
        width: '100%',
        margin: '0px auto',
        '& $video': {
            position: 'relative',
            paddingBottom: '75%',
            height: 0,
            width: '100% !important',
            '& iframe': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }
        }
    },
    documentContainer: {
        height: 'auto',
        width: '100%'
    },
    image: {
        width: '100%',
        height: 'auto'
    },
    text: {
        paddingLeft: '0.5em'
    },
    documentPreview: {
        width: '100%',
        height: 'auto'
    },
    block: {
        paddingTop: '1em',
        paddingBottom: '1em'
    },
    mediaItem: {
        cursor: 'pointer'
    },
    fullMedia: {
        height: '100%',
        width: '100%'
    }
});

@inject('routing')
@inject('uiStore')
@withRouter
@observer
class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            numPages: null,
            pageNumber: 1,
            mediaOpen: false
        };
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 0);
    };
    componentWillMount = () => {
        const { route, routing, routes } = this.props;
        routing.update(route /*{ routes }*/);
        console.log({ routeMount: route });
    };
    handleDocumentLoadSuccess = ({ numPages }) => {
        this.setState({
            numPages
        });
    };
    handleMediaItemClick = (e, name) => {
        e.preventDefault();
        console.log(`Dialog open - ${name}`);
        this.setState((prevState) => {
            if (prevState.mediaOpen != name) {
                return { mediaOpen: name }
            }
            return {};
        },
            () => {
                console.log(`Dialog open - ${this.state.mediaOpen}`)
                console.log(`Dialog open - ${this.state.mediaOpen && this.state.mediaOpen == name}`)
            });

    };
    handleMediaItemClose = () => {
        this.setState({ mediaOpen: false });
        console.log('Dialog close');
    };

    renderVideo = content => {
        const { classes } = this.props;
        return (
            <div
                key={`video_${content.id}`}
                className={classNames(classes.videoIframe, classes.block)}
            >
                <YouTubePlayer
                    className={classes.video}
                    playing={false}
                    controls={true}
                    url={content.value}
                />
            </div>
        );
    };

    renderDocument = content => {
        const { classes } = this.props;
        const src = require('../products/media-content/documents/' +
            content.value);
        let open = this.state.mediaOpen && this.state.mediaOpen === content.title;
        return (
            <React.Fragment>
                <div className={classes.mediaItem} onClick={e => this.handleMediaItemClick(e, content.title)}>
                    <Document
                        className={classes.documentPreview}
                        file={src}
                        onLoadSuccess={this.handleDocumentLoadSuccess}
                    >
                        <Page pageNumber={this.state.pageNumber} />
                    </Document>
                    <GridListTileBar
                        title={content.title}
                        subtitle={
                            <span>
                                {`Страница ${this.state.pageNumber} из ${
                                    this.state.numPages
                                    }`}
                            </span>
                        }
                    />
                </div>
                {open ?
                    <Dialog
                        open={
                            this.state.mediaOpen &&
                            this.state.mediaOpen == content.title
                        }
                        onClose={this.handleMediaItemClose}
                    >
                        <Document
                            className={classes.documentPreview}
                            file={src}
                            onLoadSuccess={this.handleDocumentLoadSuccess}
                        >
                            <Page pageNumber={this.state.pageNumber} />
                        </Document>
                    </Dialog>
                    : null
                }
            </React.Fragment>
        );
    };
    renderImage = content => {
        const { classes } = this.props;
        const src = require(`../products/media-content/${
            content.contentType.match(/^document/gi) ? 'documents/' : 'images/'
            }` + content.value.split(/,/)[0]);
        let open = this.state.mediaOpen && this.state.mediaOpen === content.title;
        return (
            <React.Fragment>
                <div
                    className={classes.mediaItem}
                    onClick={e => this.handleMediaItemClick(e, content.title)}
                >
                    <img
                        className={classes.image}
                        src={src}
                        alt={content.title}
                    />
                    <GridListTileBar title={`open - ${open}${content.title}`} />
                </div>
                {open ?
                    <Dialog
                        open={open}
                        onClose={this.handleMediaItemClose}
                    >
                        <div>{open}</div>
                        <img
                            className={classes.fullMedia}
                            src={src}
                            alt={content.title}
                        />
                    </Dialog>
                    : null
                }
            </React.Fragment>
        );
    };
    renderImgesGride = details => {
        const { classes } = this.props;
        return (
            <div className={classes.block}>
                <GridList cellHeight={280}>
                    <GridListTile
                        key="Subheader"
                        cols={2}
                        style={{
                            height: 'auto'
                        }}
                    >
                        <Subheader component="div">
                            Техническая информация
                        </Subheader>
                    </GridListTile>
                    {details
                        .filter(
                            c =>
                                c.contentType === 'image' ||
                                c.contentType === 'document' ||
                                c.contentType === 'document-pdf'
                        )
                        .map((content, i) => {
                            return (
                                <GridListTile key={i}>
                                    {content.contentType === 'document-pdf'
                                        ? this.renderDocument(content)
                                        : this.renderImage(content)}
                                </GridListTile>
                            );
                        })}
                </GridList>
            </div>
        );
    };

    render() {
        const { classes, product } = this.props;
        //const product = this.findById(this.parseId(this.props.location.pathname)) //this.props.location.state;
        console.log({ product });
        //console.log({...this.props});
        return (
            <section className={classes.root}>
                <div className={classNames(classes.container, classes.view)}>
                    <div
                        className={classes.imageSrc}
                        style={{
                            backgroundImage: `url(${require('../../public/imgs/products/' +
                                product.image)})` //`url(${new URL(product.image, window.location.href)})`
                        }}
                    />
                </div>
                <div className={classNames(classes.container, classes.info)}>
                    <Scrollbars onWheel={e => e.stopPropagation()}>
                        <article
                            className={classNames(classes.title, {
                                [classes.loaded]: this.state.loaded
                            })}
                        >
                            <Typography
                                gutterBottom={true}
                                variant="title"
                                classes={{ root: classes.text }}
                            >
                                {product.title}
                                <span>{' ' + product.description}</span>
                            </Typography>
                            <Typography
                                paragraph={true}
                                variant="body1"
                                classes={{ root: classes.text }}
                            >
                                {product.content}
                            </Typography>
                        </article>
                        {product.details &&
                            product.details
                                .filter(c => c.contentType === 'video')
                                .map(content => this.renderVideo(content))}
                        {product.details &&
                            this.renderImgesGride(product.details)}
                    </Scrollbars>
                </div>*
            </section>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ProductInfo);
