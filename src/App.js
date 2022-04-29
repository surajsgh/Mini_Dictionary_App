import axios from 'axios';
import React, {useState} from 'react';
import './App.css';

function App() {
  //  Setting up initial states using React hooks
  const [word, setWord] = useState('');
  const [data, setData] = useState('');
  const [error, setError] = useState(false);

  //  Input change handler function
  const wordChangeHandler = (event) => {
    setWord(event.target.value);
  }

  //  Function to fetch the meaning of the word
  const getMeaning = async () => {
    //  Handling the empty input
    if (!word) {
      alert('Your input field is empty. Please enter something!');
      return;
    }

    //  Fetching the meaning of the word
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const result = response.data[0];

      setData(result);
      setError(false);

    //  Error handler 
    } catch (error) {
      setError(true);
      setData(false);
    }

  }

  return (
    <div className='App'>
      <h1>Mini Dictionary</h1>

      {/* Taking the user input */}
      <div className='searchBox'>
        <input type='text' placeholder='Search...' onChange={wordChangeHandler}></input>
        <button onClick={getMeaning}>Search</button>
      </div>

      {/* Error Notification */}
      {error && <div className='showResults'><p>This word has no meaning.</p></div>}

      {/* Result Output */}
      {data && <div className='showResults'>
        <h2>{data.word}</h2>
        <ul>{data.meanings[0].definitions.map((def, index) => 
          <li key={index}>{def.definition}</li>
        )}</ul>
      </div>}
    </div>
  );
}

export default App;
