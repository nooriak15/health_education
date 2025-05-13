import React from 'react';

interface DragZoneProps {
  zoneType: 'red-flag' | 'green-flag' | 'neutral-flag';
  onDrop: (item: any, zoneType: string) => void;
  children?: React.ReactNode;
}

const DragZone: React.FC<DragZoneProps> = ({ zoneType, onDrop, children }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    console.log('Dropped Item:', data); // Debugging
    if (data) {
      const item = JSON.parse(data);
      console.log('Parsed Item:', item); // Debugging
      onDrop(item, zoneType);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('Drag Over:', zoneType); // Debugging
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`flex-1 min-h-[100px] rounded-lg border-2 border-dashed p-4 flex flex-col items-center justify-start space-y-2 ${
        zoneType === 'red-flag'
          ? 'border-red-400 bg-red-50'
          : zoneType === 'neutral-flag'
          ? 'border-yellow-400 bg-yellow-50'
          : 'border-green-400 bg-green-50'
      }`}
    >
      <div className="text-center mb-2">
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
      {children}
    </div>
  );
};

export default DragZone;
