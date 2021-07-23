// react
import React from 'react';
import ReactDOM from 'react-dom';

// components
import App from './App';


//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// react-redux
import { Provider } from "react-redux";

//redux-thunk
import thunkMiddleware from 'redux-thunk';

// redux
import { createStore, applyMiddleware } from "redux";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);