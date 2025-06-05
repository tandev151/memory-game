// App.jsx
import React, { useState, useEffect } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import WordSlot from './WordSlot';
import DefinitionsArea from './DefinitionsArea';
import Button from '../../components/Button'; // Assuming you have this from before

const PATTERN = {
  // Previous simpler words (can be kept or replaced)
  hello: 'bonjour',
  goodbye: 'au revoir',
  please: "s'il vous plaît",
  'thank you': 'merci',
  yes: 'oui',
  no: 'non',
  cat: 'chat',
  dog: 'chien',
  house: 'maison',
  love: 'amour'

  // More difficult words
  // "ephemeral": "éphémère",          // Lasting for a very short time
  // "ubiquitous": "omniprésent",       // Present, appearing, or found everywhere
  // "serendipity": "sérendipité",       // The occurrence of events by chance in a happy or beneficial way
  // "juxtaposition": "juxtaposition",   // The fact of two things being seen or placed close together with contrasting effect
  // "conundrum": "casse-tête",         // A confusing and difficult problem or question (can also be 'énigme')
  // "pernicious": "pernicieux",        // Having a harmful effect, especially in a gradual or subtle way
  // "eloquent": "éloquent",           // Fluent or persuasive in speaking or writing
  // "vicissitude": "vicissitude",       // A change of circumstances or fortune, typically one that is unwelcome or unpleasant
  // "ineffable": "ineffable",         // Too great or extreme to be expressed or described in words
  // "gregarious": "grégaire",         // (Of a person) fond of company; sociable
  // "idiosyncrasy": "idiosyncrasie",   // A mode of behaviour or way of thought peculiar to an individual
  // "magnanimous": "magnanime",         // Generous or forgiving, especially towards a rival or less powerful person
  // "ostensibly": "ostensiblement",    // Apparently or purportedly, but perhaps not actually
  // "pusillanimous": "pusillanime",     // Showing a lack of courage or determination; timid
  // "quixotic": "quichottesque"       // Extremely idealistic; unrealistic and impractical
};

// Helper to generate unique IDs
const generateWordId = (pairId, index) => `word-${pairId}-${index}`;
const generateDefinitionId = (pairId, index) => `def-${pairId}-${index}`;
const generateDroppableId = (pairId, index) => `dropzone-${pairId}-${index}`;

