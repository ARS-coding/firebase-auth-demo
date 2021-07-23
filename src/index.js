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

// root reducer
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);