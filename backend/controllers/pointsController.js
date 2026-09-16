const userModel = require("../models/userModel");

async function getPoints(req, res) {
  try {
    const user = await userModel.findUserById(req.userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    return res.json({
      points: user.points,
    });
  } catch (error) {
    console.error("Get points error:", error);

    return res.status(500).json({
      error: "Something went wrong while loading points.",
    });
  }
}

module.exports = {
  getPoints,
};