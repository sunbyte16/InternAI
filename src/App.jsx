import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Target, Users, Award, User as UserIcon, Github, Linkedin, Globe } from 'lucide-react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import StudentForm from './components/StudentForm';
import RecommendationResults from './components/RecommendationResults';
import ChatBot from './components/ChatBot';
import { internshipDatabase } from './data/internships';
import { RecommendationEngine } from './utils/recommendationEngine';
import { AuthService } from './utils/authService';
import { DemoData } from './utils/demoData';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [authView, setAuthView] = useState('signin'); // 'signin' or 'signup'
  const [currentUser, setCurrentUser] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Check for existing user on app load
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setCurrentView('home');
      // Initialize demo data for existing users
      DemoData.initializeDemoData();
    } else {
      setCurrentView('auth');
    }
  }, []);

  const handleSignUp = (userData) => {
    try {
      const newUser = AuthService.signUp(userData);
      setCurrentUser(newUser);
      setCurrentView('home');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = (credentials) => {
    try {
      const user = AuthService.signIn(credentials);
      setCurrentUser(user);
      setCurrentView('home');
      // Initialize demo data for returning users
      setTimeout(() => DemoData.initializeDemoData(), 1000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignOut = () => {
    AuthService.signOut();
    setCurrentUser(null);
    setCurrentView('auth');
    setStudentProfile(null);
    setRecommendations([]);
  };

  const handleUpdateProfile = (profileData) => {
    try {
      const updatedUser = AuthService.updateProfile(profileData);
      setCurrentUser(updatedUser);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFormSubmit = (profile) => {
    setStudentProfile(profile);
    const recs = RecommendationEngine.getRecommendations(profile, internshipDatabase);
    setRecommendations(recs);
    setCurrentView('results');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  const handleStartOver = () => {
    setCurrentView('home');
    setStudentProfile(null);
    setRecommendations([]);
  };

  const LandingPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            InternAI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-Based Internship Recommendation Engine - Find your perfect internship match with 
            advanced artificial intelligence tailored to your skills, interests, and career goals.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentView('form')}
            className="btn-primary text-lg px-8 py-4"
          >
            Find My Perfect Internship
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="glass-card rounded-xl p-6 text-center">
            <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              Our AI analyzes your skills and interests to find the most relevant internship opportunities
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 text-center">
            <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Results</h3>
            <p className="text-gray-600">
              Get recommendations tailored to your academic year, preferred work style, and career goals
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 text-center">
            <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Opportunities</h3>
            <p className="text-gray-600">
              Access curated internships from top companies with competitive stipends and learning opportunities
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Internship Opportunities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Match Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10k+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.9★</div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      {currentView !== 'auth' && currentView !== 'profile' && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={handleStartOver}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">InternAI</span>
              </motion.div>
              
              <div className="flex items-center space-x-4">
                {currentUser && (
                  <>
                    <button
                      onClick={() => setCurrentView('profile')}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className={currentView !== 'auth' && currentView !== 'profile' ? 'pt-20 pb-12 px-6' : ''}>
        <AnimatePresence mode="wait">
          {/* Authentication Views */}
          {currentView === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {authView === 'signup' ? (
                <SignUp
                  onSignUp={handleSignUp}
                  onSwitchToSignIn={() => setAuthView('signin')}
                />
              ) : (
                <SignIn
                  onSignIn={handleSignIn}
                  onSwitchToSignUp={() => setAuthView('signup')}
                />
              )}
            </motion.div>
          )}

          {/* Profile View */}
          {currentView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Profile
                user={currentUser}
                onUpdateProfile={handleUpdateProfile}
                onSignOut={handleSignOut}
                onBackToHome={() => setCurrentView('home')}
              />
            </motion.div>
          )}
          
          {/* Home/Landing View */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage />
            </motion.div>
          )}
          
          {/* Form View */}
          {currentView === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold gradient-text mb-4">
                  Tell us about yourself
                </h1>
                <p className="text-gray-600">
                  Help our AI understand your profile to find the perfect internship matches
                </p>
              </div>
              <StudentForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}
          
          {/* Results View */}
          {currentView === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <RecommendationResults
                studentProfile={studentProfile}
                recommendations={recommendations}
                onBack={handleBackToForm}
                currentUser={currentUser}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {currentView !== 'auth' && currentView !== 'profile' && (
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-xl font-bold">InternAI</span>
            </div>
            <p className="text-gray-400 mb-6">
              AI-Based Internship Recommendation Engine - Empowering students with intelligent internship matching
            </p>
            
            {/* Social Media Links */}
            <div className="flex justify-center items-center space-x-6 mb-4">
              <motion.a
                href="https://github.com/sunbyte16"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/sunil-kumar-bb88bb31a/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </motion.a>
              
              <motion.a
                href="https://lively-dodol-cc397c.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                <Globe className="w-5 h-5" />
                <span className="hidden sm:inline">Portfolio</span>
              </motion.a>
            </div>
            
            {/* Developer Credit */}
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-500">
                Created By <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold">𝕊𝕦𝕟𝕚𝕝 𝕊𝕙𝕒𝕣𝕞𝕒</span> ❤️
              </p>
              <p className="text-xs text-gray-600 mt-1">
                © 2k25 InternAI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}

      {/* ChatBot - Only show when user is logged in */}
      {currentUser && <ChatBot user={currentUser} />}
    </div>
  );
}

export default App;