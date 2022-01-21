import React, { useState } from 'react';
import './styles/App.css';
import './styles/index.css';
import Cards from './components/Cards';
import Button from './components/Button';

const App = () => {

  const [showCards, setShowCards] = useState('Aves');

  const loadCards = (type) => {
    switch (type) {
      case 'Birds':
        setShowCards('Aves')
        break
      case 'Animals':
        setShowCards('Mammalia')
        break
      case 'Plants':
        setShowCards('Plantae')
        break
      default:
        setShowCards(type)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nature App</h1>

        <div className='button_container'>
          <Button type="Birds" handleClick={() => { loadCards('Birds') }} />

          <Button type="Animals" handleClick={() => { loadCards('Animals') }} />

          <Button type="Plants" handleClick={() => { loadCards('Plants') }} />
        </div>

      </header>
      <main>

        <Cards showCards={showCards}/>

      </main>
    </div>
  );
}

export default App;
