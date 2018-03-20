//@ts-check --jsx

import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import { renderRoutes } from 'react-router-config'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';


import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import fetch from 'unfetch'

//import 'typeface-roboto';
import App from './views/app';
import Index from './views/home/index';
import withTheme from 'material-ui';
import ScrollRouterStore from './stores/scroll-router-store';
import UiStore from './stores/ui-store';

const theme = createMuiTheme({
    palette: {
        /*primary: {
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
        },
        background: {
            default: 'white'
        },*/
        type: 'dark',
        primary: {
            light: '#ff7f00',
            main: '#3f51b5',
            dark: '#303f9f',
            contrastText: '#fff'
        }
    },
    customValues: {
        drawerWidth: 100,
        borderColor: '#e5e5e5',
    },
    typography: {
        fontFamily: '"Montserrat Alternates", "Helvetica", "Arial", sans-serif'
    }
});
const browserHistory = createBrowserHistory();
//const routingStore = new RouterStore();
const scrollRoutingStore = new ScrollRouterStore(routes);
const uiStore = new UiStore();

const stores = {
    // Key can be whatever you want
    routing: scrollRoutingStore,
    uiStore: uiStore
    //scrollRouting : scrollRouterStore
    // ...other stores
};
import {API_ROOT} from '../api-config';
const client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
    // to a different host
    link: new HttpLink({uri: API_ROOT, fetch: fetch}),
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id,
    }),
  });

const history = syncHistoryWithStore(browserHistory, scrollRoutingStore);
import {ScrollRouter, ProductsRouter} from './routes';
const route = routes[0].routes[0];
ReactDOM.render(
    <Provider {...stores}>
        <ApolloProvider client={client}>
            <Router history={history}>
                <MuiThemeProvider theme={theme}>
                    <Reboot />
                    <App>
                        <Switch>
                            <ScrollRouter/>
                        </Switch>
                    </App>
                </MuiThemeProvider>
            </Router>
        </ApolloProvider>
    </Provider>,
    document.getElementById('app')
);
