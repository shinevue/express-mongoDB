// imports the user model
const Auth = require("../models/auth.model");

// make a controller for get a user
exports.signin = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await Auth.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ msg: `Not found user with id: ${userId}` });
    } else {
      if (user.password === password)
        res.status(202).json({
          message: "Signin successfully.",
          user: user,
        });
      else
        res.status(401).json({
          message: "Password is incorrect.",
          user: user,
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// make a controller for create a user
exports.signup = async (req, res) => {
  const newUser = new Auth(req.body);
  await newUser.save((err) => {
    if (err) {
      res.status(500).json({
        message: "This error is" + err.message,
      });
    } else {
      res.status(201).json({
        message: "Create a new user successfully.",
      });
    }
  });
};
