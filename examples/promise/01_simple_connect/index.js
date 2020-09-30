// eslint-disable-next-line header/header
const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { PAIRS } = require('@polkadot/keyring/testing');
const testKeyring = require('@polkadot/keyring/testing').default;
const { encodeAddress } = require('@polkadot/keyring');
const { Account } = require('@chainx-v2/account');
const { options } = require('@chainx-v2/api');
const { ConsoleLogger } = require('typedoc/dist/lib/utils');

const url = 'ws://47.114.150.67:8000';
const wsProvider = new WsProvider(url);

// Create a keyring instance
const keyring = new Keyring({ type: 'sr25519' });
const keyring2 = testKeyring()
const alice = keyring2.pairs[0];

// eslint-disable-next-line no-void
async function excuteTransfer() {
  const api = await ApiPromise.create(options({ provider: wsProvider }));
  const aliceAddr = encodeAddress(PAIRS[0].publicKey, 42);

  const systemProperties = await api.rpc.system.properties();

  console.log(aliceAddr);
  const balance = await api.query.system.account(PAIRS[0].publicKey);


  // Add our Alice dev account
  const alice2 = keyring.addFromUri('//Alice', { name: 'Alice default' });

  // Log some info
  console.log(`${alice2.meta.name}: has address ${alice2.address} with publicKey [${alice2.publicKey}]`);


  // Add our Alice dev account
  const bob = keyring.addFromUri('//Bob', { name: 'Alice default' });

  // Log some info
  console.log(`${bob.meta.name}: has address ${bob.address} with publicKey [${bob.publicKey}]`);


  // Add our Alice dev account
  const cherry = keyring.addFromUri('//Charlie', { name: 'Alice default' });

  // Log some info
  console.log(`${cherry.meta.name}: has address ${cherry.address} with publicKey [${cherry.publicKey}]`);

  console.log('balance', balance.data.free.toString());

  console.log(cherry.address);

  const transfer = api.tx.balances.transfer('5CRWi74MEjWvAxoHspUizixTbuxHcUXEqpgpMjC1wyPrB6Sb', 400 * Math.pow(10, 8));

  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(alice);

  console.log('Transfer sent with hash', hash.toHex());

  process.exit();
}

// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/require-await
async function main() {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises

  await excuteTransfer();
}

main().catch(console.error);


async function main() {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises

  await excuteTransfer();
}

main().catch(console.error);
