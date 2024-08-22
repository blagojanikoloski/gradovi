import './App.css';
import Scene from './Scene';
import Leaderboard from './Leaderboard';
import Chat from './Chat';
import React from 'react';


function App() {
  return (
    <div className="App">
      <Scene />
      <Leaderboard />
      <Chat />
    </div>
  );
}

export default App;
