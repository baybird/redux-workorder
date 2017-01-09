import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import configureStore from './stores/store.js';
const store = configureStore();


import App from './containers/container';
import WorkOrder from './components/Workorder/index.jsx';
import Description from './components/Description/index.jsx';


render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App} >
          <IndexRoute component={WorkOrder} />
          <Route path="Description" component={Description}/>
          <Route  path="Workorder" component={WorkOrder} />
        </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
