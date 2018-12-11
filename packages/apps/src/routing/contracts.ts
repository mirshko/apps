// Copyright 2017-2018 @polkadot/apps authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Routes } from '../types';

import Contracts from '@polkadot/app-contracts/index';

export default ([
  {
    Component: Contracts,
    i18n: {
      defaultValue: 'Contracts'
    },
    icon: 'file code',
    isApiGated: true,
    isHidden: false,
    name: 'contracts'
  }
] as Routes);
