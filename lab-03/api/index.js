// Vercel serverless entry point. Vercel's filesystem is read-only except /tmp,
// so the SQLite file lives in /tmp. Data resets when the function restarts.
const os = require("os");
const path = require("path");
const { initDb } = require("../src/db");
const { seedIfEmpty } = require("../src/seed");
const { createApp } = require("../src/app");

let appPromise;

function getApp() {
  if (!appPromise) {
    appPromise = (async () => {
      const db = await initDb(path.join(os.tmpdir(), "books.db"));
      await seedIfEmpty(db);
      return createApp(db);
    })();
  }
  return appPromise;
}

module.exports = async (req, res) => {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Internal server error" }));
  }
};
