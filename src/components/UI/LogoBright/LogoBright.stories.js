import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import LogoBright from './LogoBright.js';

storiesOf('LogoBright', module)
  .add('default', () => <LogoBright />);