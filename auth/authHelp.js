module.exports = {
  verifyToken (req, res, next) {
    let bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      next();
    } else {
      return res.sendStatus(403)
    }
  } 
}