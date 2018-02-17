const Authentication = require('../library/controllers/AuthController')
const passportService = require("../services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.send({squee: "awesome"})
  })

  app.post("/signup", Authentication.signup);
  app.post("/signin", requireSignin, Authentication.signin);
};
