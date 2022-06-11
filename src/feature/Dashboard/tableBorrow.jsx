import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, FormControlLabel, Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function TableBorrow({ token, borrowed, apy, apyType }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Your Borrow</TableCell>
            <TableCell align="center">Borrowed</TableCell>
            <TableCell align="center">APY</TableCell>
            <TableCell align="center">APY Varaiable</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
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
            <TableCell align="center">
              {" "}
              <FormControlLabel
                control={<Switch checked={apyType} />}
                label={"Varaiable"}
              />
            </TableCell>
            <TableCell align="right">
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button variant="contained" sx={{ background: "#2b2d3c" }}>
                  Borrow
                </Button>
                <Button sx={{ color: "#2b2d3c" }}>Repay</Button>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
