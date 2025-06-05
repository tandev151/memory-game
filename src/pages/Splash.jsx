import Button3D from '../components/Button';
import { IN_GAME } from '../contants';
import { useStore } from '../useStore';

const Splash = () => {
  const { updateStage } = useStore((state) => state);

  return (
    <div className='w-full h-dvh flex justify-center items-center bg-gradient-to-br to-green-300 from-blue-200 '>
      <Button3D onClick={() => updateStage(IN_GAME)} />
    </div>
  );
};

export default Splash;
