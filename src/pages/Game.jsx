import Button3D from '../components/Button';
import { PATTERN_1 } from '../contants';
import WordCard from '../components/Card';
import Game1 from './Game';
import {
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors
} from '@dnd-kit/core';
const Game = ({ onStart }) => {
  const { setNodeRef } = useDroppable({
    id: `droppable`
  });

  const keys = Object.keys(PATTERN_1);
  const values = Object.keys(PATTERN_1);
  const entries = Object.entries(PATTERN_1);

  return (
    <DndContext onDragEnd={() => {}}>
      <div className='relative w-full h-dvh p-6 bg-gradient-to-br from-blue-300 to-green-200'>
        <Button3D label='GRADE' onClick={onStart} />

        <div className='mt-2 grid grid-cols-2 gap-4'>
          {entries.map((entry) => (
            <div
              key={`value-${entry[0]}`}
              className='p-4 border border-dashed border-white rounded-xl flex flex-col h-[160px] gap-y-4'
              ref={setNodeRef}>
              <WordCard
                key={entry[0]}
                word={entry[0]}
                definition={entry[1]}
                className=''
                isDisabledDrag={true}
                isTriggeredHandlerFlip={true}
              />
              <div></div>
            </div>
          ))}
        </div>
        <WordCard
          id={`value-${values[0]}`}
          key={`value-${values[0]}`}
          definition={values[0]}
          className=''
          isTriggeredHandlerFlip={false}
        />
      </div>
      {/* <div className='sticky bottom-0 h-[300px] rounded-t-2xl bg-white p-2 grid grid-cols-2 gap-4'>
        {values.map((value) => (
          <WordCard
            id={`value-${value}`}
            key={`value-${value}`}
            definition={value}
            className=''
            isTriggeredHandlerFlip={false}
          />
        ))}
      </div> */}
    </DndContext>
  );
};

export default Game;
