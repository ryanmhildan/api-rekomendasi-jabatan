const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, secret);
};
