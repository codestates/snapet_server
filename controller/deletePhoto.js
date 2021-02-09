const { users } = require('../models')
module.exports = {
  post: (req, res) => {
    console.log(users, 'alksdfjas;dfkjslkfjd;')
    
    res.send('ok!')
  }
}