function preserveUserId(req, res, next) {
  const userId = req.query.userId || req.body.userId;

  if (userId) {
    res.locals.userId = userId; // inject ke EJS
    req.userId = userId;        // inject ke route/controller
  }

  next(); // lanjut ke route handler berikutnya
}

module.exports = preserveUserId;
