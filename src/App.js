import React from 'react';
import './styles/App.css';
import './styles/index.css';
import Cards from './components/Cards';
import Button from './components/Button';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nature App</h1>

        <div>
          <Button type="Birds" />

          <Button type="Animals" />

          <Button type="Plants" />
        </div>

      </header>
      <main>

        <Cards  />

      </main>
    </div>
  );
}

export default App;
