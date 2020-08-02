import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export const isAuth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ message: "Not authenticated." });

  try {
    let decodedToken = jwt.verify(token, SECRET_KEY);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Not authenticated." });
  }
};
