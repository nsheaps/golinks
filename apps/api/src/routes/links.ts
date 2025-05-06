import { Router } from "express";
import { LinkService } from "../services/linkService";

const router = Router();
const linkService = new LinkService();

// Get all links
router.get("/", async (req, res, next) => {
  try {
    const links = await linkService.getAllLinks();
    res.json(links);
  } catch (error) {
    next(error);
  }
});

// Get link by shortcut
router.get("/:shortcut", async (req, res, next) => {
  try {
    const link = await linkService.getLinkByShortcut(req.params.shortcut);
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }
    res.json(link);
  } catch (error) {
    next(error);
  }
});

// Create new link
router.post("/", async (req, res, next) => {
  try {
    const link = await linkService.createLink(req.body);
    res.status(201).json(link);
  } catch (error) {
    next(error);
  }
});

// Update link
router.put("/:id", async (req, res, next) => {
  try {
    const link = await linkService.updateLink(req.params.id, req.body);
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }
    res.json(link);
  } catch (error) {
    next(error);
  }
});

// Delete link
router.delete("/:id", async (req, res, next) => {
  try {
    const success = await linkService.deleteLink(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Link not found" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export const linksRouter = router;
