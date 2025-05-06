import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import { linksRouter } from "./routes/links";
import { settingsRouter } from "./routes/settings";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/links", linksRouter);
app.use("/api/settings", settingsRouter);

// Error handling
app.use(errorHandler);

// Start server
const port = config.port;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
