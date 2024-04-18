const express = require("express");
const path = require("path")
const connectDb = require("./config/connectDb");
const authRoutes = require('./routes/auth.routes');
const app = express();
const cors = require('cors');

const dotenv = require("dotenv").config();

// const __dirname = path.resolve();

// custom port
const PORT = process.env.PORT || 3001;

// database connection
connectDb();

// middle ware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/flowers", require("./routes/flowers.routes"));
app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  // console.log(`Server is running on ${PORT}`);
});
