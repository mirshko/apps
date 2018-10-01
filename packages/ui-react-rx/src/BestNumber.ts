// Copyright 2017-2018 @polkadot/ui-react-rx authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BlockNumber } from '@polkadot/api-codec';

import numberFormat from './util/numberFormat';
import withObservableDiv from './with/observableDiv';

const Component: React.ComponentType<any> = withObservableDiv('bestNumber')(
  (value?: BlockNumber): string => {
    return value
      ? numberFormat(value.toBn())
      : 'unknown';
  },
  { className: 'rx--BestNumber' }
);

export default Component;
