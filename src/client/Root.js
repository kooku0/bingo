import React from 'react';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../store';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

const Root = () => (
    <Provider store = {store}>
        <App/>
        <Alert stack={true} timeout={3000} />
    </Provider>
);

export default Root;