import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import ToggleSettingsButton from './ToggleSettingsButton.js';

storiesOf('ToggleSettingsButton', module)
  .add('default', () => <ToggleSettingsButton />);