const environment = process.env.NODE_ENV || "development";
const configuration = require("../../knexfile")[environment];
const database = require("knex")(configuration);

class User {
  static validateEmail(email) {
    return database.raw(`
      SELECT id FROM users WHERE email = ?`, [email])
    .then(data => {
      return data.rows
    })
  }

  static validateSSN(ssn) {
    return database.raw(`
      SELECT id FROM users WHERE ssn = ?`, [ssn])
    .then(data => {
      return data.rows
    })
  }

  static createUser(email, password, name, ssn, pin) {
    return database.raw(`
      INSERT INTO users (email, password, name, ssn, pin, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *`, [email, password, name, ssn, pin, new Date()])
    .then(data => {
      return data.rows[0]
    })
  }

  static findEmail(email) {
    return database.raw(`
      SELECT * FROM users WHERE email = ?`, [email])
    .then(data => {
      return data.rows[0]
    })
  }
}

module.exports = User;
