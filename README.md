![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)

# @ChainX

This library provides additional typing information for user to access ChainX Network by using [polkadot.js](https://github.com/polkadot-js/api).

# Getting Started

- Install dependencies

```bash
yarn add @polkadot/api @chainx-v2/api
```

- Create API instance

```js
const  { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } =  require('@chainx-v2/api');

async function main() {
    const wsProvider = new WsProvider('wss://testnet-1.chainx.org/ws');
    const api =  await ApiPromise.create(options({ provider: wsProvider }));
    await api.isReady;
    // use api
    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
      ]);
    
    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
}

main()
```

- Use Api To Transfer Balance

```js
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { PAIRS } = require('@polkadot/keyring/testing');
const testKeyring = require('@polkadot/keyring/testing').default;
const { encodeAddress } = require('@polkadot/keyring');
const { options } =require('@chainx-v2/api');
const url = 'wss://testnet-1.chainx.org/ws';
const wsProvider = new WsProvider(url);
const keyring = testKeyring();
const alice = keyring.pairs[0];

// eslint-disable-next-line no-void
async function excuteTransfer () {
  const api = await ApiPromise.create(options({ provider: wsProvider }));
  const aliceAddr = encodeAddress(PAIRS[0].publicKey, 42);

  const systemProperties = await api.rpc.system.properties();

  console.log(aliceAddr);
  const balance = await api.query.system.account(PAIRS[0].publicKey);

  console.log('balance', balance.data.free.toString());

  const toAddress = '5ChcBJcpSPojToxRCNSSYckpLkfPUg42o6wXv6Vo878Z54SR';

  const transfer = api.tx.balances.transfer(toAddress, 1000000 * Math.pow(10, 8));
  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(alice);

  console.log('Transfer sent with hash', hash.toHex());

  process.exit();
}

async function main () {
  await excuteTransfer();
}

```

# Packages

- [api](./packages/api)
  - Contains necessary options to create a polkadot.js API instance
- [api-account](./packages/api-derive)
