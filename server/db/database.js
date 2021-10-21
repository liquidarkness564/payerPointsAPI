const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/payerPoints', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', () => {
  console.error('connection error')
});
db.once('open', () => {
  console.log('Connected to Mongo!')
});

const payerSchema = mongoose.Schema({
  payer: String,
  points: Number,
  timestamp: String
})

const Payer = mongoose.model('Payer', payerSchema);

module.exports = Payer;