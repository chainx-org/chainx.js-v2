// eslint-disable-next-line header/header
export default {
  xassets: {
    getAssetsByAccount: {
      description: 'get all assets balance for an account',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<AssetId, BTreeMap<AssetType, String>>'
    },
    // eslint-disable-next-line sort-keys
    getAssets: {
      description: 'get all assets balance and infos',
      params: [
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<AssetId, TotalAssetInfoForRpc>'
    }
  },
  xspot: {
    getTradingPairs: {
      description: 'Get the overall info of all trading pairs.',
      params: [
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'Vec<FullPairInfo<RpcPrice, BlockNumber>>'
    },
    // eslint-disable-next-line sort-keys
    getOrdersByAccount: {
      description: 'Get the orders of an account.',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'page_index',
          type: 'u32'
        },
        {
          name: 'page_size',
          type: 'u32'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'Page<Vec<RpcOrder<TradingPairId, AccountId, RpcBalance, RpcPrice, BlockNumber>>>'
    },
    // eslint-disable-next-line sort-keys
    getDepth: {
      description: 'Get the depth of a trading pair.',
      params: [
        {
          name: 'pair_id',
          type: 'TradingPairId'
        },
        {
          name: 'depth_size',
          type: 'u32'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'Option<Depth<RpcPrice, RpcBalance>>'
    }
  },
  // eslint-disable-next-line sort-keys
  xgatewaycommon: {
    boundAddrs: {
      description: 'Get bound addrs for an accountid',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<Chain, Vec<String>>'
    },
    withdrawalLimit: {
      description: 'Some description',
      params: [
        {
          name: 'asset_id',
          type: 'AssetId'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'WithdrawalLimit<RpcBalance>'
    },
    // eslint-disable-next-line sort-keys
    verifyWithdrawal: {
      description: 'Some description',
      params: [
        {
          name: 'asset_id',
          type: 'AssetId'
        },
        {
          name: 'value',
          type: 'u64'
        },
        {
          name: 'addr',
          type: 'String'
        },
        {
          name: 'memo',
          type: 'String'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: '()'
    },
    // eslint-disable-next-line sort-keys
    trusteeMultisigs: {
      description: 'Some description',
      params: [
        {
          name: 'at',
          type: 'Option<BlockHash>)'
        }
      ],
      type: 'BTreeMap<Chain, AccountId>'
    },
    // eslint-disable-next-line sort-keys
    bitcoinTrusteeProperties: {
      description: 'Some description',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BtcTrusteeIntentionProps'
    },
    bitcoinTrusteeSessionInfo: {
      description: 'Some description',
      params: [
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BtcTrusteeSessionInfo<AccountId>'
    },
    // eslint-disable-next-line sort-keys
    bitcoinGenerateTrusteeSessionInfo: {
      description: 'Some description',
      params: [
        {
          name: 'candidates',
          type: 'Vec<AccountId>'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BtcTrusteeSessionInfo<AccountId>'
    }
  },
  xgatewayrecords: {
    withdrawalList: {
      description: 'Some description',
      params: [
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<u32, WithdrawalRecord<AccountId, BlockNumber>>'
    },
    withdrawalListByChain: {
      description: 'Some description',
      params: [
        {
          name: 'chain',
          type: 'Chain'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<u32, WithdrawalRecord<AccountId, BlockNumber>>'
    },
    // eslint-disable-next-line sort-keys
    pendingWithdrawalList: {
      description: 'Some description',
      params: [
        {
          name: 'chain',
          type: 'Chain'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<u32, WithdrawalRecord<AccountId, BlockNumber>>'
    }
  },
  xminingasset: {
    getMiningAssets: {
      description: 'Get overall information about all mining assets.',
      params: [
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'Vec<MiningAssetInfo<AccountId, RpcBalance, BlockNumber>>'
    },
    // eslint-disable-next-line sort-keys
    getDividendByAccount: {
      description: 'Get the asset mining dividends info given the asset miner AccountId.',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<AssetId, RpcBalance>'
    },
    getMinerLedgerByAccount: {
      description: 'Get the mining ledger details given the asset miner AccountId.',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<AssetId, RpcMinerLedger<BlockNumber>>'
    }
  },
  xstaking: {
    getValidatorByAccount: {
      description: 'Some description',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          isOptional: true,
          name: 'at',
          type: 'Hash'
        }
      ],
      type: 'ValidatorInfo<AccountId, RpcBalance, BlockNumber>'
    },
    getValidators: {
      description: 'Some description',
      params: [
        {
          isOptional: true,
          name: 'at',
          type: 'Hash'
        }
      ],
      type: 'Vec<ValidatorInfo<AccountId, RpcBalance, BlockNumber>>'
    },
    // eslint-disable-next-line sort-keys
    getDividendByAccount: {
      description: 'Get the staking dividends info given the staker AccountId.',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<AccountId, RpcBalance>'
    },
    getNominationByAccount: {
      description: 'Get the nomination details given the staker AccountId.',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'BTreeMap<AccountId, RpcNominatorLedger<RpcBalance, BlockNumber>>'
    },
    getNominatorByAccount: {
      description: 'Get individual nominator information given the nominator AccountId.',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'NominatorInfo<BlockNumber>'
    }

  },
  // eslint-disable-next-line sort-keys
  chainx: {
    // eslint-disable-next-line sort-keys
    contractXRC20Call: {
      description: 'xrc20 request',
      params: [
        {
          name: 'ContractXRC20CallRequest',
          type: 'PublicKey'
        },
        {
          name: 'at',
          type: 'Hash',
          // eslint-disable-next-line sort-keys
          isOptional: true
        }
      ],
      type: 'Text'
    }
  }

};
