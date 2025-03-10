import express from "express";
import availableSessions from "./scripts/availableSessions.js";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/get-available-sessions", async (req, res) => {
  try {
    const sessions = await availableSessions(req.body);
    res.send(sessions);
  } catch (error) {
    res.status(500).send({ error: "Failed to get available sessions" });
  }
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
