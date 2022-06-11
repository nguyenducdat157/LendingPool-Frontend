import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { injected, walletConnect } from "utils/connect";
import { useDispatch } from "react-redux";
import { toggleModalDeposit } from "store/common.reducer";
const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDeposit = () => {
    dispatch(toggleModalDeposit());
  };

  const { account, activate, deactivate } = useWeb3React();
  const [modal, setModal] = React.useState(false);
  const toggle = (connector) => {
    connector && !connector?.target && activate(connector);
    setModal(!modal);
  };

  const ModalConnect = () => {
    return (
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Connect with ...</ModalHeader>
        <ModalBody>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Button
              block
              color="warning"
              variant="contained"
              onClick={() => {
                toggle(injected);
              }}
            >
              MetaMask
            </Button>
            <Button
              block
              variant="contained"
              color="primary"
              onClick={() => {
                toggle(walletConnect);
              }}
            >
              WalletConnect
            </Button>
          </Box>
        </ModalBody>
      </Modal>
    );
  };

  return (
    <AppBar position="static" sx={{ background: "#2B2D3C" }}>
      <ModalConnect />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LENDING POOL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleDeposit}>
                <Typography textAlign="center">DEPOSIT</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">BORROW</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LENDING POOL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleDeposit}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              DEPOSIT
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              WITHDRAW
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {account ? (
              <Box
                sx={{
                  display: "flex",
                  columnGap: "20px",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {account.slice(0, 6) + "..." + account.slice(-4)}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    deactivate();
                  }}
                >
                  Disconnect
                </Button>
              </Box>
            ) : (
              <Button
                onClick={() => {
                  setModal(true);
                }}
                variant="contained"
              >
                Connect Wallet
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
