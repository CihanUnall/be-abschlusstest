import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//  JWT creation function (valid for 12 hours)
const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};

// Regex for password (min 10 characters, 1 uppercase, 1 lowercase, 1 special character)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{10,}$/;

// (signup)
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //  Simple validations
    if (!name || name.length < 3 || name.length > 20) {
      return res.status(400).json({
        message: "Name must be between 3 and 20 characters.",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 10 characters, include 1 uppercase, 1 lowercase, and 1 special character.",
      });
    }

    if (role && !["company", "applicant"].includes(role)) {
      return res.status(400).json({
        message: "Role must be either 'company' or 'applicant'.",
      });
    }

    //Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Creating a new user
    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "applicant", // default applicant
    });

    //  Create token
    const token = createToken(newUser);

    // Cookie settings - secure should be set to true in the prod environment
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 1000, //12h
    });

    // Successful registration response
    res.status(201).json({
      message: "User successfully registered!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration error." });
  }
};

// (login)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    // Create token
    const token = createToken(user);

    // Cookie settings
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 1000, // 12 saat
    });

    // Successful login response
    res.status(200).json({
      message: "Login Successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error!" });
  }
};

// (logout)
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logout Successful!" });
};
