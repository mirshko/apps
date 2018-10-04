// Copyright 2017-2018 @polkadot/app-extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';
import { I18nProps } from '@polkadot/ui-app/types';
import { QueueTx$MessageAdd } from '@polkadot/ui-signer/types';

import React from 'react';
import Api from '@polkadot/api-observable';
import Button from '@polkadot/ui-app/Button';

import Account from './Account';
import Extrinsic from './Extrinsic';
import Nonce from './Nonce';
import translate from './translate';

type Props = I18nProps & {
  queueAdd: QueueTx$MessageAdd
};

type State = {
  isValid: boolean,
  encoded: EncodedMessage,
  accountNonce: BN,
  publicKey: Uint8Array
};

class Selection extends React.PureComponent<Props, State> {
  state: State = {
    isValid: false
  } as State;

  render () {
    const { t } = this.props;
    const { publicKey, isValid } = this.state;

    return (
      <div className='extrinsics--Selection'>
        <Account
          isInput={false}
          label={t('display.sender', {
            defaultValue: 'using the selected account'
          })}
          onChange={this.onChangeSender}
          type='account'
        />
        <Extrinsic
          defaultValue={Api.extrinsics.balances.transfer}
          labelMethod={t('display.method', {
            defaultValue: 'submit the following extrinsic'
          })}
          onChange={this.onChangeMessage}
        />
        <Nonce
          label={t('display.nonce', {
            defaultValue: 'with an index'
          })}
          rxChange={this.onChangeNonce}
          value={publicKey}
        />
        <Button.Group>
          <Button
            isDisabled={!isValid}
            isPrimary
            onClick={this.onQueue}
            text={t('submit.label', {
              defaultValue: 'Submit Transaction'
            })}
          />
        </Button.Group>
      </div>
    );
  }

  nextState (newState: State): void {
    this.setState(
      (prevState: State): State => {
        const { encoded = prevState.encoded, accountNonce = prevState.accountNonce, publicKey = prevState.publicKey } = newState;
        const isValid = !!(
          publicKey &&
          publicKey.length &&
          encoded &&
          encoded.isValid
        );

        return {
          encoded,
          isValid,
          accountNonce,
          publicKey
        };
      }
    );
  }

  onChangeMessage = (encoded: EncodedMessage): void => {
    this.nextState({ encoded } as State);
  }

  onChangeNonce = (accountNonce: BN = new BN(0)): void => {
    this.nextState({ accountNonce } as State);
  }

  onChangeSender = (publicKey: Uint8Array): void => {
    this.nextState({ publicKey, accountNonce: new BN(0) } as State);
  }

  onQueue = (): void => {
    const { queueAdd } = this.props;
    const { encoded: { isValid, values }, accountNonce, publicKey } = this.state;

    queueAdd({
      isValid,
      nonce,
      publicKey,
      values
    });
  }
}

export default translate(Selection);
