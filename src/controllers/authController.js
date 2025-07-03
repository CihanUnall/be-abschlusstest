import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// JWT oluşturma fonksiyonu (12 saat geçerli)
const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "12h", // 12 saat olarak ayarlandı
  });
};

// Şifre için regex (min 10 karakter, 1 büyük, 1 küçük, 1 özel karakter)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{10,}$/;

// Kayıt (signup)
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basit validationlar
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

    // Email zaten kullanımda mı kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Yeni kullanıcı oluşturma
    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "applicant", // default applicant
    });

    // Token oluştur
    const token = createToken(newUser);

    // Cookie ayarları - prod ortamda secure true yapılmalı
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 1000, // 12 saat
    });

    // Başarılı kayıt cevabı
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

// Giriş (login)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    // Şifre kontrolü
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    // Token oluştur
    const token = createToken(user);

    // Cookie ayarları
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 1000, // 12 saat
    });

    // Başarılı giriş cevabı
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

// Çıkış (logout)
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Çerez hemen silinir
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logout Successful!" });
};
