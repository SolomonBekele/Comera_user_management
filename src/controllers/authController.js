import { getUserByEmailService } from "../services/userService.js";
import argon2 from "argon2";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/generateToken.js";
import { signUpService } from "../services/authService.js";
import i18n from "../i18n/langConfig.js";
import logger from "../utils/logger.js";

// ==================== SIGNUP ====================
export const signUp = async (req, res) => {
  const { first_name, last_name, password, email, role, language } = req.body;

  try {
    const hashedPassword = await argon2.hash(password);
    const user = await getUserByEmailService(email);
    i18n.setLocale(language);

    if (user) {
      logger.warn(`Signup failed: email already exists -> ${email}`);
      return res.status(400).json({
        error: i18n.__("USER.CONFLICT_EMAIL", { email }),
      });
    }

    let role1 = role.toUpperCase();
    let status = role1 === "LIBRARIAN" ? "PENDING" : "VERIFIED";

    const createdUser = await signUpService(
      first_name,
      last_name,
      email,
      hashedPassword,
      role1,
      language,
      status
    );

    const { password: pw, ...userWithoutPassword } = createdUser;

    logger.info(`New user registered: email=${email}, role=${role1}, status=${status}`);

    res.status(200).json({
      success: true,
      message: i18n.__("USER.CREATED"),
      data: userWithoutPassword,
    });
  } catch (err) {
    // 👇 this writes into console + error.log
    logger.error(`Signup error for email=${email}: ${err.message}`, { stack: err.stack });
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailService(email);

    if (!user) {
      logger.warn(`Login failed: user not found -> ${email}`);
      return res.status(400).json({ error: i18n.__("USER.INVALID_CREDENTIALS") });
    }

    i18n.setLocale(user.language);

    const isPasswordCorrect = await argon2.verify(user.password, password);
    if (!isPasswordCorrect) {
      logger.warn(`Login failed: wrong password for ${email}`);
      return res.status(400).json({ error: i18n.__("USER.INVALID_CREDENTIALS") });
    }

    const { password: pw, ...userWithoutPassword } = user;

    const token = generateAccessToken(user.id, user.language);
    const refreshToken = generateRefreshToken(user.id, user.language);

    logger.info(`Login success: email=${email}, id=${user.id}`);

    res.status(200).json({
      success: true,
      message: i18n.__("USER.LOGIN_SUCCESS"),
      id: user.id,
      token,
      refreshToken,
    });
  } catch (error) {
    logger.error(`Login error for ${req.body.email}: ${error.message}`, { stack: error.stack });
    res.status(500).json({ error: error.message });
  }
};

// ==================== LOGOUT ====================
export const logout = (req, res) => {
  logger.info(`User logged out -> id=${req.user?.id || "unknown"}`);
  logger.info("Server started on port 5000", { service: "user-service" });
  logger.warn("Low disk space", { disk: "/dev/sda1" });
  logger.error("Database connection failed", { db: "mysql" });
  res.json({ message: i18n.__("USER.LOGOUT_SUCCESS") });
};

// ==================== REFRESH TOKEN ====================
export const refreshToken = (req, res) => {
  try {
    const token = req.body.refreshToken;
    if (!token) {
      logger.warn("Refresh failed: no token provided");
      return res.status(401).json({ message: i18n.__("USER.NO_TOKEN") });
    }

    const payload = verifyToken(token, process.env.REFRESH_SECRET);
    if (!payload) {
      logger.warn("Refresh failed: invalid token");
      return res.status(403).json({ message: i18n.__("USER.INVALID_TOKEN") });
    }

    const newAccessToken = generateAccessToken(payload.userId);
    logger.info(`Refresh success: new token issued for userId=${payload.userId}`);

    return res.json({ token: newAccessToken });
  } catch (error) {
    logger.error(`Refresh token error: ${error.message}`, { stack: error.stack });
    return res.status(500).json({ message: i18n.__("USER.SERVER_ERROR") });
  }
};
