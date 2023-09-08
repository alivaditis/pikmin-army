import { useState, useEffect } from 'react';
import { pikminTypes } from '../../mockData';
import './App.css';

function App() {
  const [allPikmin, setAllPikmin] = useState([]) 
  const [pikminType, setPikminType] = useState('red') 
  const [pikminStage, setPikminStage] = useState('leaf')
  const [pikminName, setPikminName] = useState('')

  const imageSrc = pikminTypes[pikminType]['stages'][pikminStage]
  
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/pikmin")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAllPikmin(data.pikmin)
      });
  }, []);

  const sumbitPikmin = (e) => {
    e.preventDefault()
    const newPikmin = {
      name: pikminName,
      type: pikminType,
      stage: pikminStage
    }
    return fetch('http://localhost:3001/api/v1/pikmin', {
      method: 'POST',
      body: JSON.stringify(newPikmin),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setAllPikmin([...allPikmin, data])
    })

  }

  return (
    <>
    <div className="App">
      <label htmlFor='name'>Name:</label>
      <input name='name' type='text' value={pikminName} onChange={(e) => setPikminName(e.target.value)}/>
      <label htmlFor='type'>Type:</label>
      <select name='type' value={pikminType} onChange={(e) => setPikminType(e.target.value)}>
        <option value='red'>
          Red
        </option>
        <option value='blue'>
          Blue
        </option>
        <option value='yellow'>
          Yellow
        </option>
        <option value='white'>
          White
        </option>
        <option value='rock'>
          Rock
        </option>
        <option value='winged'>
          Winged
        </option>
      </select>
      <label htmlFor='stage'>Stage:</label>
      <select name='stage' value={pikminStage} onChange={(e) => setPikminStage(e.target.value)}>
        <option value='leaf'>
          Leaf
        </option>
        <option value='bud'>
          Bud
        </option>
        <option value='flower'>
          Flower
        </option>
      </select>
      <img className='pikmin-img' src={process.env.PUBLIC_URL + imageSrc}/>  
      <button onClick={sumbitPikmin}>submit</button>
    </div>
    {allPikmin && allPikmin.map(pikmin => {
    return (
      <div className='new-pikmin' key={pikmin.id}>
      <img className='pikmin-img' src={process.env.PUBLIC_URL + `${pikminTypes[pikmin.type]['stages'][pikmin.stage]}`}/>
      <p>{pikmin.name}</p>
      </div>
    )})}
    </>
  );
}

export default App;
