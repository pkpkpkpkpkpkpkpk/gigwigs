import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import PlaylistCreator from './PlaylistCreator.js';

storiesOf('PlaylistCreator', module)
  .add('default', () => <PlaylistCreator />);