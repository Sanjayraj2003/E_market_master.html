const crypto = require("crypto");
const { User } = require("../models/User");
const { sanitizeUser } = require("../services/Commons");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  const userPresent = await User.findOne({ email: req.body.email });
  if (userPresent) {
    res.status(403).json({ message: "User already exists" });
  } else {
    try {
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          const user = new User({
            ...req.body,
            password: hashedPassword,
            salt,
          });
          const doc = await user.save();
          req.login(sanitizeUser(user), function (err) {
            if (err) {
              res.status(400).json(err);
            } else {
              const token = jwt.sign(
                sanitizeUser(user),
                process.env.JWT_SECRET_KEY
              );
              res
                .cookie("jwt", token, {
                  expires: new Date(Date.now() + 3600000),
                  httpOnly: true,
                })
                .status(201)
                .json(sanitizeUser(doc));
            }
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
};

exports.loginUser = async (req, res) => {
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(sanitizeUser(req.user));
};
exports.checkUser = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
