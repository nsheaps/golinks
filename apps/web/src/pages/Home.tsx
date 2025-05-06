import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [shortcut, setShortcut] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shortcut) {
      navigate(`/go/${shortcut}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center" }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Golinks
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Create and manage short links for your team
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="Enter shortcut"
              variant="outlined"
              value={shortcut}
              onChange={(e) => setShortcut(e.target.value)}
              placeholder="e.g. docs"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!shortcut}
            >
              Go
            </Button>
          </Box>
        </form>
      </Paper>
      <Button
        variant="outlined"
        sx={{ mt: 4 }}
        onClick={() => navigate("/links")}
      >
        Manage Links
      </Button>
    </Box>
  );
};
