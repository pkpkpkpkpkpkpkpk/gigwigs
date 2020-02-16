import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Layout from './hoc/Layout/Layout';
import Settings from './containers/Settings/Settings';
import PlaylistCreator from './containers/PlaylistCreator/PlaylistCreator';

axios.defaults.baseURL = 'https://gigwigs-server.appspot.com';
axios.defaults.timeout = 5000;

const App = props => {
  // on first visit, user needs to select a location, which will be saved using redux persist
  let onInitialVisit = null;
  if (props.where === undefined) {
    onInitialVisit = <Route path='/' exact component={Settings} />;
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        {onInitialVisit}
        <Route path='/' exact component={Layout} />
        <Route path='/settings' exact component={Settings} />
        <Route path='/playlist' exact component={PlaylistCreator} />
        <Redirect from='/' to='/' />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    where: state.where
  };
}

export default connect(mapStateToProps)(App);