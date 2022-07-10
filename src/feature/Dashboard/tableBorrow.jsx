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
import DAILogo from "../../asset/dai-logo.png";

export default function TableBorrow({ token, borrowed, apy, lending }) {
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Your Borrow</TableCell>
            <TableCell align="center">Borrowed</TableCell>
            <TableCell align="center">APY</TableCell>
            {/* <TableCell align="center">APY Varaiable</TableCell> */}
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <img
                src={DAILogo}
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
                  {borrowed}
                </Typography>
                <Typography fontSize={"13px"}>${borrowed / 2000}</Typography>
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
                control={<Switch checked={apyType} />}
                label={"Varaiable"}
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
                      dispatch(setModalAction(ACTION.BORROW_AAVE));
                    } else {
                      dispatch(setModalAction(ACTION.BORROW_COMPOUND));
                    }
                  }}
                >
                  Borrow
                </Button>
                <Button
                  onClick={() => {
                    dispatch(toggleModalDeposit());
                    if (lending === "AAVE") {
                      dispatch(setModalAction(ACTION.REPAY_AAVE));
                    } else {
                      dispatch(setModalAction(ACTION.REPAY_COMPOUND));
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
                  Repay
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
