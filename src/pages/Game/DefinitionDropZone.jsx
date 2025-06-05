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

  const isAbleToDrop = isOver && canAcceptDrop;
  if (isAbleToDrop) {
    borderColor = 'border-blue-500';
  } else if (isCorrect) {
    borderColor = 'border-green-500';
  } else if (isCorrect === false) {
    borderColor = 'border-red-500';
  }

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-16 p-2 border-2 border-dashed rounded-lg flex justify-center items-center transition-colors duration-200 ${borderColor}
                  ${isAbleToDrop ? 'bg-blue-100' : ''}
                  ${isCorrect ? 'bg-green-100' : ''}
                  ${isCorrect === false ? 'bg-red-100' : ''} ${
        placedDefinitionCard ? 'pb-4' : ''
      }`}>
      {placedDefinitionCard ? (
        <WordCard
          id={placedDefinitionCard.id}
          content={placedDefinitionCard.content}
          pairId={placedDefinitionCard.pairId}
          cardType={placedDefinitionCard.type} // should be 'definition'
          isMatched={isCorrect}
          frontClassName={'bg-gradient-to-br from-green-500 to-teal-600'}
        />
      ) : (
        <span className='text-gray-500 text-sm'>
          {isAbleToDrop ? 'Release to place definition' : 'Drop Here'}
        </span>
      )}
    </div>
  );
};

export default DefinitionDropZone;
