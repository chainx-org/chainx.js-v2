![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)

# @ChainX

This library provides additional typing information for user to access ChainX Network by using [polkadot.js](https://github.com/polkadot-js/api).

- Wallet: https://dapps.chainx.org
- explorer: https://scan.chainx.org
- polkadot docx： https://polkadot.js.org/docs/

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
    const wsProvider = new WsProvider('wss://mainnet.spiderx.pro/ws');
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

- Listen to new blocks

This example shows how to subscribe to new blocks.

It displays the block number every time a new block is seen by the node you are connected to.

```js
// Import the API
const  { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } =  require('@chainx-v2/api');

async function main () {

  // the API has connected to the node and completed the initialisation process
  const wsProvider = new WsProvider('wss://mainnet.chainx.org/ws');
  const api =  await ApiPromise.create(options({ provider: wsProvider }));
  await api.isReady;

  // We only display a couple, then unsubscribe
  let count = 0;

  // Subscribe to the new headers on-chain. The callback is fired when new headers
  // are found, the call itself returns a promise with a subscription that can be
  // used to unsubscribe from the newHead subscription
  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
  console.log(`Chain is at block: #${header.number}`);

    if (++count === 256) {
      unsubscribe();
      process.exit(0);
    }
  });
}

main().catch(console.error);

```
- Listen to balance changes

This example shows how to instantiate a Polkadot and ChainX API object and use it to connect to a node and retrieve balance updates.

```js

// Import the API
const  { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } =  require('@chainx-v2/api');

// Known account we want to use (available on dev chain, with funds)
const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

async function main () {

  // the API has connected to the node and completed the initialisation process
  const wsProvider = new WsProvider('wss://mainnet.spiderx.pro/ws');
  const api =  await ApiPromise.create(options({ provider: wsProvider }));
  await api.isReady;
  
   // Retrieve the initial balance. Since the call has no callback, it is simply a promise
  // that resolves to the current on-chain value
  let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(Alice);

  console.log(`${Alice} has a balance of ${previousFree}, nonce ${previousNonce}`);
  console.log(`You may leave this example running and  transfer any value to ${Alice}`);

  // Here we subscribe to any balance changes and update the on-screen value
  api.query.system.account(Alice, ({ data: { free: currentFree }, nonce: currentNonce }) => {
    // Calculate the delta
    const change = currentFree.sub(previousFree);

    // Only display positive value changes (Since we are pulling `previous` above already,
    // the initial balance change will also be zero)
    if (!change.isZero()) {
      console.log(`New balance change of ${change}, nonce ${currentNonce}`);

      previousFree = currentFree;
      previousNonce = currentNonce;
    }
  });
}

main().catch(console.error);

```

- Listen to balance changes

This example shows how to instantiate a Polkadot API and ChainX API object and use it to connect to a node and retrieve balance updates.\

```js
// Import the API
const  { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } =  require('@chainx-v2/api');

// Known account we want to use (available on dev chain, with funds)
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

async function main () {

  // the API has connected to the node and completed the initialisation process
  const wsProvider = new WsProvider('wss://mainnet.spiderx.pro/ws');
  const api =  await ApiPromise.create(options({ provider: wsProvider }));
  await api.isReady;
  
  console.log('Tracking balances for:', [ALICE, BOB]);

  // Subscribe and listen to several balance changes
  api.query.system.account.multi([ALICE, BOB], (balances) => {
    console.log('Change detected, new balances: ', balances.map(({ data: { free } }) => free));
  });
}

main().catch(console.error);

```

- Unsubscribe from listening to updates

This example shows how to subscribe to and later unsubscribe from listening to block updates.

In this example we're calling the built-in unsubscribe() function after a timeOut of 20s to cleanup and unsubscribe from listening to updates.

```js

const  { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } =  require('@chainx-v2/api');

// Known account we want to use (available on dev chain, with funds)
const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

async function main () {

  // the API has connected to the node and completed the initialisation process
  const wsProvider = new WsProvider('wss://testnet-1.chainx.org/ws');
  const api =  await ApiPromise.create(options({ provider: wsProvider }));
  await api.isReady;
    // Subscribe to chain updates and log the current block number on update.
  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
    console.log(`Chain is at block: #${header.number}`);
  });

  // In this example we're calling the unsubscribe() function that is being
  // returned by the api call function after 20s.
  setTimeout(() => {
    unsubscribe();
    console.log('Unsubscribed');
  }, 20000);
}

main().catch(console.error);
```

- Traverse events

Query the system events and extract information from them. This example runs until exited via Ctrl-C

```js

// Import the API
const  { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } =  require('@chainx-v2/api');

async function main () {
  // Create our API with a default connection to the local node
  const wsProvider = new WsProvider('wss://mainnet.spiderx.pro/ws');
  const api =  await ApiPromise.create(options({ provider: wsProvider }));
  await api.isReady;

  // Subscribe to system events via storage
  api.query.system.events((events) => {
    console.log(`\nReceived ${events.length} events:`);

    // Loop through the Vec<EventRecord>
    events.forEach((record) => {
      // Extract the phase, event and the event types
      const { event, phase } = record;
      const types = event.typeDef;

      // Show what we are busy with
      console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
      console.log(`\t\t${event.meta.documentation.toString()}`);

      // Loop through each of the parameters, displaying the type and data
      event.data.forEach((data, index) => {
        console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
      });
    });
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});

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

### How can I batch transactions?
Polkadot/Substrate provides a utility.batch method that can be used to send a number of transactions at once. These are then executed from a single sender (single nonce specified) in sequence. This is very useful in a number of cases, for instance if you wish to create a payout for a validator for multiple eras, you can use this method. Likewise, you can send a number of transfers at once. Or even batch different types of transactions.

```js

// Import the API
const  { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } =  require('@chainx-v2/api');

async function main () {
  // Create our API with a default connection to the local node
  const wsProvider = new WsProvider('wss://mainnet.spiderx.pro/ws');
  const api =  await ApiPromise.create(options({ provider: wsProvider }));
  await api.isReady;

  // Subscribe to system events via storage
  // transfer with memo
  const txs = [
    api.tx.balances.transfer(addrBob, 12345),
    api.tx.system.remark('test memo')  
  ];

 // construct the batch and send the transactions
 api.tx.utility
  .batch(txs)
  .signAndSend(sender, ({ status }) => {
    if (status.isInBlock) {
      console.log(`included in ${status.asInBlock}`);
    }
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});


```
### offline Signature


https://github.com/polkadot-js/tools/tree/master/packages/signer-cli

# Packages

- [api](./packages/api)
  - Contains necessary options to create a polkadot.js API instance
