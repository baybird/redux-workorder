import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';


import configureStore from './stores/store.js';
const store = configureStore();

import App from './components/App.jsx';
import WorkOrder from './components/Workorder/index.jsx';
import requireAuthentication from './components/AuthenticatedComponent.js';
import Account from './components/Account/index.jsx'

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={App} >
          <Route component={requireAuthentication}>
            <IndexRoute component={ WorkOrder } />
            <Route path="/Workorder" component={WorkOrder} />
            <Route path="/Account" component={(Account)} />
          </Route>
          <Route path="/Account/:action" component={Account} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
