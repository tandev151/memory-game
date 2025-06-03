import Button3D from '../components/Button';
import { PATTERN_1 } from '../contants';
import WordCard from '../components/Card';
const Game = ({ onStart }) => {
  const keys = Object.keys(PATTERN_1);
  const values = Object.keys(PATTERN_1);
  return (
    <div className='w-full h-dvh p-6 bg-gradient-to-br from-blue-300 to-green-200'>
      <Button3D label='GRADE' onClick={onStart} />
      {keys.map((key) => (
        <WordCard key={key} word={key} />
      ))}
    </div>
  );
};

export default Game;
