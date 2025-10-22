exports.index = (req, res) => {
  res.render("login");
};

exports.loginUser = (req, res) => {
    console.log(req.body);
    res.send("Logged In");
};
