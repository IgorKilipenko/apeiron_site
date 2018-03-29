import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import Textarea from 'material-ui/Input/Textarea';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Helmet } from 'react-helmet';
import Send from 'material-ui-icons/Send';
import Button from 'material-ui/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactDOM from 'react-dom';

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
    state = {
        name: { value: '' },
        mail: { value: '' },
        message: { value: '' }
    };
    componentDidMount = () => {
        console.log({ msg: this.msgField });
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
    handleSubmit = e => {
        fetch('/sendmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name.value,
                email: this.state.mail.value,
                message: this.state.message.value
            })
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log({json})
        }).catch(err => {
            console.log({err})
        });
        console.log('send mail');
        event.preventDefault();
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
                        color="default"
                        className={classes.sendButton}
                        data-sitekey="6LerLE4UAAAAAK2gLHGJoWFGG9EtyT9HEHImWPoo"
                        //data-callback='onClick'
                        onClick={this.handleSubmit}
                        //onSubmit={this.handleSubmit}
                        data-size="invisible"
                    >
                        Отправить
                        <Send className={classes.rightIcon} />
                    </Button>
                </form>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ContactsForm);
