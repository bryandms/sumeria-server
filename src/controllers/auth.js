import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { SECRET_KEY } from "../config";
import { User } from "../models";

export const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ message: "Could not create user.", errors: errors.array() });

  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ message: "These credentials do not match our records." });

    const isEqual = await bcryptjs.compare(password, user.password);
    if (!isEqual)
      return res
        .status(401)
        .json({ message: "These credentials do not match our records." });

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({ message: "User login successfully.", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
