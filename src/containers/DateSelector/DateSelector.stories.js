import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import DateSelector from './DateSelector.js';

storiesOf('DateSelector', module)
  .add('default', () => <DateSelector />);