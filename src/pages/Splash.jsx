import Button3D from '../components/Button';
import { useStore } from '../useStore';

const Splash = () => {
  const { startGame } = useStore((state) => state);
  return (
    <div className='w-full h-dvh flex justify-center items-center bg-gradient-to-br to-green-300 from-blue-200 '>
      <Button3D onClick={startGame} />
    </div>
  );
};

export default Splash;
