const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/test", (req, res) => res.json({ message: "Server is alive" }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/factory", require("./routes/factoryRoutes"));
app.use("/api/machine", require("./routes/machineRoutes"));
app.use("/api/production", require("./routes/productionRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/whatsapp", require("./routes/whatsapp"));
app.use("/api/owner", require("./routes/ownerRoutes"));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Owner Server running on port ${PORT}`));