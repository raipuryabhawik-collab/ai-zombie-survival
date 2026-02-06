const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend Running 🚀" });
});

app.listen(5000, () => console.log("Backend started on 5000"));

