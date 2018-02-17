const jwt = require("jwt-simple")
const User = require("../models/Users")
const keys = require('../../config/keys')

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtKey);
}

class AuthController {
  static signup(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const ssn = req.body.ssn;
    const pin = req.body.pin;

    if (!email || !password || !name || !ssn || !pin) {
      return res.status(422).send({ error: "You must provide all relevant information" });
    }

    User.validateEmail(email)
    .then(data => {
      if(data.length > 0) {
        return res.status(422).send({ error: "Email address already exists" });
      } else {
        User.validateSSN(ssn)
        .then(data => {
          if(data.length > 0) {
            return res.status(422).send({ error: "SSN already exists" });
          } else {
            return User.createUser(email, password, name, ssn, pin)
            .then(data => {
              const token = tokenForUser(data.rows[0].id)
              res.json({ token: token })
            })
          }
        })
      }
    })
  }
}

module.exports = AuthController;
