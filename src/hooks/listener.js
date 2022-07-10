import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "utils/connect";
import { useDispatch } from "react-redux";
import { connect, disconnect } from "store/common.reducer";

export function useEagerConnect() {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(false);
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate, deactivate } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
        dispatch(connect());
      };

      const handleDisconnect = () => {
        console.log("Handing 'disconnect event");
        deactivate();
        // localStorage.setItem("connected", false);
        dispatch(disconnect());
      };

      const handleChainChanged = (chainId) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
        dispatch(connect());
      };
      const handleAccountsChanged = (accounts) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
          dispatch(connect());
        } else {
          deactivate();
          // localStorage.setItem("connected", false);
          dispatch(disconnect());
        }
      };
      const handleNetworkChanged = (networkId) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
        dispatch(connect());
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("disconnect", handleDisconnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("disconnect", handleDisconnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate, deactivate]);
}
