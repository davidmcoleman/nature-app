import React, { useState } from 'react';
import './styles/App.css';
import './styles/index.css';
import Cards from './components/Cards';
import Button from './components/Button';

const App = () => {

  const [showCards, setShowCards] = useState('Aves');

  const loadCards = (type) => {

    document.getElementById('spinner').style.visibility = 'visible';
    document.getElementById('content').style.visibility = 'hidden';

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
        <p className='title'>Near Waterman Ed Cetner.</p>

        <div className='button_container'>
          <Button type="Birds" handleClick={() => { loadCards('Birds') }} />

          <Button type="Animals" handleClick={() => { loadCards('Animals') }} />

          <Button type="Plants" handleClick={() => { loadCards('Plants') }} />
        </div>

      </header>
      <main>
        <div id='spinner'> Loading ... </div>
        <div id='content'>
          <Cards showCards={showCards} />
        </div>
      </main>
    </div>
  );
}

export default App;
