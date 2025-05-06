import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

interface Link {
  id: string;
  shortcut: string;
  url: string;
  description: string;
}

export const Links: React.FC = () => {
  const [links, setLinks] = React.useState<Link[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editingLink, setEditingLink] = React.useState<Link | null>(null);
  const [formData, setFormData] = React.useState({
    shortcut: "",
    url: "",
    description: "",
  });

  const handleOpen = (link?: Link) => {
    if (link) {
      setEditingLink(link);
      setFormData({
        shortcut: link.shortcut,
        url: link.url,
        description: link.description,
      });
    } else {
      setEditingLink(null);
      setFormData({
        shortcut: "",
        url: "",
        description: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLink(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save link
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" component="h1">
          Manage Links
        </Typography>
        <Button variant="contained" onClick={() => handleOpen()}>
          Add Link
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shortcut</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell>{link.shortcut}</TableCell>
                <TableCell>{link.url}</TableCell>
                <TableCell>{link.description}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(link)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingLink ? "Edit Link" : "Add New Link"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Shortcut"
              fullWidth
              value={formData.shortcut}
              onChange={(e) =>
                setFormData({ ...formData, shortcut: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="URL"
              fullWidth
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingLink ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
