import React from 'react';
import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Textarea from '@material-ui/core/Input/Textarea';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import Send from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';
//import ReactDOM from 'react-dom';
import Recaptcha from 'react-recaptcha';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        display: 'flex',
        flexFlow: 'column',
        position: 'relative'
    },
    sendButton: {
        composes: ['g-recaptcha']
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    textField: {
        //marginLeft: theme.spacing.unit,
        //marginRight: theme.spacing.unit,
        width: '100%',
        //marginTop: 0
        position: 'relative'
    }
});

class ContactsForm extends React.Component {
    constructor(props, ...rest) {
        super(props);
        this.state = {
            name: { value: '' },
            mail: { value: '' },
            message: { value: '' },
            successSended: null
        };
        this.recaptchaInstance = null;
    }

    componentDidMount = () => {
        //console.log({ msg: window.grecaptcha });
    };
    handleChange = (name, maxLemgth) => event => {
        let value = event.target.value;
        let error = null;
        if (value && value.length >= maxLemgth) {
            error = `Max length ${maxLemgth}`;
            value = value.substring(0, maxLemgth);
        }
        this.setState({ [name]: { value, error } });
    };
    handleScrollRoute = e => {
        e.stopPropagation();
    };

    executeCaptcha = e => {
        this.recaptchaInstance && this.recaptchaInstance.execute();
        event.preventDefault();
    };
    verifyCallback = async response => {
        //console.log({ captcha: response });
        try {
            const response = await fetch('/sendmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name.value,
                    email: this.state.mail.value,
                    message: this.state.message.value,
                    response: response
                })
            });
            const json = await response.json();
            if (json.status === 'success') {
                console.log('success', { json });
                this.success();
            }
        } catch (err) {
            console.log({ err });
        } finally {
            this.resetRecaptcha();
        }
        console.log('send mail');
    };
    success = () => {
        this.setState({
            message: { value: '' },
            successSended: true
        });
        setTimeout(() => {
            if (this.state.successSended) {
                this.setState({ successSended: null });
            }
        }, 5000);
    };
    handleCloseDialog = () => {
        if (this.state.successSended) {
            this.setState({ successSended: null });
        }
    };
    resetRecaptcha = () => {
        this.recaptchaInstance.reset();
    };
    expiredCallback = () => {
        this.resetRecaptcha();
    };
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off" /*onSubmit={}*/
                >
                    <TextField
                        id="input-name"
                        label="Имя"
                        placeholder="Ваше имя"
                        className={classes.textField}
                        value={this.state.name.value}
                        onChange={this.handleChange('name', 80)}
                        margin="none"
                    />
                    <TextField
                        id="mail-input"
                        label="Почта"
                        placeholder="E-mail для обратной связи"
                        className={classes.textField}
                        value={this.state.mail.value}
                        onChange={this.handleChange('mail', 80)}
                        margin="none"
                    />
                    <FormControl
                        className={classes.textField}
                        aria-describedby="message-input-area"
                        error={this.state.message.error ? true : false}
                    >
                        <InputLabel htmlFor="message-input">
                            Сообщение
                        </InputLabel>
                        <Input
                            id="message-input"
                            value={this.state.message.value}
                            placeholder="Ваше сообщение"
                            multiline
                            margin="none"
                            rows={2}
                            rowsMax={3}
                            onWheel={e => this.handleScrollRoute(e)}
                            onChange={this.handleChange('message', 500)}
                            inputRef={msg => (this.msgField = msg)}
                            //inputProps={{
                            //    onWheel: e => this.handleScrollRoute(e)
                            //}}
                            //inputComponent={props => (<address {...props}><Textarea {...props} /></address>)}
                        />
                        <FormHelperText id="message-input-area">
                            {`${this.state.message.value.length ||
                                0} из 500 символов`}
                        </FormHelperText>
                    </FormControl>
                    <Button
                        //id={this.captchaId}
                        color="default"
                        //className={classes.sendButton}
                        //data-sitekey="6LerLE4UAAAAAK2gLHGJoWFGG9EtyT9HEHImWPoo"
                        //data-callback='onClick'
                        onClick={this.executeCaptcha}
                        //onSubmit={this.handleSubmit}
                        //data-size="invisible"
                    >
                        Отправить
                        <Send className={classes.rightIcon} />
                    </Button>
                    <Recaptcha
                        ref={e => (this.recaptchaInstance = e)}
                        sitekey="6LerLE4UAAAAAK2gLHGJoWFGG9EtyT9HEHImWPoo"
                        size="invisible"
                        verifyCallback={r => this.verifyCallback(r)}
                        expiredCallback={this.expiredCallback}
                        hl="ru"
                    />
                </form>
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
                    open={this.state.successSended || false}
                    onClose={this.handleCloseDialog}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    message={
                        <span id="message-id">
                            Спасибо! {this.state.name.value.toString()}. Ваше
                            сообщение успешно отправлено. Наши сотрудники ответят
                            Вам в ближайшее время.
                        </span>
                    }
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ContactsForm);
