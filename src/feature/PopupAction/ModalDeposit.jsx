import { useWeb3React } from "@web3-react/core";
import { useSmartContact } from "hooks/useSmartContract";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { ACTION } from "utils/actionType";
import { formatAmount } from "utils/format";

export default function ModalDeposit({ show, onToggle }) {
  const { account } = useWeb3React();
  const { modalAction } = useSelector((s) => s.common);
  const {
    depositAave,
    depositCompound,
    withdrawAave,
    withdrawCompound,
    borrowAave,
    borrowCompound,
    repayAave,
    repayCompound,
  } = useSmartContact();

  function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  const typeAction = capitalize(modalAction.split("_")[0]);
  const typeLending = modalAction.split("_")[1];
  const closeBtn = (
    <button className="close" onClick={onToggle}>
      &times;
    </button>
  );
  const [value, setValue] = useState("");
  const onClickMax = (e) => {
    setValue(1000);
  };

  const onSubmit = async (value) => {
    if (modalAction === ACTION.DEPOSIT_AAVE) {
      await depositAave(value);
    } else if (modalAction === ACTION.DEPOSIT_COMPOUND) {
      await depositCompound(value);
    } else if (modalAction === ACTION.WITHDRAW_AAVE) {
      await withdrawAave(value);
    } else if (modalAction === ACTION.WITHDRAW_COMPOUND) {
      await withdrawCompound(value);
    } else if (modalAction === ACTION.BORROW_AAVE) {
      await borrowAave(value);
    } else if (modalAction === ACTION.BORROW_COMPOUND) {
      await borrowCompound(value);
    } else if (modalAction === ACTION.REPAY_AAVE) {
      await repayAave(value);
    } else if (modalAction === ACTION.REPAY_COMPOUND) {
      await repayCompound(value);
    }
  };

  useEffect(() => {
    // Reset value when close popup
    setValue("");
  }, [show]);

  return (
    <Modal isOpen={show} toggle={onToggle} centered>
      <ModalHeader toggle={onToggle} close={closeBtn}>
        {typeAction}
      </ModalHeader>
      <ModalBody>
        <Row className="justify-content-center">
          <Col>
            <InputGroup>
              <Input
                type="number"
                max={1000}
                placeholder="Input balance"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <InputGroupAddon addonType="append">
                <Button onClick={onClickMax}>Max</Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            You balance: <b>{formatAmount.format(1000)}</b> MATIC
          </Col>
        </Row> */}
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={value.length === 0}
          color="primary"
          onClick={() => {
            onSubmit(value);
          }}
        >
          {typeAction}
        </Button>{" "}
        <Button color="secondary" onClick={onToggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
