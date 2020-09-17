// Copyright 2017-2020 @chainx-v2/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Account, NET_PREFIX } from '../src/index';

// eslint-disable-next-line @typescript-eslint/require-await
function generateAccount (): void {
  const account1 = Account.generate();

  const publicKey1 = account1.publicKey(); // publickey

  console.log('publicKey1: ', publicKey1);

  const privateKey1 = account1.privateKey(); // privatekey

  console.log('privateKey1: ', privateKey1);

  const address1 = account1.address(); // address

  console.log('address1: ', address1);

  const mnemonic = Account.newMnemonic(); // random seed

  console.log('mnemonic: ', mnemonic);

  const account2 = Account.from(mnemonic);

  const address2 = Account.encodeAddress(account2.publicKey());

  console.log('address2: ', address2);

  const publicKey2 = Account.decodeAddress(address2);

  console.log('publicKey2: ', publicKey2);

  Account.setNet(NET_PREFIX.testnet);
  const address3 = Account.encodeAddress(publicKey2);

  console.log('address3:', address3);

  Account.setNet(NET_PREFIX.mainnet);
  const address4 = Account.encodeAddress(publicKey2);

  console.log('address4:', address4);

  const account3 = Account.from(privateKey1);

  console.log('address:', account3.address());
}

describe('account module tests', (): void => {
  // eslint-disable-next-line @typescript-eslint/require-await
  it('retrieves balances correctly', async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const aliceAccount = Account.fromPrivateKey('0xabf8e5bdbe30c65656c0a3cbd181ff8a56294a69dfedd27982aace4a76909115');
    const aliceAddress = aliceAccount.address();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/restrict-template-expressions
    // console.log(`generate account : ${chainx.account.generate()}`);
    console.log('alice address:' + aliceAddress);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    // const data = await chainx.rpc.xassets.getAssetsByAccount('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');

    // Create a extrinsic, transferring 12345 units to Bob

    // const transfer = await api.tx.balances.transfer('5FA9nQDVg267DEd8m1ZypXLBnvN7SFxYwV7ndqSYGiN9TTpu', 200000000);
    // Sign and send the transaction using our account
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const hash = await transfer.signAndSend('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    // console.log(`${aliceAddress} has a balance of ${data}`);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`You may leave this example running and start example 06 or transfer any value to ${aliceAddress}`);

    generateAccount();
  });
});
