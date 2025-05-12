import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import DragZone from '../components/DragZone';

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8001/posts');
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <PostCard
              id={post.id}
              image_url={post.image_url}
              claims={post.claims}
            />
            <div className="flex space-x-4 mt-4">
              <DragZone
                zoneType="red-flag"
                onDrop={(item) => console.log('Dropped on Red Flag:', item)}
              />
              <DragZone
                zoneType="neutral-flag"
                onDrop={(item) => console.log('Dropped on Neutral Flag:', item)}
              />
              <DragZone
                zoneType="green-flag"
                onDrop={(item) => console.log('Dropped on Green Flag:', item)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
