import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { SECRET_KEY } from "../config";
import { User } from "../models";

export const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ message: "Could not create user.", errors: errors.array() });

  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (user)
      return res.status(422).json({ message: "Email address already exists." });

    user = new User(req.body);

    const salt = await bcryptjs.genSalt(12);
    user.password = await bcryptjs.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({ message: "User created successfully.", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
