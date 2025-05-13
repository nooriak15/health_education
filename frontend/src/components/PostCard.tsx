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
    <div className="post-card p-6 bg-white shadow-lg rounded-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{claims[0].text}</h2>
      <img src={image_url} alt={`Post ${id}`} className="w-full h-auto rounded-lg mb-6 shadow-md" />
      <div className="phrases mt-4 space-y-3">
        {claims[0].phrases.map((phrase, index) => (
          <div
            key={index}
            draggable={!droppedItems[phrase.text]}
            onDragStart={(e) => {
              const dragData = JSON.stringify(phrase);
              e.dataTransfer.setData('text', dragData);
            }}
            className={`p-3 border border-gray-200 rounded-md bg-white shadow-sm text-gray-700 hover:shadow-md transition-shadow ${
              droppedItems[phrase.text] ? 'opacity-50 cursor-not-allowed' : 'cursor-move hover:bg-gray-50'
            }`}
          >
            {phrase.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-4 mt-6">
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
          className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 mt-6 font-medium shadow-sm transition-colors"
        >
          Submit
        </button>
      )}
      {showEvaluation && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="font-bold text-gray-800 mb-4">
            You got {Object.keys(droppedItems).filter(
              (itemText) =>
                droppedItems[itemText] ===
                claims[0].phrases.find((phrase) => phrase.text === itemText)?.flag
            ).length}{' '}
            out of {claims[0].phrases.length} correct.
          </p>
          {claims[0].phrases.map((phrase) => (
            <div key={phrase.text} className="mt-3 p-3 bg-white rounded-md shadow-sm">
              <p className="text-gray-700">
                <strong className="text-gray-900">{phrase.text}:</strong>{' '}
                {droppedItems[phrase.text] === phrase.flag
                  ? `Correct - ${phrase.explanation}`
                  : `Incorrect - ${phrase.explanation}`}
              </p>
            </div>
          ))}
          <button
            onClick={resetEvaluation}
            className="w-full mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium shadow-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
