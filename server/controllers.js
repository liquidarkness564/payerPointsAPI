const Payer = require('./db/database.js');

module.exports = {
  getAllPayers: (req, res) => {
    res.send('hello from getAllPlayers');
  },

  postTransaction: (req, res) => {
    res.send('hello from postTransaction');
  },

  updatePoints: (req, res) => {
    res.send('hello from updatePoints');
  }
}