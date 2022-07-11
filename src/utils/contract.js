import { Contract } from "@ethersproject/contracts";
import ABI_DD2 from "../ABI/DD2.json";
import ABI_MasterChef from "../ABI/MasterChef.json";
import ABI_WETH from "../ABI/WETH.json";
import ABI_MULTICALL from "../ABI/Multicall.json";
import ABI_GATEWAY from "../ABI/AaveGateway.json";
import ABI_CETH from "../ABI/CDai.json";
import ABI_CDAI from "../ABI/CEth.json";
import {
  SC_GATEWAY,
  SC_DD2,
  SC_MasterChef,
  SC_MULTICALL,
  SC_WETH,
  SC_CDAI,
  SC_CETH,
} from "./connect";

export const getContractWETH = (library) => {
  return new Contract(SC_WETH, ABI_WETH, library.getSigner());
};

export const getContractMasterChef = (library) => {
  return new Contract(SC_MasterChef, ABI_MasterChef, library.getSigner());
};

export const getContractDD2 = (library) => {
  return new Contract(SC_DD2, ABI_DD2, library.getSigner());
};

export const getContractMulticall = (library) => {
  return new Contract(SC_MULTICALL, ABI_MULTICALL, library.getSigner());
};

export const getContractGateWay = (library) => {
  return new Contract(SC_GATEWAY, ABI_GATEWAY, library.getSigner());
};

export const getContractCEth = (library) => {
  return new Contract(SC_CETH, ABI_CETH, library.getSigner());
};

export const getContractCDai = (library) => {
  return new Contract(SC_CDAI, ABI_CDAI, library.getSigner());
};

export const ROUTES = {
  dashboard: "/",
  markets: "/markets",
  staking: "/staking",
  governance: "/governance",
};
