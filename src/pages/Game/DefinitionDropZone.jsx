// DefinitionDropZone.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import WordCard from '../../components/Card'; // We'll render the placed definition card here

const DefinitionDropZone = ({
  id, // Unique ID for this dropzone
  wordPairId, // The pairId of the word this zone belongs to
  placedDefinitionCard, // The actual definition card object if one is placed here
  isCorrect // Boolean or null, after confirmation
}) => {
  const { setNodeRef, isOver, active } = useDroppable({
    id: id,
    data: {
      type: 'definition-dropzone',
      accepts: ['definition'], // Only accept 'definition' type cards
      wordPairId: wordPairId
    }
  });

  const canAcceptDrop = active && active.data.current?.type === 'definition';

  let borderColor = 'border-gray-400';
  if (isOver && canAcceptDrop) {
    borderColor = 'border-blue-500';
  } else if (isCorrect === true) {
    borderColor = 'border-green-500';
  } else if (isCorrect === false) {
    borderColor = 'border-red-500';
  }

  return (
    <div
      ref={setNodeRef}
      className={`h-[100px] w-full p-2 border-2 border-dashed rounded-lg flex justify-center items-center transition-colors duration-200
                  ${borderColor}
                  ${isOver && canAcceptDrop ? 'bg-blue-100' : ''}
                  ${isCorrect === true ? 'bg-green-100' : ''}
                  ${isCorrect === false ? 'bg-red-100' : ''}
      `}>
      {placedDefinitionCard ? (
        <WordCard
          id={placedDefinitionCard.id}
          content={placedDefinitionCard.content}
          pairId={placedDefinitionCard.pairId}
          cardType={placedDefinitionCard.type} // should be 'definition'
          isMatched={isCorrect}
          className={'max-h-[100px]'} // Or a new prop like 'isConfirmedCorrect'
          // This placed card inside the dropzone is generally not draggable itself again,
          // unless we implement logic to drag it *out* of the slot.
          // For now, assume it's just visually representing the placed card.
          // To make it draggable out, it would need its own useDraggable.
        />
      ) : (
        <span className='text-gray-500 text-sm'>
          {isOver && canAcceptDrop
            ? 'Release to place definition'
            : 'Drop Definition Here'}
        </span>
      )}
    </div>
  );
};

export default DefinitionDropZone;
