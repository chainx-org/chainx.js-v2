// eslint-disable-next-line header/header
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { PAIRS } = require('@polkadot/keyring/testing');
const testKeyring = require('@polkadot/keyring/testing').default;
const { encodeAddress } = require('@polkadot/keyring');
const { Account } = require('@chainx-v2/account');
const { options } =require('@chainx-v2/api');

const url = 'wss://staging-1.chainx.org/ws';
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

  let id = 0;
  const toAddress = Account.generate().address();

  console.log(toAddress);

  const transfer = api.tx.balances.transfer(toAddress, 1000000 * Math.pow(10, 8));

  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(alice);

  console.log('Transfer sent with hash', hash.toHex());

  process.exit();
}

// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/require-await
async function main () {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises

  await excuteTransfer();
}

main().catch(console.error);
