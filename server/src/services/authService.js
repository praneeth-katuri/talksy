const User = require("../models/User");

const login = async ({ email, password }) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    const error = new Error("Invalid password");
    error.status = 404;
    throw error;
  }
  const accessToken = jwt.sign({ id: user._id }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });

  const refreshToken = jwt.sign({ id: user._id }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

  return { user, accessToken, refreshToken };
};

const register = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    const error = new Error("Email already registered");
    error.status = 409;
    throw error;
  }

  const user = await User.create({ email, name, password });
  return user;
};

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Token not found");
    error.status = 401;
    throw error;
  }

  const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);

  const user = await User.findById({ id: decoded.id });

  if (!user) {
    const error = new Error("Invalid Token");
    error.status = 401;
    throw error;
  }
  const accessToken = jwt.sign({ id: user._id }, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });

  return { accessToken, user };
};

module.exports = { login, register, refresh };
