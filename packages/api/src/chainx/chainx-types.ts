// eslint-disable-next-line sort-keys,header/header
export default {
  "AssetType": {
    "_enum": [
      "Usable",
      "Locked",
      "Reserved",
      "ReservedWithdrawal",
      "ReservedDexSpot",
      "ReservedXRC20"
    ]
  },
  "Chain": {
    "_enum": [
      "ChainX",
      "Bitcoin",
      "Ethereum",
      "Polkadot"
    ]
  },
  "XRC20Selector": {
    "_enum": [
      "BalanceOf",
      "TotalSupply",
      "Name",
      "Symbol",
      "Decimals",
      "Issue",
      "Destroy"
    ]
  },
  "OrderType": {
    "_enum": [
      "Limit",
      "Market"
    ]
  },
  "Side": {
    "_enum": [
      "Buy",
      "Sell"
    ]
  },
  "LockedType": {
    "_enum": [
      "Bonded",
      "BondedWithdrawal"
    ]
  },
  "NetworkType": {
    "_enum": [
      "Mainnet",
      "Testnet"
    ]
  },
  "Memo": "Text",
  "AssetInfo": {
    "token": "Token",
    "tokenName": "Token",
    "chain": "Chain",
    "decimals": "Decimals",
    "desc": "Desc"
  },
  "TradingPairProfile": {
    "id": "TradingPairId",
    "currencyPair": "CurrencyPair",
    "pipDecimals": "u32",
    "tickDecimals": "u32",
    "tradable": "bool"
  },
  "Order": {
    "props": "OrderProperty",
    "status": "OrderStatus",
    "remaining": "Balance",
    "executedIndices": "Vec<TradingHistoryIndex>",
    "alreadyFilled": "Balance",
    "lastUpdateAt": "BlockNumber"
  },
  "TradingPairInfo": {
    "latestPrice": "Price",
    "lastUpdated": "BlockNumber"
  },
  "OrderExecutedInfo": {
    "tradingHistoryIdx": "TradingHistoryIndex",
    "pairId": "TradingPairId",
    "price": "Price",
    "maker": "AccountId",
    "taker": "AccountId",
    "makerOrderId": "OrderId",
    "takerOrderId": "OrderId",
    "turnover": "Balance",
    "executedAt": "BlockNumber"
  },
  "BtcHeaderInfo": {
    "header": "BtcHeader",
    "height": "u32"
  },
  "BtcParams": {
    "maxBits": "u32",
    "blockMaxFuture": "u32",
    "targetTimespanSeconds": "u32",
    "targetSpacingSeconds": "u32",
    "retargetingFactor": "u32",
    "retargetingInterval": "u32",
    "minTimespan": "u32",
    "maxTimespan": "u32"
  },
  "MiningAssetInfo": {
    "assetId": "AssetId",
    "miningPower": "FixedAssetPower",
    "rewardPot": "AccountId",
    "rewardPotBalance": "Balance",
    "lastTotalMiningWeight": "WeightType",
    "lastTotalMiningWeightUpdate": "BlockNumber"
  },
  "AssetLedger": {
    "lastTotalMiningWeight": "MiningWeight",
    "lastTotalMiningWeightUpdate": "BlockNumber"
  },
  "MinerLedger": {
    "lastMiningWeight": "MiningWeight",
    "lastMiningWeightUpdate": "BlockNumber",
    "lastClaim": "Option<BlockNumber>"
  },
  "ClaimRestriction": {
    "stakingRequirement": "StakingRequirement",
    "frequencyLimit": "BlockNumber"
  },
  "NominatorInfo": {
    "lastRebond": "Option<BlockNumber>"
  },
  "BondRequirement": {
    "selfBonded": "Balance",
    "total": "Balance"
  },
  "Unbonded": {
    "value": "Balance",
    "lockedUntil": "BlockNumber"
  },
  "ValidatorLedger": {
    "total": "Balance",
    "lastTotalVoteWeight": "WeightType",
    "lastTotalVoteWeightUpdate": "BlockNumber"
  },
  "NominatorLedger": {
    "nomination": "Balance",
    "lastVoteWeight": "WeightType",
    "lastVoteWeightUpdate": "BlockNumber",
    "unbondedChunks": "Vec<Unbonded>"
  },
  "ValidatorProfile": {
    "registeredAt": "BlockNumber",
    "isChilled": "bool",
    "lastChilled": "Option<BlockNumber>",
    "referralId": "ReferralId"
  },
  "GlobalDistribution": {
    "treasury": "u32",
    "mining": "u32"
  },
  "MiningDistribution": {
    "asset": "u32",
    "staking": "u32"
  },
  "UnbondedIndex": "u32",
  "Desc": "Text",
  "Token": "Text",
  "AddrStr": "Text",
  "Selector": "[u8; 4]",
  "HandicapInfo": "Handicap",
  "Price": "Balance",
  "OrderId": "u64",
  "TradingPairId": "u32",
  "TradingHistoryIndex": "u64",
  "PriceFluctuation": "u32",
  "BtcAddress": "Text",
  "FixedAssetPower": "u32",
  "StakingRequirement": "u32",
  "Decimals": "u8",
  "CurrencyPair": {
    "base": "AssetId",
    "quote": "AssetId"
  },
  "OrderStatus": {
    "_enum": [
      "Created",
      "PartialFill",
      "Filled",
      "PartialFillAndCanceled",
      "Canceled"
    ]
  },
  "AssetId": "u32",
  "MiningWeight": "u128",
  "WeightType": "u128",
  "ReferralId": "Text",
  "AssetRestriction": {
    "_enum": [
      "Move",
      "Transfer",
      "Deposit",
      "Withdraw",
      "DestroyWithdrawal",
      "DestroyFree"
    ]
  },
  "AssetRestrictions": {
    "mask": "u32"
  },
  "BtcHeader": {
    "version": "u32",
    "previousHeaderHash": "H256",
    "merkleRootHash": "H256",
    "time": "u32",
    "bits": "BtcCompact",
    "nonce": "u32"
  },
  "BtcNetwork": {
    "_enum": [
      "Mainnet",
      "Testnet"
    ]
  },
  "OrderInfo": "Order",
  "Amount": "i128",
  "AmountOf": "Amount",
  "CurrencyIdOf": "AssetId",
  "CurrencyId": "AssetId",
  "Handicap": {
    "highestBid": "Price",
    "lowestAsk": "Price"
  },
  "OrderProperty": {
    "id": "OrderId",
    "side": "Side",
    "price": "Price",
    "amount": "Amount",
    "pairId": "TradingPairId",
    "submitter": "AccountId",
    "orderType": "OrderType",
    "createdAt": "BlockNumber"
  },
  "RpcOrder": {
    "orderId": "OrderId",
    "side": "Side",
    "price": "Price",
    "amount": "Balance",
    "pairId": "TradingPairId",
    "submitter": "AccountId",
    "orderType": "OrderType",
    "createdAt": "BlockNumber",
    "status": "OrderStatus",
    "remaining": "Balance",
    "executedIndices": "Vec<TradingHistoryIndex>",
    "alreadyFilled": "Balance",
    "reservedBalance": "Balance",
    "lastUpdateAt": "BlockNumber"
  },
  "TotalAssetInfo": {
    "info": "AssetInfo",
    "balance": "BTreeMap<AssetType, Balance>",
    "isOnline": "bool",
    "restrictions": "AssetRestrictions"
  },
  "WithdrawalState": {
    "_enum": [
      "Applying",
      "Processing",
      "NormalFinish",
      "RootFinish",
      "NormalCancel",
      "RootCancel"
    ]
  },
  "WithdrawalRecord": {
    "assetId": "AssetId",
    "applicant": "AccountId",
    "balance": "Balance",
    "addr": "AddrStr",
    "ext": "Memo",
    "height": "BlockNumber"
  },
  "WithdrawalLimit": {
    "minimalWithdrawal": "Balance",
    "fee": "Balance"
  },
  "TrusteeInfoConfig": {
    "minTrusteeCount": "u32",
    "maxTrusteeCount": "u32"
  },
  "GenericTrusteeIntentionProps": {
    "about": "Text",
    "hotEntity": "Vec<u8>",
    "coldEntity": "Vec<u8>"
  },
  "GenericTrusteeSessionInfo": {
    "trusteeList": "Vec<AccountId>",
    "threshold": "u16",
    "hotAddress": "Vec<u8>",
    "coldAddress": "Vec<u8>"
  },
  "ChainAddress": "Vec<u8>",
  "BtcTrusteeType": "Vec<u8>",
  "BtcTrusteeAddrInfo": {
    "addr": "BtcAddress",
    "redeemScript": "Vec<u8>"
  },
  "BtcTrusteeIntentionProps": {
    "about": "Text",
    "hotEntity": "BtcTrusteeType",
    "coldEntity": "BtcTrusteeType"
  },
  "BtcTrusteeSessionInfo": {
    "trusteeList": "Vec<AccountId>",
    "threshold": "u16",
    "hotAddress": "BtcTrusteeAddrInfo",
    "coldAddress": "BtcTrusteeAddrInfo"
  },
  "BtcCompact": "u32",
  "BtcTransaction": "Vec<u8>",
  "BtcPartialMerkleTree": {
    "txCount": "u32",
    "hashes": "Vec<H256>",
    "bits": "Vec<bool>"
  },
  "BtcRelayedTxInfo": {
    "blockHash": "H256",
    "merkleProof": "BtcPartialMerkleTree"
  },
  "BtcHeaderIndex": {
    "hash": "H256",
    "height": "u32"
  },
  "BtcTxResult": {
    "_enum": [
      "Success",
      "Failed"
    ]
  },
  "BtcTxState": {
    "result": "BtcTxResult",
    "txType": "BtcTxType"
  },
  "BtcTxType": {
    "_enum": [
      "Withdrawal",
      "Deposit",
      "HotAndCold",
      "TrusteeTransition",
      "Irrelevance"
    ]
  },
  "BtcDepositCache": {
    "txid": "H256",
    "balance": "u64"
  },
  "BtcVoteResult": {
    "_enum": [
      "Unfinish",
      "Finish"
    ]
  },
  "BtcWithdrawalProposal": {
    "sigState": "BtcVoteResult",
    "withdrawalIdList": "Vec<u32>",
    "tx": "BtcTransaction",
    "trusteeList": "Vec<(AccountId, bool)>"
  },
  "BtcTxVerifier": {
    "_enum": [
      "Recover",
      "RuntimeInterface"
    ]
  },
  "ValidatorInfo": {
    "account": "AccountId",
    "registeredAt": "BlockNumber",
    "isChilled": "bool",
    "lastChilled": "Option<BlockNumber>",
    "total": "Balance",
    "lastTotalVoteWeight": "WeightType",
    "lastTotalVoteWeightUpdate": "BlockNumber",
    "isValidating": "bool",
    "selfBonded": "Balance",
    "rewardPotAccount": "AccountId",
    "rewardPotBalance": "Balance"
  },
  "FullPairInfo": {
    "baseCurrency": "AssetId",
    "highestBid": "Price",
    "id": "TradingPairId",
    "latestPrice": "Price",
    "latestPriceUpdatedAt": "BlockNumber",
    "lowestAsk": "Price",
    "maxValidBid": "Price",
    "minValidAsk": "Price",
    "pipDecimals": "u32",
    "quoteCurrency": "AssetId",
    "tickDecimals": "u32",
    "tradable": "bool"
  },
  "Depth": {
    "asks": "Vec<(Price, Balance)>",
    "bids": "Vec<(Price, Balance)>"
  },
  "Page": {
    "pageIndex": "u32",
    "pageSize": "u32",
    "data": "Vec<RpcOrder>"
  },
  "String": "Text",
  "Balance": "u128",
  "MiningPower": "u128",
  "WithdrawalRecordOf": "WithdrawalRecord",
  "WithdrawalRecordForRpc": {
    "assetId": "AssetId",
    "applicant": "AccountId",
    "balance": "Balance",
    "addr": "String",
    "ext": "String",
    "height": "BlockNumber",
    "state": "WithdrawalState"
  }
};
