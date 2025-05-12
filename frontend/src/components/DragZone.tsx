import React, { useState } from 'react';

interface DragZoneProps {
  zoneType: 'red-flag' | 'green-flag' | 'neutral-flag';
  onDrop: (item: any, zoneType: string) => void;
}

const DragZone: React.FC<DragZoneProps> = ({ zoneType, onDrop }) => {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    let item;

    try {
      item = JSON.parse(data); // Parse the dragged item's data
    } catch (error) {
      console.error('Error parsing drag data:', error);
      alert('Error: Invalid drag data.');
      return;
    }

    console.log('Dragged Item:', item);
    console.log('Zone Type:', zoneType);

    if (!item || !item.flag) {
      alert('Error: Dragged item is missing a flag.');
      return;
    }

    // Compare the dragged item's flag with the zone's type
    const isCorrect = item.flag === zoneType;

    // Construct feedback message
    const feedbackMessage = isCorrect
      ? `Correct! "${item.text}" belongs in ${zoneType.replace('-', ' ')}. Explanation: ${item.correct_feedback}`
      : `Incorrect! "${item.text}" should be in ${item.flag.replace('-', ' ')}. Explanation: ${item.incorrect_feedback}`;

    alert(feedbackMessage); // Display the feedback as a popup

    // Notify parent component
    onDrop(item, zoneType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`flex-1 min-h-[100px] rounded-lg border-2 border-dashed p-4 flex items-center justify-center ${
        zoneType === 'red-flag'
          ? 'border-red-400 bg-red-50'
          : zoneType === 'neutral-flag'
          ? 'border-yellow-400 bg-yellow-50'
          : 'border-green-400 bg-green-50'
      }`}
    >
      <div className="text-center">
        <span
          className={`block font-medium ${
            zoneType === 'red-flag'
              ? 'text-red-600'
              : zoneType === 'neutral-flag'
              ? 'text-yellow-600'
              : 'text-green-600'
          }`}
        >
          {zoneType === 'red-flag'
            ? 'Drop Red Flags Here'
            : zoneType === 'neutral-flag'
            ? 'Drop Neutral Flags Here'
            : 'Drop Green Flags Here'}
        </span>
      </div>
    </div>
  );
};

export default DragZone;
