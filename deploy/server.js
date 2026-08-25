import express from "express";
import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN = process.env.DEPLOY_TOKEN;
const PORT = process.env.PORT || 9000;

if (!TOKEN) {
  console.error("Missing DEPLOY_TOKEN env var");
  process.exit(1);
}

const app = express();

app.use((req, res, next) => {
  const auth = req.get("X-Deploy-Token");
  if (auth !== TOKEN) return res.status(401).json({ error: "unauthorized" });
  next();
});

function runScript(name, res) {
  const script = path.join(__dirname, "scripts", name);
  execFile("/bin/bash", [script], { timeout: 5 * 60 * 1000 }, (err, stdout, stderr) => {
    if (err) {
      console.error(`[${name}] failed:`, stderr || err.message);
      return res.status(500).json({ ok: false, output: stderr || err.message });
    }
    console.log(`[${name}] ok`);
    res.json({ ok: true, output: stdout });
  });
}

app.post("/deploy", (req, res) => runScript("deploy.sh", res));
app.post("/restart", (req, res) => runScript("restart.sh", res));
app.post("/rollback", (req, res) => runScript("rollback.sh", res));

app.get("/status", (req, res) => {
  execFile("/bin/bash", [path.join(__dirname, "scripts", "status.sh")], (err, stdout, stderr) => {
    if (err) return res.status(500).json({ ok: false, output: stderr || err.message });
    res.json({ ok: true, output: stdout.trim() });
  });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`deploy-api listening on 127.0.0.1:${PORT}`);
});
