import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import io from 'socket.io-client'
import { Provider } from 'react-redux'

import configureStore from './components/store/configureStore'

import Storage from './cloud/Storage'

let storage = new Storage()

const store = configureStore({
    socket: io(),
    members: [],
    storage: storage
})


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
