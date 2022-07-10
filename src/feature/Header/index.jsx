import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from "hooks/listener";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect, disconnect } from "store/common.reducer";
import { injected, walletConnect } from "utils/connect";
const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { account, activate, deactivate } = useWeb3React();
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();
  const toggle = (connector) => {
    connector && !connector?.target && activate(connector);
    setModal(!modal);
    // localStorage.setItem("connected", true);
    dispatch(connect());
  };

  const { connected } = useSelector((s) => s.common);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

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
    <AppBar position="static" sx={{ background: "#000" }}>
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
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/aave"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                AAVE
              </Typography>

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/compound"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                COMPOUND
              </Typography>
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
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/aave"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              AAVE
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/compound"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              COMPOUND
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {account && connected ? (
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
                    // localStorage.setItem("connected", false);
                    dispatch(disconnect());
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
