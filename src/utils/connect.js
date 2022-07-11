import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// Connect wallet
export const injected = new InjectedConnector({ supportedChainIds: [4, 42] });
export const walletConnect = new WalletConnectConnector({
  rpc: {
    4: "https://rinkeby.infura.io/v3/edc067050c394f3e889be5490129706b",
  },
  qrcode: true,
});

// Address
export const SC_WETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
export const SC_MasterChef = "0x9da687e88b0A807e57f1913bCD31D56c49C872c2";
export const SC_DD2 = "0xb1745657CB84c370DD0Db200a626d06b28cc5872";
export const SC_MULTICALL = "0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821";
export const SC_GATEWAY = "0xdad9B0CcF077611cB050f2f747915146239eBb0C";
export const SC_CETH = "0x41B5844f4680a8C38fBb695b7F9CFd1F64474a72";
export const SC_CDAI = "0xf0d0eb522cfa50b716b3b1604c4f0fa6f04376ad";

// Chain
export const CHAIN_LIST = {
  1: "Ethereum",
  2: "Morden (disused), Expanse mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Goerli",
};

// Subgraph
export const REACT_APP_GRAPHQL_URI =
  "https://api.thegraph.com/subgraphs/name/sotatek-datnguyen8/subgraph";
