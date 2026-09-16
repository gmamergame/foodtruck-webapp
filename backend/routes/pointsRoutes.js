const express = require("express");
const pointsController = require("../controllers/pointsController");
const { requireAuth } = require("../utils/auth");

const router = express.Router();

router.get("/", requireAuth, pointsController.getPoints);

module.exports = router;