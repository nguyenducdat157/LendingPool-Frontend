import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import Dashboard from "feature/Dashboard";
import Aave from "feature/Dashboard/aave";
import Compound from "feature/Dashboard/compound";
import Header from "feature/Header";
import { Loading } from "feature/Loading";
import ModalDeposit from "feature/PopupAction/ModalDeposit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setModalAction, toggleModalDeposit } from "store/common.reducer";
import "./App.css";

function getLibrary(provider, connector) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library; // this will vary according to whether you use e.g. ethers or web3.js
}

function App() {
  const { openModalDeposit } = useSelector((s) => s.common);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!openModalDeposit) {
      dispatch(setModalAction(""));
    }
  }, [openModalDeposit]);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <ConnectWallet /> */}

      <ModalDeposit
        onToggle={() => {
          dispatch(toggleModalDeposit());
        }}
        show={openModalDeposit}
      />

      {/* <ModalConnect /> */}

      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/aave" element={<Aave />} />
          <Route path="/compound" element={<Compound />} />
        </Routes>
      </BrowserRouter>
      <Loading />
      {/* <Aave /> */}
      {/* <Home /> */}
    </Web3ReactProvider>
  );
}

export default App;
