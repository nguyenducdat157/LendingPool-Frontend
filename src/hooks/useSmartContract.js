import { Web3Provider } from "@ethersproject/providers";
import { formatEther, formatUnits, parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { useAsync } from "react-use";
import { closeLoading, setLoading } from "store/common.reducer";
import {
  setLVT,
  setTotalDeposit,
  setYourBorrow,
  setYourColateral,
} from "store/contract.reducer";
import {
  getContractCDai,
  getContractCEth,
  getContractGateWay,
} from "utils/contract";

export function useSmartContact() {
  const { account, library } = useWeb3React();

  // const [supplyApyCompound, setSupplyApyCompound] = useState(0);
  // const [borrowApyCompound, setBorrowApyCompound] = useState(0);
  const { loading } = useSelector((s) => s.common);
  const dispatch = useDispatch();
  const getInfo = async () => {
    if (!account || !library) return;
    const aave = getContractGateWay(library);
    const _totalDeposit = await aave.totalDeposit();
    const _yourBorrow = await aave.getBorrowed();
    const _yourCollateral = await aave.getCollateral();
    const _lvt = await aave.maxLTV();
    console.log(formatEther(_lvt));
    dispatch(setTotalDeposit(formatEther(_totalDeposit)));
    dispatch(setYourBorrow(formatEther(_yourBorrow)));
    dispatch(setYourColateral(formatEther(_yourCollateral)));
    dispatch(setLVT((_lvt / 5) * 100));
  };

  const depositAave = async (amount) => {
    // setHarvesting(true);
    const overrides = {
      value: ethers.utils.parseEther(amount, "ether"), //sending one ether
    };
    const gatewayContract = getContractGateWay(library);
    dispatch(setLoading());
    await gatewayContract
      .depositAave(overrides)
      .then(async (res) => {
        await res.wait();
        console.log("Deposit aave success!");
        dispatch(closeLoading());
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(closeLoading());
      });
  };

  const depositCompound = async (amount) => {
    // setHarvesting(true);
    const overrides = {
      value: ethers.utils.parseEther(amount, "ether"), //sending one ether
    };
    const gatewayContract = getContractGateWay(library);
    dispatch(setLoading());
    await gatewayContract
      .depositCompound(overrides)
      .then(async (res) => {
        await res.wait();
        console.log("Deposit compound success!");
        dispatch(closeLoading());
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(closeLoading());
      });
  };

  const withdrawAave = async (amount) => {
    // setHarvesting(true);
    const gatewayContract = getContractGateWay(library);
    dispatch(setLoading());
    await gatewayContract
      .withdrawAave(parseUnits(amount, 18))
      .then(async (res) => {
        await res.wait();
        console.log("Withdraw aave success!");
        dispatch(closeLoading());
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(closeLoading());
      });
  };

  const withdrawCompound = async (amount) => {
    // setHarvesting(true);
    const gatewayContract = getContractGateWay(library);
    dispatch(setLoading());
    await gatewayContract
      .withdrawCompound(parseUnits(amount, 18), false)
      .then(async (res) => {
        await res.wait();
        console.log("Withdraw Compound success!");
        dispatch(closeLoading());
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(closeLoading());
      });
  };

  const borrowAave = async (amount) => {
    // setHarvesting(true);
    const gatewayContract = getContractGateWay(library);
    dispatch(setLoading());
    await gatewayContract
      .borrowAave(parseUnits(amount, 18))
      .then(async (res) => {
        await res.wait();
        console.log("Borrow Aave success!");
        dispatch(closeLoading());
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(closeLoading());
      });
  };

  const borrowCompound = async (amount) => {
    // setHarvesting(true);
    const gatewayContract = getContractGateWay(library);
    dispatch(setLoading());
    await gatewayContract
      .borrowCompound(parseUnits(amount, 18))
      .then(async (res) => {
        await res.wait();
        console.log("Borrow Compound success!");
        dispatch(closeLoading());
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(closeLoading());
      });
  };

  const repayAave = async (amount) => {
    // setHarvesting(true);
    const gatewayContract = getContractGateWay(library);
    dispatch(setLoading());
    await gatewayContract
      .repayAave(parseUnits(amount, 18))
      .then(async (res) => {
        await res.wait();
        console.log("Repay Aave success!");
        dispatch(closeLoading());
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(closeLoading());
      });
  };

  const repayCompound = async (amount) => {
    // setHarvesting(true);
    const gatewayContract = getContractGateWay(library);
    dispatch(setLoading());
    await gatewayContract
      .repayCompound(parseUnits(amount, 18))
      .then(async (res) => {
        await res.wait();
        console.log("Repay Compound success!");
        dispatch(closeLoading());
      })
      .catch((err) => {
        console.log("error", err);
        dispatch(closeLoading());
      });
  };

  const { value: apyCompound = {} } = useAsync(async () => {
    if (library) {
      const CEthContract = getContractCEth(library);
      const CDaiContract = getContractCDai(library);
      const ethMantissa = 1e18;
      const blocksPerDay = 6570; // 13.15 seconds per block
      const daysPerYear = 365;

      const supplyRatePerBlock = await CEthContract.supplyRatePerBlock();
      const borrowRatePerBlock = await CDaiContract.borrowRatePerBlock();
      const supplyApy =
        (Math.pow(
          (supplyRatePerBlock / ethMantissa) * blocksPerDay + 1,
          daysPerYear
        ) -
          1) *
        100;
      const borrowApy =
        (Math.pow(
          (borrowRatePerBlock / ethMantissa) * blocksPerDay + 1,
          daysPerYear
        ) -
          1) *
        100;

      // setSupplyApyCompound(supplyApy);
      // setBorrowApyCompound(borrowApy);
      return { supplyApy, borrowApy };
    }
  }, [library]);

  const { value: supplyBalanceCompound = 0 } = useAsync(async () => {
    const CEthContract = getContractCEth(library);
    const supplyBalance = formatUnits(
      await CEthContract.callStatic.balanceOfUnderlying(account)
    );
    return supplyBalance;
  }, [library, loading]);

  const { value: borrowBalanceCompound = 0 } = useAsync(async () => {
    const CDaiContract = getContractCDai(library);
    const borrowBalance = formatUnits(
      await CDaiContract.callStatic.borrowBalanceCurrent(account)
    );
    return borrowBalance;
  }, [library, loading]);

  const { value: supplyCEthWallet = 0 } = useAsync(async () => {
    let ethBalance = formatUnits(await library.getBalance(account));
    return ethBalance;
  }, [library, loading]);

  // const depositAave = (amount) => {};

  // useEffect(() => {
  //   getInfo();
  // }, []);

  return {
    depositAave,
    depositCompound,
    withdrawAave,
    withdrawCompound,
    borrowAave,
    borrowCompound,
    repayAave,
    repayCompound,
    // supplyApyCompound,
    // borrowApyCompound,
    apyCompound,
    supplyBalanceCompound,
    borrowBalanceCompound,
    supplyCEthWallet,
  };
}
