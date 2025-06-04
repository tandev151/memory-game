// DefinitionsArea.jsx
import React from 'react';
import WordCard from '../../components/Card';

const DefinitionsArea = ({ title, availableDefinitionCards }) => {
  return (
    <div className='fixed bottom-0 h-[300px] rounded-t-2xl bg-white p-5 w-full'>
      <h2 className='text-2xl font-bold text-amber-950 mb-6 text-center'>
        {title}
      </h2>
      {availableDefinitionCards.length > 0 ? (
        <div className='grid grid-cols-2 gap-3 '>
          {availableDefinitionCards.map((card) => (
            <WordCard
              key={card.id}
              id={card.id}
              content={card.content}
              pairId={card.pairId}
              cardType={card.type} // 'definition'
              isMatched={card.isCorrect === true}
              className={''} // Or however you track confirmed correct state
            />
          ))}
        </div>
      ) : (
        <p className='text-gray-400 text-center mt-4'>
          All definitions placed or area empty.
        </p>
      )}
    </div>
  );
};

export default DefinitionsArea;
