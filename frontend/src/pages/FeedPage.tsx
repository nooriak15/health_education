import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import ScrollControls from '../components/ScrollControls';

interface Claim {
  text: string;
  is_red_flag: boolean;
  explanation: string;
}

interface Post {
  id: number;
  image_url: string;
  claims: Claim[] | null;
}

interface FeedbackMessage {
  type: 'success' | 'error';
  text: string;
}

interface PostProgress {
  postId: number;
  completed: boolean;
  score: number;
}

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [postProgress, setPostProgress] = useState<PostProgress[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8001/posts');
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleFlagClick = (type: 'green-flag' | 'red-flag', claim: Claim) => {
    const isCorrect = (type === 'green-flag' && !claim.is_red_flag) || 
                     (type === 'red-flag' && claim.is_red_flag);

    const message: FeedbackMessage = {
      type: isCorrect ? 'success' : 'error',
      text: isCorrect ? 'Correct! ' + claim.explanation : 'Incorrect. ' + claim.explanation
    };

    setFeedbackMessages(prev => [...prev, message]);
    setTimeout(() => {
      setFeedbackMessages(prev => prev.slice(1));
    }, 3000);

    // Update post progress
    const currentPost = posts[currentPostIndex];
    const currentProgress = postProgress.find(p => p.postId === currentPost.id);
    
    if (!currentProgress) {
      setPostProgress(prev => [...prev, {
        postId: currentPost.id,
        completed: true,
        score: isCorrect ? 1 : 0
      }]);
    }
  };

  const scrollToNextPost = () => {
    if (currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(prev => prev + 1);
      feedRef.current?.scrollTo({
        top: feedRef.current.scrollTop + window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToPreviousPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(prev => prev - 1);
      feedRef.current?.scrollTo({
        top: feedRef.current.scrollTop - window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Feedback Messages */}
        {feedbackMessages.length > 0 && (
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {feedbackMessages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-lg ${
                  message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}

        {/* Posts */}
        <div ref={feedRef} className="space-y-8">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              image_url={post.image_url}
              claims={post.claims}
              onFlagClick={handleFlagClick}
            />
          ))}
        </div>

        {/* Scroll Controls */}
        <ScrollControls
          onScrollUp={scrollToPreviousPost}
          onScrollDown={scrollToNextPost}
          isDownEnabled={currentPostIndex < posts.length - 1}
        />
      </div>
    </div>
  );
};

export default FeedPage; 