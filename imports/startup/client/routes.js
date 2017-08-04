import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import App from '/imports/ui/layouts/App';
import JoinPage from '/imports/ui/pages/LoginPage';
import RoomPage from '/imports/ui/pages/RoomPage';
import NotFoundPage from '/imports/ui/pages/NotFound';

export const Routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={JoinPage} />
      <Route path='/room/:roomId' component={RoomPage} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  </Router>
);
