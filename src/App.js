import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import Dashboard from "feature/Dashboard";
import Header from "feature/Header";

import ModalDeposit from "feature/PopupAction/ModalDeposit";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalDeposit } from "store/common.reducer";
import "./App.css";
import Home from "./feature/Home";

function getLibrary(provider, connector) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library; // this will vary according to whether you use e.g. ethers or web3.js
}

function App() {
  const { openModalDeposit } = useSelector((s) => s.common);
  const dispatch = useDispatch();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <ConnectWallet /> */}

      <ModalDeposit
        onToggle={() => {
          dispatch(toggleModalDeposit());
        }}
        show={openModalDeposit}
      />

      <Header />
      <Dashboard />
      {/* <Home /> */}
    </Web3ReactProvider>
  );
}

export default App;
