exports.homePage = (req, res) => {
  res.render("index");
  return;
};

exports.handlePost = (req, res) => {
  res.send(`Welcome ${req.body.cliente}`);
  return;
};
