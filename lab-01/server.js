// server.js
// Lab 1 - Part B: Express server with routes and correct HTTP status codes.

const express = require("express");

// Create the Express application.
const app = express();

// Port 3000 by default; some hosting platforms provide their own port.
const PORT = process.env.PORT || 3000;

// Student details (kept in one place so it is easy to explain/update).
const student = {
  name: "Patan Harshad Bhasha",
  registrationNumber: "252U1R7077",
  section: "CSE(FSD) 2B",
  course: "Backend Development Fundamentals",
  labNumber: 1,
};

// GET / : welcome message with 200 OK.
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Lab 1: Node.js and Express Server");
});

// GET /about : student details as JSON with 200 OK.
app.get("/about", (req, res) => {
  res.status(200).json(student);
});

// GET /time : current date and time with 200 OK.
app.get("/time", (req, res) => {
  const now = new Date();
  res.status(200).send(`Current date and time: ${now.toString()}`);
});

// Any other (unknown) route: clear 404 Not Found response.
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start listening on the port.
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
