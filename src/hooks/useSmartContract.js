import { formatEther, parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setLVT,
  setTotalDeposit,
  setYourBorrow,
  setYourColateral,
} from "store/contract.reducer";
import { getContractGateWay } from "utils/contract";
import { ethers } from "ethers";
import { closeLoading, setLoading } from "store/common.reducer";

export function useSmartContact() {
  const { account, library } = useWeb3React();
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
    const gatewayContract = getContractGateWay(library);
    dispatch(setLoading());
    await gatewayContract
      .depositAave(parseUnits(amount, 18))
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
  };
}
