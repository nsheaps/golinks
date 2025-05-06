import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export const Settings: React.FC = () => {
  const [storageType, setStorageType] = React.useState("postgres");
  const [databaseUrl, setDatabaseUrl] = React.useState("");
  const [authType, setAuthType] = React.useState("none");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save settings
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Storage Type</InputLabel>
            <Select
              value={storageType}
              label="Storage Type"
              onChange={(e) => setStorageType(e.target.value)}
            >
              <MenuItem value="postgres">PostgreSQL</MenuItem>
              <MenuItem value="sqlite">SQLite</MenuItem>
              <MenuItem value="memory">In-Memory</MenuItem>
            </Select>
          </FormControl>

          {storageType === "postgres" && (
            <TextField
              fullWidth
              label="Database URL"
              value={databaseUrl}
              onChange={(e) => setDatabaseUrl(e.target.value)}
              sx={{ mb: 3 }}
            />
          )}

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Authentication</InputLabel>
            <Select
              value={authType}
              label="Authentication"
              onChange={(e) => setAuthType(e.target.value)}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="basic">Basic Auth</MenuItem>
              <MenuItem value="oauth">OAuth</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth>
            Save Settings
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