function Game() {
  const [wordSlots, setWordSlots] = useState([]);
  const [allDefinitionCards, setAllDefinitionCards] = useState([]); // Master list
  const [gamePhase, setGamePhase] = useState('placing'); // 'placing' | 'results'

  useEffect(() => {
    const newWordSlots = Object.entries(PATTERN).map(([key, value], index) => ({
      wordId: generateWordId(key, index),
      content: key,
      definition: value,
      pairId: key,
      droppableId: generateDroppableId(key, index),
      placedDefinitionId: null,
      isCorrect: null // null, true, or false
    }));
    const newDefinitionCards = Object.entries(PATTERN).map(
      ([key, value], index) => ({
        id: generateDefinitionId(key, index),
        content: value,
        pairId: key,
        type: 'definition',
        isCorrect: null
      })
    );

    setWordSlots(newWordSlots);
    setAllDefinitionCards(newDefinitionCards.sort(() => Math.random() - 0.5)); // Shuffle definitions
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 }
    })
  );

  const availableDefinitionCards = allDefinitionCards.filter(
    (defCard) =>
      !wordSlots.some((slot) => slot.placedDefinitionId === defCard.id) &&
      defCard.isCorrect === null
  );
  // In results phase, you might want to show all definitions or handle differently.
  // For now, this just shows unplaced and unconfirmed ones.

  const handleDragEnd = (event) => {
    if (gamePhase === 'results') return; // Don't allow changes after confirmation

    const { active, over } = event;

    if (!active || !over) return;

    const draggedDefinitionId = active.id; // The ID of the definition card being dragged
    const activeIsDefinition = active.data.current?.type === 'definition';
    const overIsDropZone = over.data.current?.type === 'definition-dropzone';

    if (activeIsDefinition && overIsDropZone) {
      const targetSlotDroppableId = over.id; // The droppableId of the target WordSlot's dropzone

      setWordSlots((prevSlots) => {
        // Find the state of the target slot before any changes
        const targetSlotInitialState = prevSlots.find(
          (s) => s.droppableId === targetSlotDroppableId
        );
        if (!targetSlotInitialState) return prevSlots; // Should not happen normally

        const definitionInitiallyInTargetSlot =
          targetSlotInitialState.placedDefinitionId;

        // If the dragged item is dropped back into the same slot it was already in (or target already has it), no change.
        if (definitionInitiallyInTargetSlot === draggedDefinitionId) {
          return prevSlots;
        }

        // Find the state of the source slot (where the dragged definition came from, if any)
        const sourceSlotInitialState = prevSlots.find(
          (s) => s.placedDefinitionId === draggedDefinitionId
        );
        const sourceSlotDroppableId = sourceSlotInitialState
          ? sourceSlotInitialState.droppableId
          : null;

        // If dragging from one slot to itself (which shouldn't really happen if over.id is different, but as a safe check)
        if (sourceSlotDroppableId === targetSlotDroppableId) {
          return prevSlots;
        }

        return prevSlots.map((slot) => {
          // 1. Is this the target slot? It gets the dragged definition.
          if (slot.droppableId === targetSlotDroppableId) {
            return { ...slot, placedDefinitionId: draggedDefinitionId };
          }

          // 2. Is this the source slot (where the dragged definition originated)?
          //    It gets the definition that was initially in the target slot (the swap part).
          if (slot.droppableId === sourceSlotDroppableId) {
            return {
              ...slot,
              placedDefinitionId: definitionInitiallyInTargetSlot
            };
          }

          // Otherwise, the slot is not directly involved in this specific swap
          return slot;
        });
      });
    }
  };

  const handleConfirmResults = () => {
    setGamePhase('results');
    setWordSlots((prevSlots) =>
      prevSlots.map((slot) => {
        if (!slot.placedDefinitionId) {
          return { ...slot, isCorrect: false }; // Or null for 'unattempted'
        }
        const placedDef = allDefinitionCards.find(
          (def) => def.id === slot.placedDefinitionId
        );
        const isMatch = placedDef && placedDef.pairId === slot.pairId;
        return { ...slot, isCorrect: isMatch };
      })
    );
    // Also update isCorrect on allDefinitionCards if you want them to reflect this state
    setAllDefinitionCards((prevDefs) =>
      prevDefs.map((def) => {
        const slotHoldingThisDef = wordSlots.find(
          (s) => s.placedDefinitionId === def.id
        );
        if (slotHoldingThisDef) {
          return {
            ...def,
            isCorrect: slotHoldingThisDef.pairId === def.pairId
          };
        }
        return def; // Or mark unplaced definitions as incorrect/null
      })
    );
  };

  const resetGame = () => {
    const newWordSlots = initialWordPairs.map((pair, index) => ({
      wordId: generateWordId(pair.pairId, index),
      content: pair.word,
      pairId: pair.pairId,
      droppableId: generateDroppableId(pair.pairId, index),
      placedDefinitionId: null,
      isCorrect: null
    }));

    const newDefinitionCards = initialWordPairs.map((pair, index) => ({
      id: generateDefinitionId(pair.pairId, index),
      content: pair.definition,
      pairId: pair.pairId,
      type: 'definition',
      isCorrect: null
    }));
    setWordSlots(newWordSlots);
    setAllDefinitionCards(newDefinitionCards.sort(() => Math.random() - 0.5));
    setGamePhase('placing');
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className='min-h-screen   bg-gray-800 text-white flex flex-col items-center relative w-full m-auto h-dvh bg-gradient-to-br from-blue-300 to-green-200 p-4 md:p-10 md:w-4xl'>
        <header className='mb-10 text-center'>
          <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
            Word Slot Challenge
          </h1>
          <p className='text-lg text-gray-400 mt-2'>
            Drag definitions to the slots below each word.
          </p>
        </header>

        <div className='flex flex-col items-center space-y-4 h-[100px]'>
          {gamePhase === 'placing' && (
            <Button label='GRADE' onClick={handleConfirmResults} />
          )}
          {gamePhase === 'results' && (
            <>
              <Button
                label='PLAY AGAIN'
                onClick={resetGame}
                className=' text-lg bg-gradient-to-br from-pink-500 to-orange-500 before:bg-orange-700 focus:ring-pink-300'
              />
              <p className='text-xl'>Results are in! Check the borders.</p>
            </>
          )}
        </div>

        <div className='w-full max-w-6xl mb-8'>
          <h2 className='text-2xl font-semibold text-center mb-4'>
            Words & Slots
          </h2>
          <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[400px] overflow-y-auto'>
            {wordSlots.map((slot) => {
              const placedDefDetails = slot.placedDefinitionId
                ? allDefinitionCards.find(
                    (def) => def.id === slot.placedDefinitionId
                  )
                : null;
              return (
                <WordSlot
                  key={slot.wordId}
                  slotData={slot}
                  placedDefinitionCardDetails={placedDefDetails}
                />
              );
            })}
          </div>
        </div>

        <DefinitionsArea
          title='Available Definitions'
          availableDefinitionCards={availableDefinitionCards}
        />
      </div>
    </DndContext>
  );
}

export default Game;
