const express = require("express");
const mainRouter  = require("./routes/index");
const cors = require("cors");
const port = 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json());

app.use("/api/v1", mainRouter);

// Add proper server startup logging
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});