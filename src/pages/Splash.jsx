import Button3D from '../components/Button';

const Splash = ({ onStart }) => {
  return (
    <div className='w-full h-dvh flex justify-center items-center bg-gradient-to-br to-green-300 from-blue-200 '>
      <Button3D onClick={onStart} />
    </div>
  );
};

export default Splash;
