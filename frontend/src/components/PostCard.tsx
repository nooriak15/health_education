import React from 'react';

interface Claim {
  text: string;
  is_red_flag: boolean;
  explanation: string;
}

interface PostCardProps {
  id: number;
  image_url: string;
  claims: Claim[] | null;
  onFlagClick: (type: 'green-flag' | 'red-flag', claim: Claim) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  image_url,
  claims,
  onFlagClick,
}) => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm max-w-xl mx-auto mb-6">
      {/* Header */}
      <div className="p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="h-2.5 bg-gray-200 rounded-full w-24"></div>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={image_url}
          alt="Health claim post"
          className="w-full object-cover"
        />
      </div>

      {/* Claims */}
      <div className="p-4">
        {claims && claims.map((claim, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-800 text-lg mb-2">{claim.text}</p>
            <div className="flex gap-2">
              <button
                onClick={() => onFlagClick('green-flag', claim)}
                className="flex-1 py-2 px-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
              >
                Green Flag
              </button>
              <button
                onClick={() => onFlagClick('red-flag', claim)}
                className="flex-1 py-2 px-4 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
              >
                Red Flag
              </button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default PostCard; 