const getUserService = (req, res, next) => {
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const userService = container.get("userService");
  req.service = userService;
  next();
};

const getBoxService = (req, res, next) => {
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const boxService = container.get("boxService");
  req.service = boxService;
  next();
};
