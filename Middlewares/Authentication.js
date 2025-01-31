const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// jwt suthentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};



module.exports = authenticate;