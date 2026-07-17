import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, User, Mail, Phone, MapPin, 
  FileText, Calendar, Building, GraduationCap,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { ApplicationService } from '../utils/applicationService';

const ApplicationModal = ({ isOpen, onClose, internship, user }) => {
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    email: user?.email || '',
    phone: '',
    address: '',
    
    // Academic Details
    collegeName: user?.collegeName || '',
    degree: user?.degree || '',
    branch: user?.branch || '',
    currentYear: user?.currentYear || '',
    cgpa: '',
    
    // Experience & Skills
    previousExperience: '',
    relevantProjects: '',
    whyInterested: '',
    availability: '',
    expectedStipend: '',
    
    // Additional
    portfolioLink: '',
    linkedinProfile: '',
    additionalInfo: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit application using ApplicationService
      const application = ApplicationService.submitApplication(internship, formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Auto close after 4 seconds
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setCurrentStep(1);
      }, 4000);
      
    } catch (error) {
      console.error('Application submission error:', error);
      setIsSubmitting(false);
      alert('Failed to submit application. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">Apply for Internship</h2>
                <h3 className="text-xl opacity-90">{internship?.title}</h3>
                <p className="opacity-75">{internship?.company} • {internship?.location}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Step {currentStep} of 3</span>
                <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal & Contact Details */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <User className="w-6 h-6 text-blue-500" />
                      <h3 className="text-xl font-semibold">Personal & Contact Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          placeholder="City, State, Country"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Academic Details */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <GraduationCap className="w-6 h-6 text-blue-500" />
                      <h3 className="text-xl font-semibold">Academic Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          College/University Name *
                        </label>
                        <input
                          type="text"
                          name="collegeName"
                          value={formData.collegeName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Degree *
                        </label>
                        <input
                          type="text"
                          name="degree"
                          value={formData.degree}
                          onChange={handleInputChange}
                          required
                          placeholder="B.Tech, B.E, BCA, etc."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Branch/Major *
                        </label>
                        <input
                          type="text"
                          name="branch"
                          value={formData.branch}
                          onChange={handleInputChange}
                          required
                          placeholder="Computer Science, IT, etc."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Year *
                        </label>
                        <select
                          name="currentYear"
                          value={formData.currentYear}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Year</option>
                          <option value="1st">1st Year</option>
                          <option value="2nd">2nd Year</option>
                          <option value="3rd">3rd Year</option>
                          <option value="4th">4th Year</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CGPA/Percentage *
                        </label>
                        <input
                          type="text"
                          name="cgpa"
                          value={formData.cgpa}
                          onChange={handleInputChange}
                          required
                          placeholder="8.5 CGPA or 85%"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Experience & Additional Info */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <FileText className="w-6 h-6 text-blue-500" />
                      <h3 className="text-xl font-semibold">Experience & Additional Information</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Previous Experience/Internships
                        </label>
                        <textarea
                          name="previousExperience"
                          value={formData.previousExperience}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Describe any previous internships, part-time jobs, or relevant experience..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Relevant Projects *
                        </label>
                        <textarea
                          name="relevantProjects"
                          value={formData.relevantProjects}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          placeholder="Describe 2-3 relevant projects you've worked on..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Why are you interested in this internship? *
                        </label>
                        <textarea
                          name="whyInterested"
                          value={formData.whyInterested}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          placeholder="Explain your motivation and what you hope to learn..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Availability *
                          </label>
                          <input
                            type="text"
                            name="availability"
                            value={formData.availability}
                            onChange={handleInputChange}
                            required
                            placeholder="Immediately / After exams / etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Stipend
                          </label>
                          <input
                            type="text"
                            name="expectedStipend"
                            value={formData.expectedStipend}
                            onChange={handleInputChange}
                            placeholder="$800/month or Negotiable"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Portfolio/GitHub Link
                          </label>
                          <input
                            type="url"
                            name="portfolioLink"
                            value={formData.portfolioLink}
                            onChange={handleInputChange}
                            placeholder="https://github.com/username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            LinkedIn Profile
                          </label>
                          <input
                            type="url"
                            name="linkedinProfile"
                            value={formData.linkedinProfile}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Information
                        </label>
                        <textarea
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                          rows={2}
                          placeholder="Any additional information you'd like to share..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={currentStep === 1 ? onClose : handlePrevious}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    {currentStep === 1 ? 'Cancel' : 'Previous'}
                  </button>
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Application</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              /* Success Message */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Your application for <strong>{internship?.title}</strong> at <strong>{internship?.company}</strong> has been successfully submitted.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 text-left max-w-md mx-auto">
                  <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Application status will be tracked in your profile</li>
                    <li>• You'll receive updates as status changes</li>
                    <li>• Check "Applications" tab to monitor progress</li>
                    <li>• Company will contact you within 3-5 business days</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ApplicationModal;