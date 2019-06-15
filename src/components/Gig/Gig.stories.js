import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Gig from './Gig.js';

storiesOf('Gig', module)
  .add('default', () => <Gig />);