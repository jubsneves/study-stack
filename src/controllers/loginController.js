exports.index = (req, res) => {
  res.render("login");
};

exports.loginUser = (req, res) => {
    res.send(req.body);
};
