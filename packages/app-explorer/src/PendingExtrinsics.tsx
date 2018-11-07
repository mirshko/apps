// Copyright 2017-2018 @polkadot/app-explorer authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { I18nProps } from '@polkadot/ui-app/types';

import React from 'react';
// FIXME - add specific type for PendingExtrinsics
// import { PendingExtrinsics } from '@polkadot/types';
import { CardSummary } from '@polkadot/ui-app/index';
import { withMulti, withObservable } from '@polkadot/ui-react-rx/with/index';

import translate from './translate';

type Props = I18nProps & {
  // FIXME - add specific type for PendingExtrinsics
  pendingExtrinsics?: any
};

class PendingExtrinsics extends React.PureComponent<Props> {
  render () {
    return [
      this.renderPendingExtrinsics()
    ];
  }

  private renderPendingExtrinsics () {
    const { pendingExtrinsics, t } = this.props;

    if (!pendingExtrinsics) {
      return null;
    }

    return (
      <CardSummary
        key='pendingExtrinsics'
        label={t('summary.pendingExtrinsics', {
          defaultValue: 'pending extrinsics'
        })}
        progress={{
          // FIXME - determine appropriate properties for below
          // color: 'autoReverse',
          // isPercent: true,
          // total: pendingExtrinsics,
          value: pendingExtrinsics
        }}
      />
    );
  }
}

export default withMulti(
  translate(PendingExtrinsics),
  withObservable('pendingExtrinsics')
);
