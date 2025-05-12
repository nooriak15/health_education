import React from 'react';

const PostCard: React.FC<{ id: number; image_url: string; claims: any[] }> = ({
  id,
  image_url,
  claims,
}) => {
  return (
    <div className="post-card">
      <h2>{claims[0].text}</h2>
      <img src={image_url} alt={`Post ${id}`} className="w-full h-auto rounded-lg" />
      <div className="phrases mt-4 space-y-2">
        {claims[0].phrases.map((phrase, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => {
              const dragData = JSON.stringify({
                text: phrase.text,
                flag: phrase.flag,
                correct_feedback: phrase.correct_feedback,
                incorrect_feedback: phrase.incorrect_feedback,
              });
              console.log('Drag Data:', dragData);
              e.dataTransfer.setData('text', dragData);
            }}
            className="p-2 border rounded-md bg-gray-50 shadow hover:bg-gray-100 cursor-pointer"
          >
            {phrase.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;

