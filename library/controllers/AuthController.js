const jwt = require("jwt-simple")
const User = require("../models/Users")
const keys = require('../../config/keys')
const bcrypt = require("bcrypt-nodejs")

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.jwtKey);
}

class AuthController {
  static signup(req, res, next) {
    const email = req.body.email;
    const rawPassword = req.body.password;
    const name = req.body.name;
    const ssn = req.body.ssn;
    const pin = req.body.pin;


    const password = bcrypt.hashSync(rawPassword)

    if (!email || !rawPassword || !name || !ssn || !pin) {
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
              const token = tokenForUser(data.id)
              res.json({ token: token })
            })
          }
        })
      }
    })
  }

  static signin(req, res, next) {
    const token = tokenForUser(req.user.id)
    res.send({ token: token })
  }
}

module.exports = AuthController;
