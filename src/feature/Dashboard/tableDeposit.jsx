import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch } from "react-redux";
import { setModalAction, toggleModalDeposit } from "store/common.reducer";
import { ACTION } from "utils/actionType";
import ETHLogo from "../../asset/eth-logo.png";

export default function TableDeposit({ token, balance, apy, lending }) {
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Your deposit</TableCell>
            <TableCell align="center">Current balance</TableCell>
            <TableCell align="center">APY</TableCell>
            {/* <TableCell align="center">Collateral</TableCell> */}
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <img
                src={ETHLogo}
                height={20}
                width={20}
                style={{ marginRight: "15px" }}
              />
              {token}
            </TableCell>
            <TableCell align="center">
              {" "}
              <Box>
                <Typography fontWeight={"bold"} fontSize={"20px"}>
                  {balance}
                </Typography>
                <Typography fontSize={"13px"}>${balance / 2000}</Typography>
              </Box>
            </TableCell>
            <TableCell align="center">
              {" "}
              <Typography fontWeight={"bold"} fontSize={"20px"}>
                {apy} %
              </Typography>
            </TableCell>
            {/* <TableCell align="center">
              {" "}
              <FormControlLabel
                control={<Switch checked={collecteral} />}
                label={collecteral ? "Yes" : "No"}
                color="success"
              />
            </TableCell> */}
            <TableCell align="right">
              <Box>
                <Button
                  variant="contained"
                  sx={{ background: "#2b2d3c", minWidth: "60px" }}
                  onClick={() => {
                    dispatch(toggleModalDeposit());
                    if (lending === "AAVE") {
                      dispatch(setModalAction(ACTION.DEPOSIT_AAVE));
                    } else {
                      dispatch(setModalAction(ACTION.DEPOSIT_COMPOUND));
                    }
                  }}
                >
                  Deposit
                </Button>
                <Button
                  onClick={() => {
                    dispatch(toggleModalDeposit());
                    if (lending === "AAVE") {
                      dispatch(setModalAction(ACTION.WITHDRAW_AAVE));
                    } else {
                      dispatch(setModalAction(ACTION.WITHDRAW_COMPOUND));
                    }
                  }}
                  sx={{
                    color: "#2b2d3c",
                    // marginLeft: "auto",
                    ":hover": {
                      border: "1px solid #2b2d3c",
                      minWidth: "60px",
                    },
                  }}
                >
                  Withdraw
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
