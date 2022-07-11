import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from "feature/connectWallet";
import { useSmartContact } from "hooks/useSmartContract";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import TableBorrow from "./tableBorrow";
import TableDeposit from "./tableDeposit";

const {
  Grid,

  Stack,
  Typography,
} = require("@mui/material");

const Compound = () => {
  const { account } = useWeb3React();
  // const dispatch = useDispatch();
  useSmartContact();
  // const { totalDeposit, yourBorrow, yourCollateral, LTV } = useSelector(
  //   (s) => s.contract
  // );
  const { connected } = useSelector((s) => s.common);
  const { apyCompound, supplyBalanceCompound, borrowBalanceCompound } =
    useSmartContact();

  return (
    <Stack>
      {account && connected ? (
        <Box sx={{ borderTop: "50px solid transparent" }}>
          <Box
            sx={{
              width: "100%",
              margin: "auto",
              background: "#070a0e",
              height: "400px",
              marginBottom: "-100px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  color: "#00D395",
                  cursor: "inherit",

                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Supply Balance
              </Typography>
              <Typography sx={{ color: "#fff", fontSize: "1.6rem" }}>
                {Math.round(supplyBalanceCompound * 1000000) / 1000000} ETH
              </Typography>
            </Box>
            <Box
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                width: "200px",
                height: "200px",
                justifyContent: "center",
                border: "3px solid #00D395",
                borderRadius: "50%",
                margin: "auto",
              }}
            >
              Net APY
            </Box>
            <Box
              sx={{
                width: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  color: "#9969DE",
                  cursor: "inherit",

                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Borrow Balance
              </Typography>
              <Typography sx={{ color: "#fff", fontSize: "1.6rem" }}>
                {Math.round(borrowBalanceCompound * 1000000) / 1000000} DAI
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "80%", margin: "auto", marginTop: "40px" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <TableDeposit
                  token="ETH"
                  balance={supplyBalanceCompound}
                  apy={apyCompound?.supplyApy}
                  lending={"COMPOUND"}
                />
              </Grid>
              <Grid item xs={6}>
                <TableBorrow
                  token="DAI"
                  borrowed={borrowBalanceCompound}
                  apy={apyCompound?.borrowApy}
                  lending={"COMPOUND"}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        // <Button
        //   sx={{
        //     color: "#000",
        //     width: "200px",
        //     height: "32px",
        //     margin: "auto",
        //     marginTop: "112px",
        //     border: "3px solid #000",
        //   }}
        //   onClick={() => {
        //     dispatch(showModalConnect());
        //   }}
        // >
        //   Connect Wallet
        // </Button>
        <ConnectWallet />
      )}
    </Stack>
  );
};

export default Compound;
