// eslint-disable-next-line header/header
const { ApiPromise, Keyring, WsProvider } = require('@polkadot/api');
const { PAIRS } = require('@polkadot/keyring/testing');
const testKeyring = require('@polkadot/keyring/testing').default;
const { encodeAddress } = require('@polkadot/keyring');
const { Account } = require('@chainx-v2/account');
const { options } = require('@chainx-v2/api');
const { ConsoleLogger } = require('typedoc/dist/lib/utils');

const url = 'wss://staging-1.chainx.org/ws';
const wsProvider = new WsProvider(url);

// Create a keyring instance
const keyring = new Keyring({ type: 'sr25519' });
const keyring2 = testKeyring();
const alice = keyring2.pairs[0];

// eslint-disable-next-line no-void
async function excuteTransfer () {
  const api = await ApiPromise.create(options({ provider: wsProvider }));
  const aliceAddr = encodeAddress(PAIRS[0].publicKey, 42);


}



excuteTransfer().catch(console.error);
