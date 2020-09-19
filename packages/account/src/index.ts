// eslint-disable-next-line header/header
import {
  mnemonicGenerate,
  mnemonicToMiniSecret,
  mnemonicValidate,
  randomAsU8a,
  naclKeypairFromSecret,
  naclKeypairFromSeed,
  naclSign,
  naclVerify
} from '@polkadot/util-crypto';
import { encodeAddress, decodeAddress, setSS58Format } from '@polkadot/keyring';
import { PKCS8_HEADER } from '@polkadot/keyring/pair/defaults';
import { isHex, u8aToHex, hexToU8a } from '@polkadot/util';
import u8aFrom from './u8aFrom';
import decodePkcs8 from '@polkadot/keyring/pair/decode';
import encodePkcs8 from '@polkadot/keyring/pair/encode';

enum NET_PREFIX {
  testnet = 42,
  mainnet = 44
}

/**
 * interface KeyPair contains publickey and secretKey.
 *
*/
interface KeyPair {
  publicKey: Uint8Array,
  secretKey: Uint8Array
}

/**
 * 保持兼容 @chainx-v2/keyring/pair
 */
class Account {
  /**
     * user publickKey and privateKey
    */
  private _keyPair: KeyPair;

  /**
     * generate a account
    */
  constructor(keyPair: KeyPair) {
    this._keyPair = keyPair;
    setSS58Format(NET_PREFIX.testnet);
  }

  /**
     * generate mainnet account or testnet account
     * @param net  NET_PREFIX.textnet || NET_PREFIX.mainnet
     * @return void
     *
    */
  public static setNet(net: NET_PREFIX): void {
    if (!net) {
      throw new Error('expect pass in the network type, testnet or mainnet');
    }

    if (net === NET_PREFIX.mainnet || net === NET_PREFIX.testnet) {
      setSS58Format(net);
    }
  }

  /**
     * get private key
     * @return string
    */
  public privateKey(): string {
    return u8aToHex(this._keyPair.secretKey.subarray(0, 32));
  }

  /**
    * @name publicKey
    * @summary
    * @description
    * Returns message of 'address', which is string type.
    */
  public publicKey(): string {
    return u8aToHex(this._keyPair.publicKey);
  }

  /**
    * @name address
    * @summary
    * @description
    * Returns message of 'address', which is string type.
    */
  public address(): string {
    return encodeAddress(this.publicKey());
  }

  /**
    * @name sign
    * @summary Signs a message using the supplied secretKey
    * @description
    * Returns message signature of `message`, using the `secretKey`.
    * @example
    * <BR>
    *
    * ```javascript
    * import { sign } from '@chainx-v2/account';
    *
    * sign([...], [...]); // => [...]
    * ```
    */
  public sign(message: string): Uint8Array {
    return naclSign(message, this._keyPair);
  }

  /**
    * @name verify
    * @summary Validate that the message was correctly signed
    * @description
    * Returns result of verify
    */
  public verify(message: string, signature: string): boolean {
    return naclVerify(message, signature, this._keyPair.publicKey);
  }

  /**
    * @name from
    * @summary generate account using unkwon string, which is seed, privatekey,keystore...
    * @description
    * Returns acount of publicKey and seceretKey.
    */
  public static from(unknow: string): Account {
    if (Account.isMnemonicValid(unknow)) {
      return Account.fromMnemonic(unknow);
    }

    if (typeof unknow !== 'string') {
      const u8a: Uint8Array = u8aFrom(unknow);

      if (u8a.length === 32) {
        return new Account(naclKeypairFromSeed(u8a));
      } else if (u8a.length === 64) {
        return new Account(naclKeypairFromSecret(u8a));
      } else {
        throw new Error('unexpect value');
      }
    } else if (isHex(unknow, 512)) {
      return Account.fromSecretKey(unknow);
    } else if (
      isHex(unknow, 680) &&
      u8aFrom(unknow)
        .subarray(0, PKCS8_HEADER.length)
        .toString() === PKCS8_HEADER.toString()
    ) {
      return Account.fromPkcs8(unknow);
    } else {
      return Account.fromSeed(unknow);
    }
  }

