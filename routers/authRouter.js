const Authentication = require('../library/controllers/AuthController')

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({squee: "awesome"})
  })

  app.post('/signup', Authentication.signup)
}
