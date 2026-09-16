const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { createToken, setAuthCookie } = require("../utils/auth");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long.",
      });
    }

    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        error: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const userId = await userModel.createUser(
      name,
      email,
      passwordHash
    );

    return res.status(201).json({
      message: "Account created successfully.",
      userId,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      error: "Something went wrong while creating the account.",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const token = createToken(user.id);

    setAuthCookie(res, token);

    return res.json({
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        points: user.points,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      error: "Something went wrong while logging in.",
    });
  }
}

async function me(req, res) {
  try {
    const user = await userModel.findUserById(req.userId);

    if (!user) {
      return res.status(401).json({
        error: "User account no longer exists.",
      });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        points: user.points,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Me error:", error);

    return res.status(500).json({
      error: "Something went wrong while loading your account.",
    });
  }
}

async function logout(req, res) {
  res.clearCookie("auth_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.json({
    message: "Logout successful.",
  });
}

module.exports = {
  register,
  login,
  me,
  logout,
};