import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const updateScore = (isCorrect: boolean) => {
    setTotalAttempts((prev) => prev + 1);
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

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

  const scorePercentage =
    totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;

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
    <div className="min-h-screen bg-gray-100 relative">
      {/* Floating Score Box */}
      <div className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white w-40 h-40 flex flex-col items-center justify-center rounded-full shadow-lg">
        <p className="text-xl font-bold">Score:</p>
        <p className="text-2xl font-bold">{scorePercentage}%</p>
        <p className="text-sm font-medium">{correctAnswers}/{totalAttempts}</p>
      </div>

      {/* Refresh Learning Button */}
      <div className="fixed top-20 right-4 z-50">
        <Link
          to="/learn"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
        >
          Refresh Your Learning
        </Link>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto pt-8 pb-8 space-y-8">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            image_url={post.image_url}
            claims={post.claims}
            updateScore={updateScore}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
