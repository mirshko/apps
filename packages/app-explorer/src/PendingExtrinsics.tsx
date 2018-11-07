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

import Ws from '@polkadot/rpc-provider/ws';

import Rpc from '@polkadot/rpc-core';

import { ApiPromise } from '@polkadot/api';

type Props = I18nProps & {
  // FIXME - add specific type for PendingExtrinsics
  pendingExtrinsics?: any
};

class PendingExtrinsics extends React.PureComponent<Props> {

  async componentWillMount () {
    // let api;
    // api = new Rpc(new Ws('ws://127.0.0.1:9944'));

    // // retrieves the pending extrinsics
    // // api.author
    // api.rpc.chain
    //   .pendingExtrinsics()
    //   .then((pendingExtrinsics) => {
    //     console.log('pending extrinsics', pendingExtrinsics);
    //   })
    //   .catch((error) => {
    //     console.error(error);

    //     throw error;
    //   });

    const api = await ApiPromise.create();
    const subscriptionId = await api.rpc.chain.pendingExtrinsics((pendingExtrinsics: any) => {
      console.log(`pending extrinsics: `, pendingExtrinsics);
    });
  }

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
  translate(PendingExtrinsics)
  // ,
  // withObservable('pendingExtrinsics')
);
