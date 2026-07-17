import { ApplicationService } from './applicationService';
import { AuthService } from './authService';

export class DemoData {
  // Add sample applications for testing
  static addSampleApplications() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) return;

    // Sample applications with different statuses
    const sampleApplications = [
      {
        id: 'demo-app-1',
        internshipId: 1,
        internshipTitle: 'Frontend Developer Intern',
        company: 'TechCorp',
        location: 'Remote',
        type: 'Remote',
        stipend: '$800/month',
        duration: '3 months',
        appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        status: ApplicationService.STATUS.UNDER_REVIEW,
        statusHistory: [
          {
            status: ApplicationService.STATUS.PENDING,
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Application submitted successfully'
          },
          {
            status: ApplicationService.STATUS.PROCESSING,
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'HR team started reviewing your application'
          },
          {
            status: ApplicationService.STATUS.UNDER_REVIEW,
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Technical team is evaluating your skills'
          }
        ],
        applicationData: {
          fullName: `${currentUser.firstName} ${currentUser.lastName}`,
          email: currentUser.email,
          phone: '+1 (555) 123-4567'
        },
        lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-app-2',
        internshipId: 2,
        internshipTitle: 'Data Science Intern',
        company: 'DataFlow Inc',
        location: 'San Francisco, CA',
        type: 'Hybrid',
        stipend: '$1200/month',
        duration: '6 months',
        appliedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        status: ApplicationService.STATUS.INTERVIEW_SCHEDULED,
        statusHistory: [
          {
            status: ApplicationService.STATUS.PENDING,
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Application submitted successfully'
          },
          {
            status: ApplicationService.STATUS.PROCESSING,
            date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'HR team started reviewing your application'
          },
          {
            status: ApplicationService.STATUS.UNDER_REVIEW,
            date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Technical team is evaluating your skills'
          },
          {
            status: ApplicationService.STATUS.INTERVIEW_SCHEDULED,
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            note: 'Interview scheduled for next week - check your email'
          }
        ],
        applicationData: {
          fullName: `${currentUser.firstName} ${currentUser.lastName}`,
          email: currentUser.email,
          phone: '+1 (555) 123-4567'
        },
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    // Add sample applications to user profile
    const existingApplications = currentUser.applications || [];
    const updatedApplications = [...existingApplications, ...sampleApplications];
    
    AuthService.updateProfile({ applications: updatedApplications });
    
    return sampleApplications;
  }

  // Add sample certification
  static addSampleCertification() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) return;

    const sampleCert = {
      id: 'demo-cert-1',
      title: 'React Development Mastery Certificate',
      company: 'InternAI Academy',
      type: 'Skill Certification',
      description: 'Advanced React development course covering hooks, context, state management, and modern React patterns',
      completedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 45 days ago
      duration: '3 months',
      skills: ['React', 'JavaScript', 'Redux', 'TypeScript'],
      issuedBy: 'InternAI Platform',
      certificateId: 'INTERNAI-REACT-2024-002',
      verificationUrl: 'https://internai.com/verify/react-2024-002'
    };

    const existingCerts = currentUser.certifications || [];
    const updatedCerts = [...existingCerts, sampleCert];
    
    AuthService.updateProfile({ certifications: updatedCerts });
    
    return sampleCert;
  }

  // Initialize demo data for new users
  static initializeDemoData() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) return;

    // Only add demo data if user has no applications yet
    if (!currentUser.applications || currentUser.applications.length === 0) {
      this.addSampleApplications();
    }

    // Add extra certification if user only has the default one
    if (!currentUser.certifications || currentUser.certifications.length <= 1) {
      this.addSampleCertification();
    }
  }
}