const { reduceMap } = require('../utils')
const chainlist = require('../providers/chainlist')
const defillama = require('../providers/defillama')
const Coin = require('../db/models/Coin')

class ChainlistSyncer {
  constructor() {
    this.chainIds = {
      1: 'ethereum',
      2: 'expanse',
      8: 'ubiq',
      10: 'optimism',
      11: 'metadium',
      14: 'flare-networks',
      15: { name: 'Diode Prenet', shortName: 'diode' },
      17: { name: 'ThaiChain 2.0 ThaiFi', shortName: 'tfi' },
      19: 'songbird',
      22: 'elastos',
      24: 'kardiachain',
      25: 'crypto-com-chain',
      27: { name: 'ShibaChain', shortName: 'shib' },
      29: { name: 'Genesis L1', shortName: 'L1' },
      30: 'rootstock',
      33: { name: 'GoodData Mainnet', shortName: 'GooD' },
      35: { name: 'TBWG Chain', shortName: 'tbwg' },
      36: 'dxchain',
      37: { name: 'SeedCoin-Network', shortName: 'SEED' },
      38: 'radium',
      40: 'telos',
      44: { name: 'Darwinia Crab Network', shortName: 'crab' },
      46: 'darwinia-network-native-token',
      48: { name: 'Ennothem Mainnet Proterozoic', shortName: 'etmp' },
      50: 'xdc',
      51: { name: 'XDC Apothem Network', shortName: 'txdc' },
      52: 'coinex-token',
      54: { name: 'Openpiece Mainnet', shortName: 'OP' },
      55: 'zyx',
      56: 'binancecoin',
      57: 'syscoin',
      58: 'ong',
      59: 'eos',
      60: 'gochain',
      61: 'ethereum-classic',
      64: { name: 'Ellaism', shortName: 'ellaism' },
      66: 'oec-token',
      68: { name: 'SoterOne Mainnet', shortName: 'SO1' },
      70: 'hoo-token',
      73: 'fncy',
      74: { name: 'IDChain Mainnet', shortName: 'idchain' },
      75: 'decimal',
      76: { name: 'Mix', shortName: 'mix' },
      77: 'poa-network',
      78: { name: 'PrimusChain mainnet', shortName: 'primuschain' },
      79: 'zenith-chain',
      80: { name: 'GeneChain', shortName: 'GeneChain' },
      82: 'meter',
      86: 'gatechain-token',
      87: 'supernova',
      88: 'tomochain',
      90: { name: 'Garizon Stage0', shortName: 'gar-s0' },
      91: { name: 'Garizon Stage1', shortName: 'gar-s1' },
      92: { name: 'Garizon Stage2', shortName: 'gar-s2' },
      93: { name: 'Garizon Stage3', shortName: 'gar-s3' },
      96: { name: 'NEXT Smart Chain', shortName: 'nsc' },
      99: 'poa-network',
      100: 'gnosis',
      101: 'etherinc',
      106: 'velas',
      108: 'thunder-token',
      111: 'etherlite-2',
      113: { name: 'Dehvo', shortName: 'deh' },
      116: { name: 'DeBank Mainnet', shortName: 'debank-mainnet' },
      122: 'fuse-network-token',
      123: { name: 'Fuse Sparknet', shortName: 'spark' },
      124: { name: 'Decentralized Web Mainnet', shortName: 'dwu' },
      126: { name: 'OYchain Mainnet', shortName: 'OYchainMainnet' },
      127: { name: 'Factory 127 Mainnet', shortName: 'feth' },
      128: 'huobi-token',
      137: 'matic-network',
      142: { name: 'DAX CHAIN', shortName: 'dax' },
      144: { name: 'PHI Network v2', shortName: 'PHI' },
      163: 'lightstreams',
      168: 'aioz-network',
      180: 'amepay',
      186: 'seele',
      188: { name: 'BMC Mainnet', shortName: 'BMC' },
      193: 'crypto-emergency',
      199: 'bittorrent',
      200: 'xdaiarb',
      211: 'freight-trust-network',
      217: { name: 'SiriusNet V2', shortName: 'SIN2' },
      218: { name: 'SoterOne Mainnet old', shortName: 'SO1-old' },
      222: 'permission-coin',
      225: { name: 'LACHAIN Mainnet', shortName: 'LA' },
      246: 'energy-web-token',
      248: 'oasys',
      250: 'fantom',
      258: { name: 'Setheum', shortName: 'setm' },
      262: { name: 'SUR Blockchain Network', shortName: 'SUR' },
      269: 'high-performance-blockchain',
      288: 'boba-network',
      300: { name: 'Optimism on Gnosis', shortName: 'ogc' },
      301: { name: 'Bobaopera', shortName: 'Bobaopera' },
      311: 'omax-token',
      314: 'filecoin',
      321: 'kucoin-shares',
      324: 'zksync-2',
      333: { name: 'Web3Q Mainnet', shortName: 'w3q' },
      336: 'shiden',
      361: 'theta-token',
      369: { name: 'PulseChain Mainnet', shortName: 'pls' },
      385: { name: 'Lisinski', shortName: 'lisinski' },
      416: 'sx',
      427: { name: 'Zeeth Chain', shortName: 'zeeth' },
      499: { name: 'Rupaya', shortName: 'rupx' },
      500: { name: 'Camino C-Chain', shortName: 'Camino' },
      512: 'acute-angle-cloud',
      516: { name: 'Gear Zero Network Mainnet', shortName: 'gz-mainnet' },
      520: { name: 'XT Smart Chain Mainnet', shortName: 'xt' },
      529: { name: 'Firechain Mainnet', shortName: 'fire' },
      530: { name: 'F(x)Core Mainnet Network', shortName: 'FxCore' },
      534: 'candle',
      555: { name: 'Vela1 Chain Mainnet', shortName: 'CLASS' },
      558: { name: 'Tao Network', shortName: 'tao' },
      592: 'astar',
      686: 'karura',
      707: { name: 'BlockChain Station Mainnet', shortName: 'bcs' },
      721: { name: 'Lycan Chain', shortName: 'LYC' },
      766: { name: 'QL1', shortName: 'qom' },
      777: { name: 'cheapETH', shortName: 'cth' },
      787: 'acala',
      800: { name: 'Lucid Blockchain', shortName: 'LUCID' },
      803: { name: 'Haic', shortName: 'haic' },
      813: 'qitmeer-network',
      820: 'callisto',
      841: 'taraxa',
      877: 'dexit-finance',
      880: { name: 'Ambros Chain Mainnet', shortName: 'ambros' },
      888: 'wanchain',
      909: { name: 'Portal Fantasy Chain', shortName: 'PF' },
      970: { name: 'Oort Mainnet', shortName: 'ccn' },
      971: { name: 'Oort Huygens', shortName: 'Huygens' },
      972: { name: 'Oort Ascraeus', shortName: 'Ascraeus' },
      977: { name: 'Nepal Blockchain Network', shortName: 'yeti' },
      980: { name: 'TOP Mainnet EVM', shortName: 'top_evm' },
      985: { name: 'Memo Smart Chain Mainnet', shortName: 'memochain' },
      989: { name: 'TOP Mainnet', shortName: 'top' },
      998: { name: 'Lucky Network', shortName: 'ln' },
      1000: 'gton-capital',
      1008: { name: 'Eurus Mainnet', shortName: 'eun' },
      1010: 'evrice',
      1012: 'newton-project',
      1022: 'sakura',
      1024: 'clover-finance',
      1030: 'conflux-token',
      1039: { name: 'Bronos Mainnet', shortName: 'bronos-mainnet' },
      1088: 'metis-token',
      1099: { name: 'MOAC mainnet', shortName: 'moac' },
      1111: { name: 'WEMIX3.0 Mainnet', shortName: 'wemix' },
      1130: 'defichain',
      1139: 'math',
      1197: { name: 'Iora Chain', shortName: 'iora' },
      1202: { name: 'World Trade Technical Chain Mainnet', shortName: 'wtt' },
      1213: { name: 'Popcateum Mainnet', shortName: 'popcat' },
      1214: { name: 'EnterChain Mainnet', shortName: 'enter' },
      1229: 'exzo',
      1231: 'ultron',
      1234: { name: 'Step Network', shortName: 'step' },
      1246: { name: 'OM Platform Mainnet', shortName: 'om' },
      1280: 'halo-network',
      1284: 'moonbeam',
      1285: 'moonriver',
      1287: { name: 'Moonbase Alpha', shortName: 'mbase' },
      1288: 'moonrock-v2',
      1294: { name: 'Bobabeam', shortName: 'Bobabeam' },
      1311: { name: 'Dos Fuji Subnet', shortName: 'DOS' },
      1314: { name: 'Alyx Mainnet', shortName: 'alyx' },
      1319: { name: 'Aitd Mainnet', shortName: 'aitd' },
      1353: { name: 'CIC Chain Mainnet', shortName: 'CIC' },
      1455: 'crypto-tex',
      1506: { name: 'Sherpax Mainnet', shortName: 'Sherpax' },
      1515: { name: 'Beagle Messaging Chain', shortName: 'beagle' },
      1618: 'catecoin',
      1620: 'atheios',
      1657: 'bata',
      1688: { name: 'LUDAN Mainnet', shortName: 'LUDAN' },
      1701: { name: 'Anytype EVM Chain', shortName: 'AnytypeChain' },
      1707: { name: 'TBSI Mainnet', shortName: 'TBSI' },
      1818: 'cube-network',
      1856: 'teslafunds',
      1881: 'gitshock-finance',
      1898: { name: 'BON Network', shortName: 'boya' },
      1951: { name: 'D-Chain Mainnet', shortName: 'dchain-mainnet' },
      1975: { name: 'ONUS Chain Mainnet', shortName: 'onus-mainnet' },
      1987: 'ethergem',
      1994: 'ekta-2',
      2000: 'dogechain',
      2001: { name: 'Milkomeda C1 Mainnet', shortName: 'milkAda' },
      2002: { name: 'Milkomeda A1 Mainnet', shortName: 'milkALGO' },
      2009: { name: 'CloudWalk Mainnet', shortName: 'cloudwalk_mainnet' },
      2016: { name: 'MainnetZ Mainnet', shortName: 'NetZm' },
      2020: { name: 'PublicMint Mainnet', shortName: 'pmint' },
      2021: 'edgeware',
      2025: 'rangers-protocol-gas',
      2043: { name: 'OriginTrail Parachain', shortName: 'otp' },
      2077: { name: 'Quokkacoin Mainnet', shortName: 'QKA' },
      2100: { name: 'Ecoball Mainnet', shortName: 'eco' },
      2109: { name: 'Exosama Network', shortName: 'exn' },
      2151: 'bosagora',
      2152: 'findora',
      2154: { name: 'Findora Forge', shortName: 'findora-forge' },
      2203: { name: 'Bitcoin EVM', shortName: 'eBTC' },
      2213: 'evanesco-network',
      2222: 'kava',
      2223: { name: 'VChain Mainnet', shortName: 'VChain' },
      2300: { name: 'BOMB Chain', shortName: 'bomb' },
      2330: { name: 'Altcoinchain', shortName: 'alt' },
      2559: { name: 'Kortho Mainnet', shortName: 'ktoc' },
      2569: 'techpay',
      2606: { name: 'PoCRNet', shortName: 'pocrnet' },
      2611: 'redlight-chain',
      2612: { name: 'EZChain C-Chain Mainnet', shortName: 'EZChain' },
      2999: { name: 'BitYuan Mainnet', shortName: 'bty' },
      3000: { name: 'CENNZnet Rata', shortName: 'cennz-r' },
      3001: 'centrality',
      3031: 'orlando-chain',
      3334: { name: 'Web3Q Galileo', shortName: 'w3q-g' },
      3400: 'paribu-net',
      3501: 'jfin-coin',
      3601: 'pando-token',
      3666: { name: 'Metacodechain', shortName: 'metacode' },
      3690: { name: 'Bittex Mainnet', shortName: 'btx' },
      3737: { name: 'Crossbell', shortName: 'csb' },
      3912: 'drac-network',
      3966: { name: 'DYNO Mainnet', shortName: 'dyno' },
      3999: 'yuan-chain-coin',
      4181: { name: 'PHI Network V1', shortName: 'PHIv1' },
      4444: 'htmlcoin',
      4689: 'iotex',
      4919: { name: 'Venidium Mainnet', shortName: 'xvm' },
      5000: { name: 'Mantle', shortName: 'mantle' },
      5177: 'tlchain',
      5197: 'era-swap-token',
      5234: { name: 'Humanode Mainnet', shortName: 'hmnd' },
      5290: { name: 'Firechain Mainnet Old', shortName: '_old_fire' },
      5315: { name: 'Uzmi Network Mainnet', shortName: 'UZMI' },
      5551: 'nahmii',
      5555: { name: 'Chain Verse Mainnet', shortName: 'cverse' },
      5869: { name: 'Wegochain Rubidium Mainnet', shortName: 'rbd' },
      6066: { name: 'Tres Mainnet', shortName: 'TRESMAIN' },
      6626: 'pixie',
      6789: { name: 'Gold Smart Chain Mainnet', shortName: 'STANDm' },
      6969: 'tombchain',
      6999: { name: 'PolySmartChain', shortName: 'psc' },
      7000: { name: 'ZetaChain Mainnet', shortName: 'zetachain-mainnet' },
      7027: { name: 'Ella the heart', shortName: 'ELLA' },
      7070: { name: 'Planq Mainnet', shortName: 'planq' },
      7341: 'shyft-network-2',
      7700: 'canto',
      8000: { name: 'Teleport', shortName: 'teleport' },
      8080: 'shardeum',
      8081: 'shardeum',
      8098: { name: 'StreamuX Blockchain', shortName: 'StreamuX' },
      8217: 'klay-token',
      8654: { name: 'Toki Network', shortName: 'toki' },
      8723: { name: 'TOOL Global Mainnet', shortName: 'olo' },
      8738: { name: 'Alph Network', shortName: 'alph' },
      8880: { name: 'Unique', shortName: 'unq' },
      8881: 'quartz',
      8883: { name: 'Sapphire by Unique', shortName: 'sph' },
      8888: { name: 'XANAChain', shortName: 'XANAChain' },
      8889: { name: 'Vyvo Smart Chain', shortName: 'vsc' },
      8898: 'mammoth-mmt',
      8899: { name: 'JIBCHAIN L1', shortName: 'jbc' },
      8989: 'giant-mammoth',
      8995: { name: 'bloxberg', shortName: 'berg' },
      9001: 'evmos',
      9012: 'berylbit',
      9100: { name: 'Genesis Coin', shortName: 'GENEC' },
      9700: { name: 'Oort MainnetDev', shortName: 'MainnetDev' },
      10000: { name: 'Smart Bitcoin Cash', shortName: 'smartbch' },
      10024: { name: 'Gon Chain', shortName: 'gon' },
      10086: { name: 'SJATSH', shortName: 'SJ' },
      10101: { name: 'Blockchain Genesis Mainnet', shortName: 'GEN' },
      10248: '0xtrade',
      10507: { name: 'Numbers Mainnet', shortName: 'Jade' },
      10823: 'cryptocoinpay',
      10946: 'quadrans',
      11110: { name: 'Astra', shortName: 'astra' },
      11111: { name: 'WAGMI', shortName: 'WAGMI' },
      11235: { name: 'Haqq Network', shortName: 'ISLM' },
      11888: 'santiment-network-token',
      12052: { name: 'Singularity ZERO Mainnet', shortName: 'ZERO' },
      13000: { name: 'SPS', shortName: 'SPS' },
      13308: 'credit',
      13381: 'phoenix',
      13812: { name: 'Susono', shortName: 'sus' },
      16000: { name: 'MetaDot Mainnet', shortName: 'mtt' },
      18159: 'proof-of-memes-pomchain',
      19845: { name: 'BTCIX Network', shortName: 'btcix' },
      20736: { name: 'P12 Chain', shortName: 'p12' },
      21337: 'centrality',
      21816: 'omchain',
      22023: { name: 'Taycan', shortName: 'SFL' },
      22776: { name: 'MAP Mainnet', shortName: 'map' },
      23294: { name: 'Oasis Sapphire', shortName: 'sapphire' },
      24484: 'webchain',
      24734: { name: 'MintMe.com Coin', shortName: 'mintme' },
      25888: { name: 'Hammer Chain Mainnet', shortName: 'GOLDT' },
      26600: 'hertz-network',
      26863: { name: 'OasisChain Mainnet', shortName: 'OAC' },
      31102: { name: 'Ethersocial Network', shortName: 'esn' },
      31223: { name: 'CloudTx Mainnet', shortName: 'CLDTX' },
      32520: 'bitrise-token',
      32659: 'fsn',
      33333: { name: 'Aves Mainnet', shortName: 'avs' },
      35011: { name: 'J2O Taro', shortName: 'j2o' },
      35441: { name: 'Q Mainnet', shortName: 'q' },
      39797: 'energi',
      39815: 'oho-blockchain',
      41500: { name: 'Opulent-X BETA', shortName: 'ox-beta' },
      42069: { name: 'pegglecoin', shortName: 'PC' },
      42161: 'arbitrum',
      42170: 'arb-nova',
      42220: 'celo',
      42262: 'oasis-network',
      43110: { name: 'Athereum', shortName: 'avaeth' },
      43114: 'avalanche-2',
      43288: { name: 'Boba Avax', shortName: 'bobaavax' },
      45000: 'autobahn-network',
      47805: 'rei-network',
      51712: { name: 'Sardis Mainnet', shortName: 'SRDXm' },
      53935: { name: 'DFK Chain', shortName: 'DFK' },
      55555: 'reichain',
      56288: { name: 'Boba BNB Mainnet', shortName: 'BobaBnb' },
      61803: { name: 'Etica Mainnet', shortName: 'Etica' },
      61916: 'doken',
      62621: 'multivac',
      63000: 'ecredits',
      67390: { name: 'SiriusNet', shortName: 'mcl' },
      70000: { name: 'Thinkium Mainnet Chain 0', shortName: 'TKM0' },
      70001: { name: 'Thinkium Mainnet Chain 1', shortName: 'TKM1' },
      70002: { name: 'Thinkium Mainnet Chain 2', shortName: 'TKM2' },
      70103: { name: 'Thinkium Mainnet Chain 103', shortName: 'TKM103' },
      71402: 'godwoken',
      73927: { name: 'Mixin Virtual Machine', shortName: 'mvm' },
      75000: { name: 'ResinCoin Mainnet', shortName: 'resin' },
      77612: { name: 'Vention Smart Chain Mainnet', shortName: 'vscm' },
      88888: 'ivar-coin',
      97288: { name: 'Boba BNB Mainnet Old', shortName: 'BobaBnbOld' },
      99999: { name: 'UB Smart Chain', shortName: 'usc' },
      100000: 'quark-chain',
      100001: { name: 'QuarkChain Mainnet Shard 0', shortName: 'qkc-s0' },
      100002: { name: 'QuarkChain Mainnet Shard 1', shortName: 'qkc-s1' },
      100003: { name: 'QuarkChain Mainnet Shard 2', shortName: 'qkc-s2' },
      100004: { name: 'QuarkChain Mainnet Shard 3', shortName: 'qkc-s3' },
      100005: { name: 'QuarkChain Mainnet Shard 4', shortName: 'qkc-s4' },
      100006: { name: 'QuarkChain Mainnet Shard 5', shortName: 'qkc-s5' },
      100007: { name: 'QuarkChain Mainnet Shard 6', shortName: 'qkc-s6' },
      100008: { name: 'QuarkChain Mainnet Shard 7', shortName: 'qkc-s7' },
      103090: { name: 'Crystaleum', shortName: 'CRFI' },
      108801: { name: 'BROChain Mainnet', shortName: 'bro' },
      131419: { name: 'ETND Chain Mainnets', shortName: 'ETND' },
      200625: 'akroma',
      201018: { name: 'Alaya Mainnet', shortName: 'alaya' },
      201804: { name: 'Mythical Chain', shortName: 'myth' },
      210425: 'platon-network',
      220315: { name: 'Mas Mainnet', shortName: 'mas' },
      246529: { name: 'ARTIS sigma1', shortName: 'ats' },
      256256: 'caduceus',
      281121: { name: 'Social Smart Chain Mainnet', shortName: 'SoChain' },
      333999: 'polis',
      381931: 'metal-blockchain',
      381932: { name: 'Metal Tahoe C-Chain', shortName: 'Tahoe' },
      420420: 'kekchain',
      432204: 'dexalot',
      474142: { name: 'OpenChain Mainnet', shortName: 'oc' },
      513100: { name: 'ethereum Fair', shortName: 'etf' },
      534352: { name: 'Scroll', shortName: 'scr' },
      641230: { name: 'Bear Network Chain Mainnet', shortName: 'BRNKC' },
      800001: { name: 'OctaSpace', shortName: 'octa' },
      846000: { name: '4GoodNetwork', shortName: 'bloqs4good' },
      888888: 'vision',
      900000: { name: 'Posichain Mainnet Shard 0', shortName: 'psc-s0' },
      955305: { name: 'Eluvio Content Fabric', shortName: 'elv' },
      1313114: { name: 'Etho Protocol', shortName: 'etho' },
      1313500: { name: 'Xerom', shortName: 'xero' },
      1337802: { name: 'Kiln', shortName: 'kiln' },
      2099156: 'pchain',
      5555555: { name: 'Imversed Mainnet', shortName: 'imversed' },
      7355310: { name: 'OpenVessel', shortName: 'vsl' },
      7762959: { name: 'Musicoin', shortName: 'music' },
      8007736: { name: 'Plian Mainnet Subchain 1', shortName: 'plian-mainnet-l2' },
      10101010: { name: 'Soverun Mainnet', shortName: 'SVRNm' },
      13371337: { name: 'PepChain Churchill', shortName: 'tpep' },
      14288640: 'anduschain',
      18289463: { name: 'IOLite', shortName: 'ilt' },
      20180430: 'smartmesh',
      20181205: { name: 'quarkblockchain', shortName: 'qki' },
      22052002: 'excelon',
      27082022: { name: 'Excoincial Chain Mainnet', shortName: 'exl' },
      28945486: 'auxilium',
      35855456: 'joys',
      61717561: 'aquachain',
      192837465: 'gather',
      245022934: { name: 'Neon EVM MainNet', shortName: 'neonevm-mainnet' },
      311752642: 'one-ledger',
      503129905: { name: 'Nebula Staging', shortName: 'nebula-staging' },
      1122334455: { name: 'IPOS Network', shortName: 'ipos' },
      1313161554: 'aurora-near',
      1313161556: { name: 'Aurora Betanet', shortName: 'aurora-betanet' },
      1482601649: { name: 'Nebula Mainnet', shortName: 'nebula-mainnet' },
      1564830818: { name: 'Calypso NFT Hub (SKALE)', shortName: 'calypso-mainnet' },
      1666600000: 'harmony',
      1666600001: { name: 'Harmony Mainnet Shard 1', shortName: 'hmy-s1' },
      1666600002: { name: 'Harmony Mainnet Shard 2', shortName: 'hmy-s2' },
      1666600003: { name: 'Harmony Mainnet Shard 3', shortName: 'hmy-s3' },
      2021121117: { name: 'DataHopper', shortName: 'hop' },
      2046399126: { name: 'Europa SKALE Chain', shortName: 'europa' },
      3125659152: { name: 'Pirl', shortName: 'pirl' },
      11297108109: 'palm',
      197710212030: { name: 'Ntity Mainnet', shortName: 'ntt' },
      383414847825: { name: 'Zeniq', shortName: 'zeniq' },
      666301171999: { name: 'PDC Mainnet', shortName: 'ipdc' },
      6022140761023: { name: 'Molereum Network', shortName: 'mole' }
    }
  }

  async sync() {
    const llamaIds = reduceMap(await defillama.getChains(), 'chainId', 'gecko_id')

    const data = await chainlist.getChains()
    const chains = data.map(item => {
      return {
        ...item,
        isTestnet: this.isTestnet(item.name) || this.isTestnet(item.title) || this.isTestnet(item.network)
      }
    }).filter(i => !i.isTestnet)

    const map = {}
    for (let i = 0; i < chains.length; i += 1) {
      const chain = chains[i];
      const coins = await Coin.query(`
        select c.uid, p.chain_uid
         from coins c, platforms p where c.id = p.coin_id
          and (p.type = 'native' or p.type = c.uid)
          and c.code = lower('${chain.shortName}')
      `)

      let uid
      if (llamaIds[chain.chainId]) {
        uid = llamaIds[chain.chainId]
      } else if (coins[0]) {
        uid = coins[0].chain_uid
      } else {
        uid = { name: chain.name, shortName: chain.shortName }
      }

      map[chain.chainId] = uid
    }

    console.log(map)
  }

  isTestnet(string) {
    if (!string) return false
    const item = string.toLowerCase()
    return item.includes('test') || item.includes('devnet')
  }
}

module.exports = ChainlistSyncer
