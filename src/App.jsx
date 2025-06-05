import Splash from './pages/Splash';
import Game from './pages/Game';
import { useStore } from './useStore';
import { IN_GAME, START } from './contants';

function App() {
  const { stage } = useStore((state) => state);

  const stages = {
    [START]: <Splash />,
    [IN_GAME]: <Game />
  };

  return stages[stage];
}

export default App;
