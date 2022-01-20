import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/index.css';
import axios from 'axios';
import { API_URL } from './globals';
import Cards from './components/Cards';

const App = () => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    async function getCards() {
      const response = await axios.get(`${API_URL}`)
      setCards(response.data.results)
      // console.log(response.data.results[0].default_photo.medium_url)
      console.log(response.data.results)
    }
    getCards()

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nature App</h1>
      </header>
      <main>

      <Cards cards={cards} />

      </main>
    </div>
  );
}

export default App;
