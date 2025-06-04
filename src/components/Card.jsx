import React, { useState } from 'react';
import { cn } from '../utils';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const WordCard = ({
  id,
  word,
  content,
  className,
  // This will be the word or definition text
  pairId,
  cardType, // 'word' or 'definition'
  isMatched,
  definition,
  frontContent,
  backContent,
  isOver, // Passed from useDroppable in the parent list (or its own if self-dropping)
  style: customStyle, // For external positioning like in a grid
  isTriggeredHandlerFlip = false,
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
    disabled: isMatched // Disable dragging if matched
  });

  const { setNodeRef: setDroppableNodeRef, isOver: isCurrentlyOverMe } =
    useDroppable({
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
        'group min-w-[80px] w-full h-20 [perspective:1000px] cursor-pointer',
        className
      )}
      onClick={(e) => {
        // Prevent flip if it was a drag operation.
        // dnd-kit might stop propagation for listeners, but a small drag can still trigger click.
        // A more robust solution might involve checking movement delta if dnd-kit doesn't handle this perfectly.
        if (
          transform &&
          (transform.x !== 0 || transform.y !== 0) &&
          isDragging
        ) {
          // If you want to be very precise, you could store initial click position
          // and check if it moved significantly before setIsFlipped.
          // For now, if it's marked as dragging by dnd-kit and has a transform, assume it was a drag.
          return;
        }
        if (!isDragging && isTriggeredHandlerFlip) {
          // Only flip if not currently in a drag operation initiated by dnd-kit
          setIsFlipped(!isFlipped);
        }
      }}>
      <div
        className={cardClasses} // Subtle hover rotation if not flipped
      >
        {/* Front Face */}
        <div className='absolute inset-0 w-full min-h-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white [backface-visibility:hidden] flex flex-col justify-center items-center'>
          <h2 className='text-lg font-bold'>{frontText}</h2>
          {/* {!word && !frontContent && (
            <p className='text-sm'>(Hover for a subtle 3D effect)</p>
          )} */}
          {/* {word && !isFlipped && (
            <p className='text-sm mt-4'>(Click to see definition)</p>
          )} */}
        </div>

        {/* Back Face */}
        <div className='absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-green-500 to-teal-600 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center'>
          <p className='text-md font-semibold'>{backText}</p>
          {/* {definition && isFlipped && (
            <p className='text-sm mt-4'>(Click to see word)</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default WordCard;
