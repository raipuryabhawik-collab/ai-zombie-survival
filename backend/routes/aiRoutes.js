const express = require("express");
const router = express.Router();

router.get("/ai", (req, res) => {
  res.json({ ai: "active" });
});

module.exports = router;

