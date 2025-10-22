exports.index = (req, res) => {
    res.render('register');
};

exports.registerUser = (req, res) => {
    console.log(req.body);
  res.send("Account created");
};
