import React, { useState } from 'react';

const WordCard = ({ word, definition, frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Use provided word/definition or generic front/back content
  const frontText = word || frontContent || 'Front of Card';
  const backText =
    definition || backContent || 'Back of Card - More details here!';

  return (
    <div
      className='group w-80 h-52 [perspective:1000px] cursor-pointer'
      onClick={() => setIsFlipped(!isFlipped)} // Optional: flip on click
    >
      <div
        className={`relative w-full h-full rounded-xl shadow-2xl transition-all duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        } group-hover:[transform:rotateY(20deg)] group-hover:shadow-3xl`} // Subtle hover rotation if not flipped
      >
        {/* Front Face */}
        <div className='absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white [backface-visibility:hidden] flex flex-col justify-center items-center'>
          <h2 className='text-3xl font-bold mb-2'>{frontText}</h2>
          {!word && !frontContent && (
            <p className='text-sm'>(Hover for a subtle 3D effect)</p>
          )}
          {word && !isFlipped && (
            <p className='text-sm mt-4'>(Click to see definition)</p>
          )}
        </div>

        {/* Back Face */}
        <div className='absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-green-500 to-teal-600 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center'>
          <p className='text-lg'>{backText}</p>
          {definition && isFlipped && (
            <p className='text-sm mt-4'>(Click to see word)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordCard;
