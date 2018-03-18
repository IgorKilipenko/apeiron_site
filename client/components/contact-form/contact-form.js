import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        display: 'flex',
        flexFlow: 'column'
    }
});

class ContactsForm extends React.Component {
    state = {
        name: '',
        surname: ''
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.root} noValidate autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name-field" required={true}>Имя</InputLabel>
                        <Input
                            id="name-field"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="surname-field" required={true}>Почта</InputLabel>
                        <Input
                            id="surname-field"
                            value={this.state.surname}
                            onChange={this.handleChange('surname')}
                        />
                    </FormControl>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ContactsForm);