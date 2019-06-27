import React, { Fragment } from 'react';

import DateSelector from '../../containers/DateSelector/DateSelector';
import ToggleSettingsButton from '../../components/UI/ToggleSettingsButton/ToggleSettingsButton';
import Gigs from '../../containers/Gigs/Gigs';
import CreatePlaylistButton from '../../components/CreatePlaylistButton/CreatePlaylistButton';

const Layout = props => (
  <Fragment>
    <DateSelector />
    <ToggleSettingsButton />
    <Gigs />
    <CreatePlaylistButton />
  </Fragment>
);

export default Layout;