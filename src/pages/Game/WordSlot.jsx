// WordSlot.jsx
import React from 'react';
import WordCard from '../../components/Card';
import DefinitionDropZone from './DefinitionDropZone';

const WordSlot = ({ slotData, placedDefinitionCardDetails }) => {
  // slotData: { wordId, content, pairId, droppableId, placedDefinitionId, isCorrect }
  // placedDefinitionCardDetails: actual object of the definition card if placed, or null

  return (
    <div className='p-4 border border-dashed border-white rounded-xl flex flex-col min-h-[160px] gap-y-4'>
      {/* Display the Word Card (non-draggable for matching) */}
      <WordCard
        id={slotData.wordId}
        content={slotData.content}
        pairId={slotData.pairId}
        cardType='word'
        isMatched={slotData.isCorrect} // Reflects correctness after confirmation
        // This word card is not the primary draggable for matching in this design
      />

      {/* The Droppable Area for a Definition Card */}
      <DefinitionDropZone
        id={slotData.droppableId} // e.g., "dropzone-for-word-p1-0"
        wordPairId={slotData.pairId}
        placedDefinitionCard={placedDefinitionCardDetails}
        isCorrect={slotData.isCorrect}
      />
    </div>
  );
};

export default WordSlot;
