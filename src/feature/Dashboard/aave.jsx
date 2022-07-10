import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from "feature/connectWallet";
import { useSmartContact } from "hooks/useSmartContract";
import { useSelector } from "react-redux";
import TableBorrow from "./tableBorrow";
import TableDeposit from "./tableDeposit";

const {
  Grid,
  styled,
  Paper,
  Stack,
  Typography,
  // Button,
} = require("@mui/material");

const Aave = () => {
  const { account } = useWeb3React();
  // const dispatch = useDispatch();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#333547",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: "center",
    color: "#fff",
    height: "300px",
    padding: "0px",
  }));

  const HRItem = styled(Box)(() => ({
    height: "2px",
    background:
      "linear-gradient(90deg, rgba(194,9,213,0.8099614845938375) 0%, rgba(25,22,222,0.4318102240896359) 51%, rgba(0,212,255,1) 100%)",
  }));

  const TextTitle = styled(Typography)(() => ({
    padding: "10px 20px",
    textAlign: "left",
  }));

  useSmartContact();
  const { totalDeposit, yourBorrow, yourCollateral } = useSelector(
    (s) => s.contract
  );

  const { connected } = useSelector((s) => s.common);

  return (
    <Stack>
      {account && connected ? (
        <Box sx={{ borderTop: "50px solid transparent" }}>
          <Box sx={{ width: "90%", margin: "auto" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Item>
                  <TextTitle>Deposit Infomation</TextTitle>
                  <HRItem />
                  <Box
                    sx={{
                      height: "75%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "start",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                  >
                    <Typography>Approximate Balance</Typography>
                    <Box sx={{ display: "flex", alignItems: "baseline" }}>
                      <Typography fontWeight={"bold"} fontSize={"20px"}>
                        {totalDeposit} DAI
                      </Typography>
                      {/* <Typography fontSize={"13px"} marginLeft={"10px"}>
                      2769806 USD
                    </Typography> */}
                    </Box>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <TextTitle>Borrow Infomation</TextTitle>
                  <HRItem />
                  <Box
                    sx={{
                      display: "grid",
                      padding: "20px",
                      gridTemplateColumns: "30% 30% 40%",
                      textAlign: "start",
                    }}
                  >
                    <Stack
                      spacing={"20px"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <Box>
                        <Typography>Your borrowed</Typography>
                        <Typography fontWeight={"bold"} fontSize={"20px"}>
                          {yourBorrow} DAI
                        </Typography>
                      </Box>

                      <Box>
                        <Typography>Your collateral</Typography>
                        <Typography fontWeight={"bold"} fontSize={"20px"}>
                          {yourCollateral} ETH
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>Current LTV</Typography>
                        <Typography fontWeight={"bold"} fontSize={"20px"}>
                          -
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack
                      spacing={"20px"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <Box>
                        <Typography>Health factor</Typography>
                        <Typography fontWeight={"bold"} fontSize={"20px"}>
                          -
                        </Typography>
                      </Box>

                      <Box>
                        <Typography>Borrowing Power Used</Typography>
                        <Typography fontWeight={"bold"} fontSize={"20px"}>
                          -
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Item>
              </Grid>
            </Grid>
            <Box sx={{ width: "100%", margin: "auto", marginTop: "40px" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TableDeposit
                    token="ETH"
                    balance={2020.33}
                    apy={5.7}
                    lending={"AAVE"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TableBorrow
                    token="DAI"
                    borrowed={2020.33}
                    apy={5.7}
                    lending={"AAVE"}
                  />
                </Grid>
              </Grid>
            </Box>
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

export default Aave;
