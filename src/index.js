import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import { ToastContainer} from 'react-toastify';

import "./styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { store } from './store';
import App from './App';
import { unregister } from './serviceWorker';

const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
        <ToastContainer />
      </HashRouter>
    </Provider>,
    rootElement
  );
};

renderApp(App);
unregister();
