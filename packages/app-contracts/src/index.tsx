// Copyright 2017-2018 @polkadot/app-contracts authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { I18nProps } from '@polkadot/ui-app/types';

import React from 'react';

import classes from '@polkadot/ui-app/util/classes';

import translate from './translate';
// import Test from './Test';

import './index.css';

type Props = I18nProps & {};

type State = {};

class ContractsApp extends React.PureComponent<Props, State> {
  state: State = {};

  render () {
    const { className, style, t } = this.props;
    const {} = this.state;

    return (
      <main
        className={classes('contracts--App', className)}
        style={style}
      >
        <div className='ui--row'>
          {/* <Test /> */}
        </div>
      </main>
    );
  }
}

export default translate(ContractsApp);
