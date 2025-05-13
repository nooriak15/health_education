import React, { useState } from 'react';
import DragZone from './DragZone';

const PostCard: React.FC<{
  id: number;
  image_url: string;
  claims: any[];
  updateScore: (isCorrect: boolean) => void;
}> = ({ id, image_url, claims, updateScore }) => {
  const [droppedItems, setDroppedItems] = useState<Record<string, string>>({});
  const [showEvaluation, setShowEvaluation] = useState(false);

  const handleDrop = (item: any, zoneType: string) => {
    if (droppedItems[item.text]) return; // Prevent dragging the same item more than once

    const mappedZoneType = {
      'red-flag': 'red',
      'neutral-flag': 'neutral',
      'green-flag': 'green',
    }[zoneType];

    const correctZone = claims[0].phrases.find((phrase) => phrase.text === item.text)?.flag;

    setDroppedItems((prev) => ({ ...prev, [item.text]: mappedZoneType }));
    updateScore(mappedZoneType === correctZone); // Notify FeedPage
  };

  const evaluateResults = () => {
    setShowEvaluation(true);
  };

  const resetEvaluation = () => {
    setDroppedItems({});
    setShowEvaluation(false);
  };

  const isAllDropped = claims[0].phrases.length === Object.keys(droppedItems).length;

  const renderDroppedItems = (zoneType: string) => {
    return Object.entries(droppedItems)
      .filter(([_, zone]) => zone === zoneType)
      .map(([itemText]) => (
        <div key={itemText} className="p-2 bg-gray-200 rounded mb-2 shadow">
          {itemText}
        </div>
      ));
  };

  return (
    <div className="post-card p-4 bg-white shadow rounded-md">
      <h2>{claims[0].text}</h2>
      <img src={image_url} alt={`Post ${id}`} className="w-full h-auto rounded-lg mb-4" />
      <div className="phrases mt-4 space-y-2">
        {claims[0].phrases.map((phrase, index) => (
          <div
            key={index}
            draggable={!droppedItems[phrase.text]}
            onDragStart={(e) => {
              const dragData = JSON.stringify(phrase);
              e.dataTransfer.setData('text', dragData);
            }}
            className={`p-2 border rounded-md bg-gray-50 shadow ${
              droppedItems[phrase.text] ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {phrase.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-4">
        <div className="flex-1">
          <DragZone zoneType="red-flag" onDrop={handleDrop}>
            {renderDroppedItems('red')}
          </DragZone>
        </div>
        <div className="flex-1">
          <DragZone zoneType="neutral-flag" onDrop={handleDrop}>
            {renderDroppedItems('neutral')}
          </DragZone>
        </div>
        <div className="flex-1">
          <DragZone zoneType="green-flag" onDrop={handleDrop}>
            {renderDroppedItems('green')}
          </DragZone>
        </div>
      </div>
      {isAllDropped && !showEvaluation && (
        <button
          onClick={evaluateResults}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
        >
          Submit
        </button>
      )}
      {showEvaluation && (
        <div className="mt-4">
          <p className="font-bold">
            You got {Object.keys(droppedItems).filter(
              (itemText) =>
                droppedItems[itemText] ===
                claims[0].phrases.find((phrase) => phrase.text === itemText)?.flag
            ).length}{' '}
            out of {claims[0].phrases.length} correct.
          </p>
          {claims[0].phrases.map((phrase) => (
            <div key={phrase.text} className="mt-2">
              <p>
                <strong>{phrase.text}:</strong>{' '}
                {droppedItems[phrase.text] === phrase.flag
                  ? `Correct - ${phrase.explanation}`
                  : `Incorrect - ${phrase.explanation}`}
              </p>
            </div>
          ))}
          <button
            onClick={resetEvaluation}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;

