import { Router } from "express";
import { config } from "../config";

const router = Router();

// Get current settings
router.get("/", (req, res) => {
  res.json(config);
});

// Update settings
router.put("/", (req, res) => {
  // TODO: Implement settings update
  res.status(501).json({ error: "Not implemented" });
});

export const settingsRouter = router;
