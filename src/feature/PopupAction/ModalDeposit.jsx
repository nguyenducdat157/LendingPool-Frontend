import React, { useEffect, useState } from "react";
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
import { formatAmount } from "utils/format";

export default function ModalDeposit({ show, onToggle }) {
  const closeBtn = (
    <button className="close" onClick={onToggle}>
      &times;
    </button>
  );
  const [value, setValue] = useState("");
  const onClickMax = (e) => {
    setValue(1000);
  };

  const onSubmit = (value) => {
    console.log(value);
  };

  useEffect(() => {
    // Reset value when close popup
    setValue("");
  }, [show]);

  return (
    <Modal isOpen={show} toggle={onToggle} centered>
      <ModalHeader toggle={onToggle} close={closeBtn}>
        Deposit
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
        <Row>
          <Col>
            You balance: <b>{formatAmount.format(1000)}</b> MATIC
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={value.length === 0}
          color="primary"
          onClick={() => {
            onSubmit(value);
          }}
        >
          Deposit
        </Button>{" "}
        <Button color="secondary" onClick={onToggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
