exports.homePage = (req, res) => {
  res.render("index", { title: "Teste EJS", numbers: [1, 2, 3, 4, 5] });
};

exports.handlePost = (req, res) => {
  res.send(`Welcome ${req.body.client}`);
};
