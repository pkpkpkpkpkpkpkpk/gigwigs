import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Settings from './Settings.js';

storiesOf('Settings', module)
  .add('default', () => <Settings />);