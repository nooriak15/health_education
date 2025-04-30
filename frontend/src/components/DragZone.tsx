import React from 'react';

interface DragZoneProps {
  onDrop: (item: any, zoneType: 'red-flag' | 'green-flag') => void;
}

const DragZone: React.FC<DragZoneProps> = ({ onDrop }) => {
  const handleDrop = (e: React.DragEvent, zoneType: 'red-flag' | 'green-flag') => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text'));
    onDrop(data, zoneType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div
          className="flex-1 min-h-[100px] rounded-lg border-2 border-dashed border-red-400 bg-red-50 p-4 flex items-center justify-center"
          onDrop={(e) => handleDrop(e, 'red-flag')}
          onDragOver={handleDragOver}
        >
          <div className="text-center">
            <span className="block text-red-600 font-medium">Drop Red Flags Here</span>
            <span className="text-sm text-red-500">Misleading or false claims</span>
          </div>
        </div>

        <div
          className="flex-1 min-h-[100px] rounded-lg border-2 border-dashed border-green-400 bg-green-50 p-4 flex items-center justify-center"
          onDrop={(e) => handleDrop(e, 'green-flag')}
          onDragOver={handleDragOver}
        >
          <div className="text-center">
            <span className="block text-green-600 font-medium">Drop Green Flags Here</span>
            <span className="text-sm text-green-500">Evidence-based claims</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragZone; 