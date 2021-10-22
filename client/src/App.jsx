import React, {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {

  })

  const [payer, setPayer] = useState('');
  const [points, setPoints] = useState(0);
  const [spendPoints, setSpendPoints] = useState(0);

  const [isActive, setIsActive] = useState(false);

  const [allPayers, setAllPayers] = useState([]);
  const [spentPayers, setSpentPayers] = useState([]);

  const handleInputChange = (e) => {
    switch(e.target.id) {
      case 'payer':
        setPayer(e.target.value);
        break;
      case 'points':
        setPoints(e.target.value);
        break;
      case 'spendPoints':
        setSpendPoints(e.target.value);
        break;
    }
  }

  const getPayers = (e) => {
    e.preventDefault();
    axios.get('http://18.224.64.250:3000/points')
      .then(res => {
        setAllPayers(res.data);
        console.log(res.data);
      })
      .catch(err => console.log('failed to fetch payers'))
  }

  const performTransaction = (e, payer, points) => {
    e.preventDefault();
    axios.post('http://18.224.64.250:3000/points', {payer, points})
      .then(() => {
        setIsActive(true);
        setTimeout(() => {
          setIsActive(false);
        }, 4000)
      })
      .catch(err => console.log('failed to post transaction'))
  }

  const spendPayerPoints = (e, points) => {
    e.preventDefault();
    axios.put('http://18.224.64.250:3000/points', {points})
      .then(res => {
        setSpentPayers(res.data);
        console.log(res.data);
      })
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginRight: '20rem'}}>
      <div style={{marginRight: '15rem'}}>
        <h2>Add Transaction</h2>
        <form>
          <label htmlFor='payer'>Payer</label>
          <input onChange={handleInputChange} type='text' id='payer' required></input>
          <label htmlFor='points'>Points</label>
          <input onChange={handleInputChange} type='number' id='points' required></input>
          <button onClick={(e) => performTransaction(e, payer, points)}>Add Transaction</button>
          <br></br>
          <h3 style={{display: isActive ? 'inline-block' : 'none', color: 'green', width: '50%'}}>Successfully posted {points} points with payer {payer} at {new Date().toString()}</h3>
        </form>
        <h2>Spend Points</h2>
        <form>
          <label htmlFor='spendPoints'>Points to Spend</label>
          <input onChange={handleInputChange} type='number' id='spendPoints' required></input>
          <button onClick={(e) => spendPayerPoints(e, spendPoints)}>Spend Points</button>
          <div>
            {
              spentPayers.map(payer => {
                return (
                  <div>
                    <hr></hr>
                    <h3>Payer: {payer.payer}</h3>
                    <h3>Points: {payer.points}</h3>
                  </div>
                )
              })
            }
          </div>
        </form>
      </div>
      <div style={{marginTop: '3rem'}}>
        <button onClick={(e) => getPayers(e)} style={{fontSize: '1.5rem'}}>Click to View All Payers</button>
        <div>
          {
            allPayers.map(payer => {
              return (
                <div>
                  <hr></hr>
                  <h3>Payer: {payer.payer}</h3>
                  <h3>Points: {payer.points}</h3>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App;