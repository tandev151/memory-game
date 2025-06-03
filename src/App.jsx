import { useState } from 'react';
import './App.css';
import Button3D from './components/Button';
import WordCard from './components/Card';
import Splash from './pages/Splash';
import Game from './pages/Game';

function App() {
  const [step, setStep] = useState(0);

  const STEP_MODE = [<Splash onStart={() => setStep(1)} />, <Game />];

  return STEP_MODE[step];
}

export default App;
