import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Logo from './Logo.js';

storiesOf('Logo', module)
  .add('default', () => <Logo />);