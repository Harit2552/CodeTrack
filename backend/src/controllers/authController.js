const User = require("../models/User");

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({ email, password });

    res.status(201).json({
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
