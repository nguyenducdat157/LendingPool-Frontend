import { Box } from "@mui/system";
import { useSmartContact } from "hooks/useSmartContract";
// import { useSelector } from "react-redux";

const {
  // Grid,
  styled,
  // Paper,
  Stack,
  Typography,
  // Button,
  Link,
} = require("@mui/material");

const Dashboard = () => {
  const BoxAave = styled(Box)(() => ({
    height: "80vh",
    background: "#2b2d3c",
    width: "40%",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }));

  const BoxCompound = styled(Box)(() => ({
    height: "80vh",
    background: "#141e27",
    width: "40%",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }));

  useSmartContact();
  // const { totalDeposit, yourBorrow, yourCollateral, LTV } = useSelector(
  //   (s) => s.contract
  // );

  return (
    <Stack>
      <Box sx={{ borderTop: "50px solid transparent" }}>
        <Box
          sx={{
            width: "90%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <BoxAave>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "36px",
                fontWeight: "700",
              }}
            >
              Aave
            </Typography>
            <Link
              style={{
                boxShadow: "none",
                borderRadius: "4px",
                fontFamily: "Inter,Arial",
                fontWeight: "500",
                lineHeight: "1.5rem",
                fontSize: "1.5rem",
                padding: "10px 16px",
                color: "#fff",
                background:
                  "linear-gradient( \n248.86deg\n , #B6509E 10.51%, #2EBAC6 93.41%)",
                width: "fit-content",
                textDecoration: "none",
              }}
              href="/aave"
            >
              Go to lending
            </Link>
          </BoxAave>
          <BoxCompound>
            <Typography
              sx={{
                color: "#00D395",
                fontSize: "36px",
                fontWeight: "700",
              }}
            >
              Compound
            </Typography>
            <Link
              style={{
                borderRadius: "4px",
                fontFamily: "Inter,Arial",
                fontWeight: "500",
                lineHeight: "1.5rem",
                padding: "10px 16px",
                color: "#fff",
                fontSize: "1.5rem",
                background: "#00D395",
                transition: "background-color 0.2s ease-in, color 0.2s ease-in",
                textTransform: "none",
                textDecoration: "none",
              }}
              href="/compound"
            >
              Go to lending
            </Link>
          </BoxCompound>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
