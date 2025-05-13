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
          ? 'border-red-300 bg-red-50/50 hover:bg-red-50'
          : zoneType === 'neutral-flag'
          ? 'border-amber-300 bg-amber-50/50 hover:bg-amber-50'
          : 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50'
      } transition-colors`}
    >
      <div className="text-center mb-2">
        <span
          className={`block font-medium ${
            zoneType === 'red-flag'
              ? 'text-red-700'
              : zoneType === 'neutral-flag'
              ? 'text-amber-700'
              : 'text-emerald-700'
          }`}
        >
          {zoneType === 'red-flag'
            ? 'Misleading Claims'
            : zoneType === 'neutral-flag'
            ? 'Unverified Claims'
            : 'Trusted Claims'}
        </span>
      </div>
      {children}
    </div>
  );
};

export default DragZone;
