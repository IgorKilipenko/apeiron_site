//@ts-check --jsx

import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

//import 'typeface-roboto';
import App from './views/app';
import AppRouter from './routes';
import withTheme from 'material-ui';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000'
        }
    },
    customValues: {
        drawerWidth: 240,
        borderColor: '#e5e5e5'
    }
});

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  // Key can be whatever you want
  routing: routingStore,
  // ...other stores
};

const history = syncHistoryWithStore(browserHistory, routingStore);

let childProp = null;

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <MuiThemeProvider theme={theme}>
                <Reboot />
                <App>
                    <AppRouter ref={item => childProp = item}/>
                </App>
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('app')
);
