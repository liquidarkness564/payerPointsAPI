const models = require('./db/database.js');

module.exports = {
  getAllPayers: (req, res) => {
    models.Payer.find({}, (err, results) => {
      if (err) {
        console.log('failed to fetch payers from database', err);
        res.statusCode = 500;
        res.end('failed to fetch payers from database');
      } else {
        res.statusCode = 200;
        res.send(results);
      }
    })
  },

  postTransaction: (req, res) => {
    models.Payer.findOne({payer: req.body.payer}, (err1, results1) => {
      if (err1) {
        console.log('failed to find payer', err1)
        res.statusCode = 500;
        res.end('failed to find payer')
      } else {
        if (results1) {
          models.Payer.updateOne({payer: req.body.payer}, {points: results1.points + req.body.points}, (err2, results2) => {
            if (err2) {
              console.log('failed to update payer', err2);
              res.statusCode = 500;
              res.end('failed to update payer');
            } else {
              let newTrans = new models.Transaction({
                payer: req.body.payer,
                points: req.body.points,
                timestamp: new Date()
              })
              newTrans.save()
                .then(doc => {
                  res.statusCode = 201;
                  res.send('201 OK');
                })
                .catch(err => {
                  res.statusCode = 500;
                  console.log('failed to post transaction', err)
                  res.end('failed to post transaction');
                })
            }
          })
        } else {
          let newPayer = new models.Payer({
            payer: req.body.payer,
            points: req.body.points
          });
          newPayer.save()
            .then(doc => {
              let newTrans = new models.Transaction({
                payer: req.body.payer,
                points: req.body.points,
                timestamp: new Date()
              })
              newTrans.save()
                .then(doc => {
                  res.statusCode = 201;
                  res.send('201 OK');
                })
                .catch(err => {
                  res.statusCode = 500;
                  console.log('failed to post transaction', err)
                  res.end('failed to post transaction');
                })
            })
            .catch(err => {
              res.statusCode = 500;
              console.log('failed to post payer data', err)
              res.end('failed to post payer data');
            })
        }
      }
    })
  },

  updatePoints: (req, res) => {
    models.Transaction.find({}).sort([['timestamp', 1]]).exec(async (err, results) => {
      if (err) {
        console.log('failed to update points', err);
        res.statusCode = 500;
        res.end('failed to update points');
      } else {
        let payers = [];
        let spendPoints = req.body.points
        let total = results.reduce((pre, cur) => pre.points + cur.points);
        if (spendPoints > total) {
          res.statusCode = 200;
          res.end('You don\'t have enough points for that');
        } else {
          for (let j = 0; j < results.length; j++) {
            let exists = false;
            for (let i = 0; i < payers.length; i++) {
              if (payers[i].payer === results[j].payer && results[j].points !== 0) {
                exists = true;
              }
            }
            if (!exists) {
              payers.push({payer: results[j].payer, points: 0})
            }
            for (let i = 0; i < payers.length; i++) {
              if (payers[i].payer === results[j].payer) {
                if (results[j].points > spendPoints) {
                  payers[i].points -= spendPoints;
                  await models.Transaction.updateOne({_id: results[j]._id}, {points: results[j].points - spendPoints})
                  spendPoints = 0;
                  break;
                } else {
                  payers[i].points -= results[j].points;
                  spendPoints -= results[j].points;
                  await models.Transaction.updateOne({_id: results[j]._id}, {points: 0});
                }
              }
            }
            if (spendPoints <= 0) { break; }
          }
          payers.forEach(async pay => {
            await models.Payer.findOne({payer: pay.payer}, (err3, results3) => {
              if (err3) {
                console.log('failed to find payer', err3);
                res.statusCode = 500;
                res.end('failed to find payer');
              } else {
                models.Payer.updateOne({payer: pay.payer}, {points: results3.points + pay.points}, (err2, results2) => {
                  if (err2) {
                    console.log('failed to update payer', err);
                    res.statusCode = 500;
                    res.end('failed to update payer');
                  }
                });
              }
            });
          });
          res.statusCode = 200;
          res.send(payers);
        }
      }
    })
  }
}