import React, { Fragment } from 'react';

import DateSelector from '../../containers/DateSelector/DateSelector';
import Gigs from '../../containers/Gigs/Gigs';
import CreatePlaylistButton from '../../components/CreatePlaylistButton/CreatePlaylistButton';

const Layout = props => (
  <Fragment>
    <DateSelector />
    <Gigs />
    <CreatePlaylistButton />
  </Fragment>
);

export default Layout;