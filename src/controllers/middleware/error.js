module.exports = (err, req, res, next) => {
  console.log("Welcome to error Handler");
  console.log(err.stack);
  next(err);
};
