// server-http.js
// Lab 1 - Part A: Basic HTTP server using Node.js's built-in "http" module (no Express).

const http = require("http");

// Port 3000 by default; some hosting platforms provide their own port.
const PORT = process.env.PORT || 3000;

// Create the server with a request handler.
const server = http.createServer((req, res) => {
  // req.url contains the path the client asked for (for example "/" or "/about").
  // Split off any query string so that "/?page=2" is still treated as the root route.
  const path = req.url.split("?")[0];
  if (path === "/") {
    // Root route: respond with plain text and status 200 OK.
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello");
  } else {
    // Any other route: respond with 404 Not Found.
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

// Start listening on the port.
server.listen(PORT, () => {
  console.log(`Basic HTTP server (http module) running at http://localhost:${PORT}`);
});
