import jwt from "jsonwebtoken";

export const  generateAccessToken = (userId,language) => {
  return jwt.sign({ userId,language }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId,language) => {
  return jwt.sign({ userId,language }, process.env.REFRESH_SECRET, {
    expiresIn: "7d", 
  });
};

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};
