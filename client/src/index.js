import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import configureStore from './stores/store.js';
const store = configureStore();

// import rootReducer from './reducers/workorder.js';
// import { createStore } from 'redux'
// const store = createStore(rootReducer)
// console.log(store.getState())
// console.log("------------------");
// store.dispatch({type: 'DIALOG_UPDATE_ORDER', id: 1});
// console.log(store.getState())
// console.log("------------------");

import App from './components/App.jsx';
import WorkOrder from './containers/contWorkorder.js';
import Description from './components/Description/index.jsx';
import requireAuthentication from './components/AuthenticatedComponent.js';
import Account from './components/Account/index.jsx'

// import {ProtectedView} from './views/ProtectedView.js';
// <Route path="protected" component={requireAuthentication(ProtectedView)}/>

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
          <Route path="/" component={App} >
            <IndexRoute component={WorkOrder} />
            <Route path="Workorder" component={WorkOrder} />
            <Route path="About" component={Description}/>
            <Route path="/Account" component={requireAuthentication(Account)} />
            <Route path="/Account/:action" component={Account} />
          </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
