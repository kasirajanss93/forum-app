import express from "express";
var app = express();

// Define request response in root URL (/)
app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World");
});

// Launch listening server on port 8080
app.listen(8080, () => {
  console.log("App listening on port 8080!");
});

export default app;
