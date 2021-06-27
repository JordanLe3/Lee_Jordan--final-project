function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(404).send({ message: "not found" });
}

export default errorHandler;
  //catch all error handler