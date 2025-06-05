// DefinitionsArea.jsx
import React from 'react';
import WordCard from '../../components/Card';

const DefinitionsArea = ({ title, availableDefinitionCards }) => {
  return (
    <div className='fixed bottom-0 h-[210px] rounded-t-2xl bg-white p-5 w-full max-w-full overflow-y-visible md:w-4xl'>
      <h2 className='text-2xl font-bold text-amber-950 mb-6 text-center'>
        {title}
      </h2>
      {availableDefinitionCards.length > 0 ? (
        <div className='grid grid-cols-2 gap-3 md:grid-cols-4 '>
          {availableDefinitionCards.map((card) => (
            <WordCard
              key={card.id}
              id={card.id}
              content={card.content}
              pairId={card.pairId}
              cardType={card.type}
              isMatched={card.isCorrect === true}
              className={''} // Or however you track confirmed correct state
              frontClassName={'bg-gradient-to-br from-green-500 to-teal-600'}
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
