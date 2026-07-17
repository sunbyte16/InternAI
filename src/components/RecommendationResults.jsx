import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, DollarSign, Building, Users, 
  CheckCircle, Star, ArrowLeft, ExternalLink,
  Filter, Search, TrendingUp
} from 'lucide-react';
import { RecommendationEngine } from '../utils/recommendationEngine';
import ApplicationModal from './ApplicationModal';

const RecommendationResults = ({ studentProfile, recommendations, onBack, currentUser }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
    setIsApplicationModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsApplicationModalOpen(false);
    setSelectedInternship(null);
  };

  const filteredRecommendations = recommendations
    .filter(rec => {
      if (filter === 'all') return true;
      if (filter === 'excellent') return rec.matchScore >= 80;
      if (filter === 'good') return rec.matchScore >= 60 && rec.matchScore < 80;
      if (filter === 'fair') return rec.matchScore >= 40 && rec.matchScore < 60;
      return true;
    })
    .filter(rec => 
      searchTerm === '' || 
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'stipend') return parseInt(b.stipend.replace(/\D/g, '')) - parseInt(a.stipend.replace(/\D/g, ''));
      return 0;
    });

  const RecommendationCard = ({ recommendation, index }) => {
    const matchLevel = RecommendationEngine.getMatchLevel(recommendation.matchScore);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass-card rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{recommendation.title}</h3>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span>{recommendation.company}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{recommendation.location}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${matchLevel.bgColor} ${matchLevel.color}`}>
              <Star className="w-4 h-4 mr-1" />
              {recommendation.matchScore}% Match
            </div>
            <div className="text-sm text-gray-500 mt-1">{matchLevel.level} Fit</div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">{recommendation.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">{recommendation.stipend}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">{recommendation.type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600">{recommendation.difficulty}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">{recommendation.description}</p>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-800 mb-2">Required Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {recommendation.requiredSkills.map((skill) => (
              <span
                key={skill}
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  recommendation.matchingSkills?.includes(skill.toLowerCase())
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {recommendation.matchingSkills?.includes(skill.toLowerCase()) && (
                  <CheckCircle className="w-3 h-3 inline mr-1" />
                )}
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Match Reasons */}
        {recommendation.matchReasons && recommendation.matchReasons.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Why this matches you:</h4>
            <ul className="space-y-1">
              {recommendation.matchReasons.map((reason, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleApplyClick(recommendation)}
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <span>Apply Now</span>
          <ExternalLink className="w-4 h-4" />
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>
        
        <div className="glass-card rounded-xl p-6">
          <h1 className="text-3xl font-bold gradient-text mb-4">
            Your AI-Powered Internship Recommendations
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{recommendations.length}</div>
              <div className="text-sm text-blue-600">Total Matches</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">
                {recommendations.filter(r => r.matchScore >= 80).length}
              </div>
              <div className="text-sm text-green-600">Excellent Fits</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{studentProfile.skills.length}</div>
              <div className="text-sm text-purple-600">Your Skills</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(recommendations.reduce((sum, r) => sum + r.matchScore, 0) / recommendations.length)}%
              </div>
              <div className="text-sm text-orange-600">Avg Match</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Matches</option>
              <option value="excellent">Excellent (80%+)</option>
              <option value="good">Good (60-79%)</option>
              <option value="fair">Fair (40-59%)</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="match">Sort by Match</option>
              <option value="stipend">Sort by Stipend</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {filteredRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRecommendations.map((recommendation, index) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No matches found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={handleCloseModal}
        internship={selectedInternship}
        user={currentUser}
      />
    </div>
  );
};

export default RecommendationResults;