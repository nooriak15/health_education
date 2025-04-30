const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          About HealthEdu
        </h1>
        <div className="prose prose-blue">
          <p className="text-lg text-gray-600 mb-6">
            HealthEdu is an interactive platform designed to help you develop critical thinking skills
            when it comes to health information online. In today's digital age, misinformation spreads
            rapidly across social media, making it crucial to distinguish fact from fiction.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We aim to empower individuals to make informed decisions about their health by teaching
            them how to identify and evaluate health claims they encounter online. Through interactive
            exercises and real-world examples, users learn to spot common red flags and understand
            what makes health information reliable.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Browse through real-world examples of health-related social media posts</li>
            <li>Engage with interactive quizzes and drag-drop exercises</li>
            <li>Learn to identify common patterns in health misinformation</li>
            <li>Get immediate feedback and explanations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 