import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Code, Heart, MapPin, ChevronRight } from 'lucide-react';
import { skillsDatabase, interestsDatabase } from '../data/internships';

const StudentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    academicYear: '',
    skills: [],
    interests: [],
    preferredType: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.academicYear !== '';
      case 2: return formData.skills.length > 0;
      case 3: return formData.interests.length > 0;
      case 4: return formData.preferredType !== '';
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What's your academic year?</h2>
              <p className="text-gray-600">This helps our AI match you with appropriate internship levels</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {['2nd', '3rd', '4th'].map((year) => (
                <motion.button
                  key={year}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, academicYear: year }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.academicYear === year
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{year} Year Student</span>
                    {formData.academicYear === year && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Code className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What are your skills?</h2>
              <p className="text-gray-600">Select all technologies and skills - our AI will analyze them for perfect matches</p>
            </div>
            
            <div className="flex flex-wrap gap-3 max-h-80 overflow-y-auto">
              {skillsDatabase.map((skill) => (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSkillToggle(skill)}
                  className={`skill-tag ${
                    formData.skills.includes(skill)
                      ? 'bg-blue-500 text-white'
                      : ''
                  }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
            
            {formData.skills.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Selected {formData.skills.length} skills: {formData.skills.slice(0, 3).join(', ')}
                  {formData.skills.length > 3 && ` +${formData.skills.length - 3} more`}
                </p>
              </div>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What interests you?</h2>
              <p className="text-gray-600">Choose the areas you're passionate about - our AI will find matching opportunities</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interestsDatabase.map((interest) => (
                <motion.button
                  key={interest}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInterestToggle(interest)}
                  className={`interest-tag p-4 text-left ${
                    formData.interests.includes(interest)
                      ? 'bg-purple-500 text-white'
                      : ''
                  }`}
                >
                  {interest}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <MapPin className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Work preference?</h2>
              <p className="text-gray-600">How would you like to work during your internship?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: 'Remote', desc: 'Work from anywhere', icon: '🏠' },
                { value: 'On-site', desc: 'Work from office', icon: '🏢' },
                { value: 'Hybrid', desc: 'Mix of remote and office', icon: '🔄' },
                { value: 'Any', desc: 'Open to all options', icon: '✨' }
              ].map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, preferredType: option.value }))}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.preferredType === option.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{option.value}</div>
                        <div className="text-sm opacity-70">{option.desc}</div>
                      </div>
                    </div>
                    {formData.preferredType === option.value && (
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="glass-card rounded-2xl p-8 min-h-[500px]">
        {renderStep()}
        
        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            Back
          </button>
          
          <motion.button
            whileHover={{ scale: canProceed() ? 1.05 : 1 }}
            whileTap={{ scale: canProceed() ? 0.95 : 1 }}
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all ${
              canProceed()
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === totalSteps ? 'Get AI Recommendations' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;