const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/payerPoints', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => {
  console.error('connection error')
});
db.once('open', () => {
  console.log('Connected to Mongo!')
});

const payerSchema = mongoose.Schema({
  payer: String,
  points: Number
});

const transactionSchema = mongoose.Schema({
  payer: String,
  points: Number,
  timestamp: Date
})

const Payer = mongoose.model('Payer', payerSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
  Payer, Transaction
}