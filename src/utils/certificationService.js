import { AuthService } from './authService';

export class CertificationService {
  // Add a new certification to user's profile
  static addCertification(internshipData) {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    const newCertification = {
      id: Date.now().toString(),
      title: `${internshipData.title} Completion Certificate`,
      company: internshipData.company,
      type: 'Internship',
      description: `Successfully completed ${internshipData.duration} internship program in ${internshipData.category}`,
      completedDate: new Date().toLocaleDateString(),
      duration: internshipData.duration,
      skills: internshipData.requiredSkills,
      issuedBy: 'InternAI Platform',
      certificateId: `INTERNAI-${Date.now()}`,
      verificationUrl: `https://internai.com/verify/${Date.now()}`
    };

    // Get current certifications and add the new one
    const currentCertifications = currentUser.certifications || [];
    const updatedCertifications = [...currentCertifications, newCertification];

    // Update user profile with new certification
    AuthService.updateProfile({ certifications: updatedCertifications });

    return newCertification;
  }

  // Get all certifications for current user
  static getUserCertifications() {
    const currentUser = AuthService.getCurrentUser();
    return currentUser?.certifications || [];
  }

  // Remove a certification
  static removeCertification(certificationId) {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    const updatedCertifications = currentUser.certifications.filter(
      cert => cert.id !== certificationId
    );

    AuthService.updateProfile({ certifications: updatedCertifications });
  }

  // Simulate internship completion (for demo purposes)
  static simulateInternshipCompletion(internshipData) {
    // In a real application, this would be called when an internship is actually completed
    // For demo purposes, we can call this to add sample certifications
    
    const certification = this.addCertification(internshipData);
    
    // Show success notification (you can integrate with a toast library)
    console.log('🎉 Congratulations! You have earned a new certificate:', certification.title);
    
    return certification;
  }

  // Get sample certifications for demo
  static getSampleCertifications() {
    return [
      {
        id: 'sample-1',
        title: 'Frontend Development Internship Certificate',
        company: 'TechCorp',
        type: 'Internship',
        description: 'Successfully completed 3 months internship program in Web Development',
        completedDate: '2024-01-15',
        duration: '3 months',
        skills: ['React', 'JavaScript', 'HTML', 'CSS'],
        issuedBy: 'InternAI Platform',
        certificateId: 'INTERNAI-1234567890',
        verificationUrl: 'https://internai.com/verify/1234567890'
      },
      {
        id: 'sample-2',
        title: 'Data Science Internship Certificate',
        company: 'DataFlow Inc',
        type: 'Internship',
        description: 'Successfully completed 6 months internship program in Data Science',
        completedDate: '2023-12-20',
        duration: '6 months',
        skills: ['Python', 'Machine Learning', 'SQL', 'Pandas'],
        issuedBy: 'InternAI Platform',
        certificateId: 'INTERNAI-0987654321',
        verificationUrl: 'https://internai.com/verify/0987654321'
      }
    ];
  }
}