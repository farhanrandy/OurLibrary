function preserveUserId(req, res, next) {
  const userId = req.query.userId || req.body.userId;

  if (userId) {
    res.locals.userId = userId; 
    req.userId = userId;        
  }

  next();
}

module.exports = preserveUserId;
