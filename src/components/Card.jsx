import React, { useState } from 'react';
import { cn } from '../utils';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const WordCard = ({
  id,
  content,
  className,
  frontClassName,
  pairId,
  cardType, // 'word' or 'definition'
  isMatched,
  definition,
  frontContent,
  backContent,
  isTriggeredFlip = false,
  isDisabledDrag
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id: id,
    data: { id, pairId, type: cardType, content },
    disabled: isMatched || isDisabledDrag // Disable dragging if matched
  });

  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: id,
    data: { id, pairId, type: cardType, content },
    disabled: isMatched
  });

  // Combine refs if the same node is draggable and droppable
  const setNodeRef = (node) => {
    setDraggableNodeRef(node);
    setDroppableNodeRef(node);
  };

  const style = {
    transform: CSS.Translate.toString(transform), // Applies X, Y translation
    transition: isDragging ? 'none' : 'transform 0.2s ease-out', // Disable transition during drag for snappier feel
    zIndex: isDragging ? 100 : 'auto', // Bring to front when dragging
    boxShadow: isDragging ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '' // Enhanced shadow when dragging
  };

  // Use provided word/definition or generic front/back content
  const frontText = content || frontContent || 'Front of Card';
  const backText = definition || backContent || 'Back of Card';

  const cardClasses = `relative rounded-xl h-full shadow-2xl
    transition-all duration-700 [transform-style:preserve-3d]
    ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
    ${
      !isDragging && !isFlipped
        ? 'group-hover:[transform:rotateY(10deg)_scale(1.05)]'
        : ''
    } // Hover effect only if not dragging and not flipped
    ${isDragging ? 'scale-105' : ''} // Slightly scale up when dragging
  `;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'group min-w-[80px] w-full h-10 [perspective:1000px] cursor-pointer touch-none',
        className
      )}
      onClick={(e) => {
        e.preventDefault();

        if (
          transform &&
          (transform.x !== 0 || transform.y !== 0) &&
          isDragging
        ) {
          return;
        }
        if (!isDragging && isTriggeredFlip) {
          // Only flip if not currently in a drag operation initiated by dnd-kit
          setIsFlipped(!isFlipped);
        }
      }}>
      <div
        className={cardClasses} // Subtle hover rotation if not flipped
      >
        {/* Front Face */}
        <div
          className={cn(
            'absolute inset-0 w-full min-h-full rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 p-6 text-white [backface-visibility:hidden] flex flex-col justify-center items-center',
            frontClassName
          )}>
          <h2 className='text-md font-bold'>{frontText}</h2>
        </div>

        {/* Back Face */}
        <div className='absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-green-500 to-teal-600 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center'>
          <p className='text-md font-semibold'>{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
