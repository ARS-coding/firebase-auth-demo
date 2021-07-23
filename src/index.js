// react
import React from 'react';
import ReactDOM from 'react-dom';

// components
import App from './App';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// redux
import { createStore, applyMiddleware } from "redux";

// react-redux
import { Provider } from "react-redux";

//redux-thunk
import thunkMiddleware from 'redux-thunk';

// redux-devtools-extension
import { composeWithDevTools } from "redux-devtools-extension";

// root reducer
import rootReducer from "./rootReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, composedEnhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);