import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import AboutPage from './pages/AboutPage';
import LearnPage from './pages/LearnPage';


function App() {
  const onDragEnd = () => {
    // This is a no-op handler since the actual drag handling is done in PostCard
  };

  return (
    <Router>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
        </div>
      </DragDropContext>
    </Router>
  );
}

export default App;
