import { Box } from "@mui/system";
import TableBorrow from "./tableBorrow";
import TableDeposit from "./tableDeposit";

const { Grid, styled, Paper, Stack, Typography } = require("@mui/material");

const Dashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#333547",
    ...theme.typography.body2,
    padding: theme.spacing(1),
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

  return (
    <Stack>
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
                      $ 506.405
                    </Typography>
                    <Typography fontSize={"13px"} marginLeft={"10px"}>
                      2769806 USD
                    </Typography>
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
                        252.36 USD
                      </Typography>
                    </Box>

                    <Box>
                      <Typography>Your collateral</Typography>
                      <Typography fontWeight={"bold"} fontSize={"20px"}>
                        252.36 USD
                      </Typography>
                    </Box>
                    <Box>
                      <Typography>Current LTV</Typography>
                      <Typography fontWeight={"bold"} fontSize={"20px"}>
                        49.83%
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
                        1.3
                      </Typography>
                    </Box>

                    <Box>
                      <Typography>Borrowing Power Used</Typography>
                      <Typography fontWeight={"bold"} fontSize={"20px"}>
                        80%
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
                  token="MATIC"
                  balance={2020.33}
                  apy={5.7}
                  collecteral={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TableBorrow
                  token="MATIC"
                  borrowed={2020.33}
                  apy={5.7}
                  apyType={true}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
