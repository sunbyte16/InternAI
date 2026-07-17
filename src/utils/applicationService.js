import { AuthService } from './authService';

export class ApplicationService {
  // Application status types
  static STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing', 
    UNDER_REVIEW: 'under_review',
    INTERVIEW_SCHEDULED: 'interview_scheduled',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    WITHDRAWN: 'withdrawn'
  };

  // Status display configurations
  static getStatusConfig(status) {
    const configs = {
      [this.STATUS.PENDING]: {
        label: 'Pending',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        icon: '⏳',
        description: 'Application submitted, waiting for review'
      },
      [this.STATUS.PROCESSING]: {
        label: 'Processing',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        icon: '⚙️',
        description: 'Application is being processed by HR team'
      },
      [this.STATUS.UNDER_REVIEW]: {
        label: 'Under Review',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        icon: '👀',
        description: 'Technical team is reviewing your application'
      },
      [this.STATUS.INTERVIEW_SCHEDULED]: {
        label: 'Interview Scheduled',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
        icon: '📅',
        description: 'Interview has been scheduled, check your email'
      },
      [this.STATUS.ACCEPTED]: {
        label: 'Accepted',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: '✅',
        description: 'Congratulations! Your application has been accepted'
      },
      [this.STATUS.REJECTED]: {
        label: 'Rejected',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: '❌',
        description: 'Application was not successful this time'
      },
      [this.STATUS.WITHDRAWN]: {
        label: 'Withdrawn',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        icon: '🚫',
        description: 'Application was withdrawn by applicant'
      }
    };
    
    return configs[status] || configs[this.STATUS.PENDING];
  }

  // Submit a new application
  static submitApplication(internshipData, applicationData) {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    const newApplication = {
      id: Date.now().toString(),
      internshipId: internshipData.id,
      internshipTitle: internshipData.title,
      company: internshipData.company,
      location: internshipData.location,
      type: internshipData.type,
      stipend: internshipData.stipend,
      duration: internshipData.duration,
      appliedDate: new Date().toISOString(),
      status: this.STATUS.PENDING,
      statusHistory: [
        {
          status: this.STATUS.PENDING,
          date: new Date().toISOString(),
          note: 'Application submitted successfully'
        }
      ],
      applicationData: applicationData,
      lastUpdated: new Date().toISOString()
    };

    // Get current applications and add the new one
    const currentApplications = currentUser.applications || [];
    const updatedApplications = [...currentApplications, newApplication];

    // Update user profile with new application
    AuthService.updateProfile({ applications: updatedApplications });

    // Simulate status progression (for demo purposes)
    this.simulateStatusProgression(newApplication.id);

    return newApplication;
  }

  // Get all applications for current user
  static getUserApplications() {
    const currentUser = AuthService.getCurrentUser();
    return currentUser?.applications || [];
  }

  // Update application status
  static updateApplicationStatus(applicationId, newStatus, note = '') {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    const applications = currentUser.applications || [];
    const applicationIndex = applications.findIndex(app => app.id === applicationId);
    
    if (applicationIndex === -1) {
      throw new Error('Application not found');
    }

    // Update the application
    const updatedApplication = {
      ...applications[applicationIndex],
      status: newStatus,
      lastUpdated: new Date().toISOString(),
      statusHistory: [
        ...applications[applicationIndex].statusHistory,
        {
          status: newStatus,
          date: new Date().toISOString(),
          note: note || this.getStatusConfig(newStatus).description
        }
      ]
    };

    applications[applicationIndex] = updatedApplication;

    // Update user profile
    AuthService.updateProfile({ applications: applications });

    return updatedApplication;
  }

  // Simulate realistic status progression for demo
  static simulateStatusProgression(applicationId) {
    const progressionSteps = [
      { status: this.STATUS.PROCESSING, delay: 5000, note: 'HR team started reviewing your application' },
      { status: this.STATUS.UNDER_REVIEW, delay: 15000, note: 'Technical team is evaluating your skills' },
      // Randomly choose final outcome
      { 
        status: Math.random() > 0.3 ? this.STATUS.INTERVIEW_SCHEDULED : this.STATUS.REJECTED, 
        delay: 30000, 
        note: Math.random() > 0.3 ? 'Interview scheduled for next week' : 'Position filled by another candidate'
      }
    ];

    progressionSteps.forEach((step, index) => {
      setTimeout(() => {
        try {
          this.updateApplicationStatus(applicationId, step.status, step.note);
        } catch (error) {
          console.log('Status update skipped - user may have signed out');
        }
      }, step.delay);
    });
  }

  // Get application by ID
  static getApplicationById(applicationId) {
    const applications = this.getUserApplications();
    return applications.find(app => app.id === applicationId);
  }

  // Withdraw application
  static withdrawApplication(applicationId) {
    return this.updateApplicationStatus(
      applicationId, 
      this.STATUS.WITHDRAWN, 
      'Application withdrawn by user'
    );
  }

  // Get applications by status
  static getApplicationsByStatus(status) {
    const applications = this.getUserApplications();
    return applications.filter(app => app.status === status);
  }

  // Get application statistics
  static getApplicationStats() {
    const applications = this.getUserApplications();
    const stats = {
      total: applications.length,
      pending: 0,
      processing: 0,
      accepted: 0,
      rejected: 0,
      interview: 0
    };

    applications.forEach(app => {
      switch (app.status) {
        case this.STATUS.PENDING:
        case this.STATUS.PROCESSING:
        case this.STATUS.UNDER_REVIEW:
          stats.processing++;
          break;
        case this.STATUS.INTERVIEW_SCHEDULED:
          stats.interview++;
          break;
        case this.STATUS.ACCEPTED:
          stats.accepted++;
          break;
        case this.STATUS.REJECTED:
          stats.rejected++;
          break;
      }
    });

    return stats;
  }
}