  /**
    * @name fromMnemonic
    * @summary generate account using mnemonic
    * @description
    * Returns acount of publicKey and seceretKey.
    */
  public static fromMnemonic(mnemonic: string): Account {
    const seed = mnemonicToMiniSecret(mnemonic);

    return new Account(naclKeypairFromSeed(seed));
  }

  /**
    * @name fromPrivateKey
    * @summary generate account using mnemonic
    * @description
    * Returns acount of publicKey and seceretKey.
    */
  public static fromPrivateKey(privateKey: string): Account {
    return Account.fromSeed(privateKey);
  }

  /**
     * Generate new public/secret keypair for Alice from the supplied seed
     * @param seedLike string
     */
  public static fromSeed(seedLike: string): Account {
    const seedU8a = u8aFrom(seedLike, 'hex');

    return new Account(naclKeypairFromSeed(seedU8a));
  }

  /***
     *
     * Generate new public/secret keypair for Alice from the supplied text
     * @param text string
     *
    */
  public static fromText(text: string): Account {
    return Account.fromSeed(text);
  }

  /**
    * @name fromPrivateKey
    * @summary generate account using mnemonic
    * @description
    * Returns acount of publicKey and seceretKey.
    */
  public static fromSecretKey(secretKey: string): Account {
    const secretKeyU8a = u8aFrom(secretKey, 'hex');

    return new Account(naclKeypairFromSecret(secretKeyU8a));
  }

  /**
    * @name fromPkcs8
    * @summary generate account using mnemonic
    * @description
    * Returns acount of publicKey and seceretKey.
    */
  public static fromPkcs8(passphrase?: string, encoded?: any): Account {
    const decoded = decodePkcs8(passphrase, u8aFrom(encoded));

    return new Account(decoded);
  }

  /**
    * @name fromJson
    * @summary generate account using mnemonic
    * @description
    * Returns acount of publicKey and seceretKey.
    */
  public static fromJson(json: any, passphrase: any): Account {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const encoded: string = json.encoded;

    if (!encoded) throw new Error('keystore 格式错误');
    const decoded = decodePkcs8(passphrase, u8aFrom(encoded));

    return new Account(decoded);
  }

  /**
    * @name generate
    * @summary generate a random acountt
    * @description
    * Returns acount of publicKey and seceretKey.
    */
  public static generate(): Account {
    const random = randomAsU8a(32);

    return new Account(naclKeypairFromSeed(random));
  }

  /**
    * @name newMnemonic
    * @summary generate a random mnemonic
    * @description
    * Returns Mnemonic
    */
  public static newMnemonic(): string {
    return mnemonicGenerate();
  }

  /**
    * @name isMnemonicValid
    * @summary if menonic is valid or invalid
    * @description
    * Returns true or false
    */
  public static isMnemonicValid(mnemonic: string): boolean {
    return mnemonicValidate(mnemonic);
  }

  /**
    * @name isAddressValid
    * @summary if address is valid or invalid
    * @description
    * Returns true or false
    */
  public static isAddressValid(address: string): boolean {
    try {
      encodeAddress(
        isHex(address)
          ? hexToU8a(address)
          : decodeAddress(address)
      );
    } catch (error) {
      return false;
    }

    return true;
  }

  /**
    * @name encodeAddress
    * @summary generate address from the publickKey
    * @description
    * Returns the address
    */
  public static encodeAddress(pulickey: string): string {
    return encodeAddress(pulickey);
  }

  /**
    * @name decodeAddress
    * @summary generate address from the publickKey
    * @description
    * Returns the address
    */
  public static decodeAddress(address: string, ignoreChecksum?: boolean, prefix?: any): string {
    return u8aToHex(decodeAddress(address, ignoreChecksum, prefix));
  }

  /**
    * @name encodePkcs8
    * @summary  generate pksc8 from the passphrase
    * @description
    * Returns the address
    */
  public encodePkcs8(passphrase: string): any {
    const publicKey = this._keyPair.publicKey;
    const seed = this._keyPair.secretKey.subarray(0, 32);
    const encoded = encodePkcs8({ publicKey, seed }, passphrase);

    return {
      address: encodeAddress(publicKey),
      encoded: u8aToHex(encoded),
      encoding: {
        content: ['pkcs8', 'ed25519'],
        type: 'xsalsa20-poly1305',
        version: '1'
      }
    };
  }
}

export { Account, NET_PREFIX };
