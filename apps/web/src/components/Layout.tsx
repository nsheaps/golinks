import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Golinks
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/links">
            Links
          </Button>
          <Button color="inherit" component={RouterLink} to="/settings">
            Settings
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{ py: 3, px: 2, mt: "auto", backgroundColor: "background.paper" }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Golinks
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
