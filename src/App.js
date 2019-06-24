import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import PlaylistCreator from './containers/PlaylistCreator/PlaylistCreator';

const App = () => (
  // basename for BrowserRouter set for app to display the correct url when hosted on gh-pages
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path='/' exact component={Layout} />
      <Route path='/playlist' exact component={PlaylistCreator} />
      <Redirect from='/' to='/' />
    </Switch>
  </BrowserRouter>
);

export default App;