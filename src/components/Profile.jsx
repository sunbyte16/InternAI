import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Camera, Save, Edit3, GraduationCap, 
  Code, Heart, Upload, FileText, Building,
  Calendar, Award, MapPin, Briefcase, Clock,
  CheckCircle, XCircle, AlertCircle, Eye
} from 'lucide-react';
import { skillsDatabase, interestsDatabase } from '../data/internships';
import { ApplicationService } from '../utils/applicationService';

const Profile = ({ user, onUpdateProfile, onSignOut, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Personal Info
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    profileImage: user?.profileImage || null,
    
    // College Details
    collegeName: user?.collegeName || '',
    degree: user?.degree || '',
    branch: user?.branch || '',
    currentYear: user?.currentYear || '',
    passedOutYear: user?.passedOutYear || '',
    
    // Skills & Interests
    skills: user?.skills || [],
    interests: user?.interests || [],
    
    // Resume
    resume: user?.resume || null,
    
    // Certifications
    certifications: user?.certifications || []
  });

  const handleInputChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSkillToggle = (skill) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSave = () => {
    onUpdateProfile(profileData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'college', label: 'College Details', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Interests', icon: Code },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'applications', label: 'Applications', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">InternAI Profile</h1>
                  <p className="text-blue-200">AI-Based Internship Recommendation Engine</p>
                </div>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <span>Find Internships</span>
              </button>
              <button
                onClick={onSignOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    {profileData.profileImage ? (
                      <img
                        src={profileData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h3 className="text-white font-semibold mt-3">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-blue-200 text-sm">{profileData.email}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'text-blue-200 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Edit Toggle */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-200 font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-blue-200 font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-blue-200 font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* College Details Tab */}
              {activeTab === 'college' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">College Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-blue-200 font-medium mb-2">College Name</label>
                      <input
                        type="text"
                        name="collegeName"
                        value={profileData.collegeName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your college name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-blue-200 font-medium mb-2">Degree</label>
                      <select
                        name="degree"
                        value={profileData.degree}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <option value="">Select Degree</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="B.E">B.E</option>
                        <option value="BCA">BCA</option>
                        <option value="B.Sc">B.Sc</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="MCA">MCA</option>
                        <option value="M.Sc">M.Sc</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-blue-200 font-medium mb-2">Branch</label>
                      <input
                        type="text"
                        name="branch"
                        value={profileData.branch}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="e.g., Computer Science"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-blue-200 font-medium mb-2">Current Year</label>
                      <select
                        name="currentYear"
                        value={profileData.currentYear}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <option value="">Select Year</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-blue-200 font-medium mb-2">Expected Graduation Year</label>
                      <input
                        type="number"
                        name="passedOutYear"
                        value={profileData.passedOutYear}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="2025"
                        min="2024"
                        max="2030"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Skills & Interests Tab */}
              {activeTab === 'skills' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Skills & Interests</h2>
                  
                  {/* Skills Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
                    <div className="flex flex-wrap gap-3 max-h-60 overflow-y-auto">
                      {skillsDatabase.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => isEditing && handleSkillToggle(skill)}
                          disabled={!isEditing}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                            profileData.skills.includes(skill)
                              ? 'bg-blue-500 text-white'
                              : 'bg-white/10 text-blue-200 hover:bg-white/20'
                          } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    {profileData.skills.length > 0 && (
                      <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
                        <p className="text-blue-200 text-sm">
                          Selected {profileData.skills.length} skills: {profileData.skills.slice(0, 5).join(', ')}
                          {profileData.skills.length > 5 && ` +${profileData.skills.length - 5} more`}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Interests Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Areas of Interest</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {interestsDatabase.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => isEditing && handleInterestToggle(interest)}
                          disabled={!isEditing}
                          className={`p-3 rounded-lg text-left transition-all ${
                            profileData.interests.includes(interest)
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-blue-200 hover:bg-white/20'
                          } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Applications Tab */}
              {activeTab === 'applications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Application Status</h2>
                    <button
                      onClick={() => window.location.reload()}
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1"
                    >
                      <span>🔄</span>
                      <span>Refresh</span>
                    </button>
                  </div>
                  
                  {(() => {
                    const applications = ApplicationService.getUserApplications();
                    const stats = ApplicationService.getApplicationStats();
                    
                    return (
                      <>
                        {/* Application Statistics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-blue-500/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-blue-300">{stats.total}</div>
                            <div className="text-blue-200 text-sm">Total Applied</div>
                          </div>
                          <div className="bg-yellow-500/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-300">{stats.processing}</div>
                            <div className="text-yellow-200 text-sm">In Progress</div>
                          </div>
                          <div className="bg-green-500/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-300">{stats.accepted}</div>
                            <div className="text-green-200 text-sm">Accepted</div>
                          </div>
                          <div className="bg-red-500/20 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-red-300">{stats.rejected}</div>
                            <div className="text-red-200 text-sm">Rejected</div>
                          </div>
                        </div>

                        {/* Applications List */}
                        {applications.length > 0 ? (
                          <div className="space-y-4">
                            {applications.map((application) => {
                              const statusConfig = ApplicationService.getStatusConfig(application.status);
                              return (
                                <div key={application.id} className="bg-white/10 rounded-lg p-6 border border-white/20">
                                  <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                      <h3 className="text-lg font-semibold text-white mb-1">
                                        {application.internshipTitle}
                                      </h3>
                                      <div className="flex items-center space-x-4 text-blue-200 text-sm">
                                        <div className="flex items-center space-x-1">
                                          <Building className="w-4 h-4" />
                                          <span>{application.company}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <MapPin className="w-4 h-4" />
                                          <span>{application.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Calendar className="w-4 h-4" />
                                          <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="text-right">
                                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                                        <span className="mr-2">{statusConfig.icon}</span>
                                        {statusConfig.label}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="w-4 h-4 text-blue-400" />
                                      <span className="text-blue-200 text-sm">{application.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-green-400">💰</span>
                                      <span className="text-blue-200 text-sm">{application.stipend}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-purple-400">📍</span>
                                      <span className="text-blue-200 text-sm">{application.type}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-orange-400">🔄</span>
                                      <span className="text-blue-200 text-sm">
                                        Updated: {new Date(application.lastUpdated).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                                    <p className="text-blue-200 text-sm">{statusConfig.description}</p>
                                  </div>

                                  {/* Status History */}
                                  <div className="border-t border-white/10 pt-4">
                                    <h4 className="text-white font-medium mb-3">Status History</h4>
                                    <div className="space-y-2">
                                      {application.statusHistory.slice(-3).reverse().map((history, index) => {
                                        const historyConfig = ApplicationService.getStatusConfig(history.status);
                                        return (
                                          <div key={index} className="flex items-center space-x-3 text-sm">
                                            <span className="text-lg">{historyConfig.icon}</span>
                                            <div className="flex-1">
                                              <span className={`font-medium ${historyConfig.color}`}>
                                                {historyConfig.label}
                                              </span>
                                              <span className="text-blue-300 ml-2">{history.note}</span>
                                            </div>
                                            <span className="text-blue-400 text-xs">
                                              {new Date(history.date).toLocaleDateString()}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex justify-end space-x-2 mt-4">
                                    {application.status === ApplicationService.STATUS.PENDING && (
                                      <button
                                        onClick={() => ApplicationService.withdrawApplication(application.id)}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                      >
                                        Withdraw
                                      </button>
                                    )}
                                    <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-1">
                                      <Eye className="w-4 h-4" />
                                      <span>View Details</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <Briefcase className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-medium text-white mb-2">No Applications Yet</h3>
                            <p className="text-blue-200 mb-6">
                              Start applying for internships to track your application status here
                            </p>
                            <button
                              onClick={onBackToHome}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                              Find Internships
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </motion.div>
              )}

              {/* Certifications Tab */}
              {activeTab === 'certifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Certifications & Achievements</h2>
                  
                  {profileData.certifications && profileData.certifications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profileData.certifications.map((cert, index) => (
                        <div key={index} className="bg-white/10 rounded-lg p-6 border border-white/20">
                          <div className="flex items-start justify-between mb-4">
                            <Award className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                            <span className="text-xs text-blue-200 bg-blue-500/20 px-2 py-1 rounded">
                              {cert.type}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">{cert.title}</h3>
                          <p className="text-blue-200 text-sm mb-2">{cert.company}</p>
                          <p className="text-blue-300 text-sm mb-3">{cert.description}</p>
                          <div className="flex justify-between items-center text-xs text-blue-200">
                            <span>Completed: {cert.completedDate}</span>
                            <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">
                              {cert.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Award className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-medium text-white mb-2">No Certifications Yet</h3>
                      <p className="text-blue-200 mb-6">
                        Complete internships to earn certificates and build your professional portfolio
                      </p>
                      <div className="bg-blue-500/20 rounded-lg p-4 text-left max-w-md mx-auto">
                        <h4 className="text-blue-200 font-medium mb-2">How to earn certificates:</h4>
                        <ul className="text-blue-300 text-sm space-y-1">
                          <li>• Apply for internships through InternAI</li>
                          <li>• Successfully complete your internship program</li>
                          <li>• Receive digital certificates automatically</li>
                          <li>• Showcase your achievements to future employers</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Resume Tab */}
              {activeTab === 'resume' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Resume</h2>
                  
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
                    {profileData.resume ? (
                      <div className="space-y-4">
                        <FileText className="w-16 h-16 text-blue-400 mx-auto" />
                        <div>
                          <p className="text-white font-medium">{profileData.resume.name}</p>
                          <p className="text-blue-200 text-sm">
                            {(profileData.resume.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        {isEditing && (
                          <label className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                            <Upload className="w-4 h-4" />
                            <span>Replace Resume</span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-16 h-16 text-blue-400 mx-auto" />
                        <div>
                          <p className="text-white font-medium">Upload your resume</p>
                          <p className="text-blue-200 text-sm">PDF, DOC, or DOCX files only</p>
                        </div>
                        {isEditing && (
                          <label className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                            <Upload className="w-4 h-4" />
                            <span>Choose File</span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Save Button */}
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-6 border-t border-white/20"
                >
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;