import React, { useEffect, useState } from 'react';
import GameContainer from '../components/game/GameContainer';
import { GameProvider } from '../context/GameContext';


const GameScreen = () => {


  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>

  )
}

export default GameScreen