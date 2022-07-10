/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { connect } from "store/common.reducer";
import { injected, walletConnect } from "../../utils/connect";

export default function ConnectWallet() {
  const web3React = useWeb3React();
  const { activate } = web3React;
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const toggle = (connector) => {
    connector && !connector?.target && activate(connector);
    setModal(!modal);
    // localStorage.setItem("connected", true);
    dispatch(connect());
  };

  return (
    <>
      <Button
        // color="primary"
        // size="sm"
        onClick={toggle}
        style={{
          color: "#000",
          width: "200px",
          background: "transparent",
          margin: "auto",
          marginTop: "112px",
          border: "3px solid #000",
        }}
      >
        Connect wallet
      </Button>

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Connect with ...</ModalHeader>
        <ModalBody>
          <Row className="justify-content-center g-4">
            <Col>
              <Button
                block
                color="warning"
                onClick={() => {
                  toggle(injected);
                }}
              >
                MetaMask
              </Button>
              <Button
                block
                color="primary"
                onClick={() => {
                  toggle(walletConnect);
                }}
              >
                WalletConnect
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}
