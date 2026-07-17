// Simple localStorage-based authentication service
export class AuthService {
  static USERS_KEY = 'internai_users';
  static CURRENT_USER_KEY = 'internai_current_user';

  // Get all users from localStorage
  static getUsers() {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save users to localStorage
  static saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Get current user
  static getCurrentUser() {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Set current user
  static setCurrentUser(user) {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  // Clear current user
  static clearCurrentUser() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Sign up new user
  static signUp(userData) {
    const users = this.getUsers();
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      // Initialize profile fields
      profileImage: null,
      collegeName: '',
      degree: '',
      branch: '',
      currentYear: '',
      passedOutYear: '',
      skills: [],
      interests: [],
      resume: null,
      certifications: [
        // Sample certification for new users
        {
          id: 'sample-cert-1',
          title: 'Web Development Fundamentals Certificate',
          company: 'InternAI Academy',
          type: 'Course Completion',
          description: 'Successfully completed comprehensive web development course covering HTML, CSS, JavaScript, and React fundamentals',
          completedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 30 days ago
          duration: '2 months',
          skills: ['HTML', 'CSS', 'JavaScript', 'React'],
          issuedBy: 'InternAI Platform',
          certificateId: 'INTERNAI-WEB-2024-001',
          verificationUrl: 'https://internai.com/verify/web-2024-001'
        }
      ],
      applications: [] // Track application status
    };

    // Add to users array
    users.push(newUser);
    this.saveUsers(users);

    // Set as current user
    this.setCurrentUser(newUser);

    return newUser;
  }

  // Sign in existing user
  static signIn(credentials) {
    const users = this.getUsers();
    
    // Find user by email and password
    const user = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Set as current user
    this.setCurrentUser(user);

    return user;
  }

  // Sign out current user
  static signOut() {
    this.clearCurrentUser();
  }

  // Update user profile
  static updateProfile(updatedData) {
    const users = this.getUsers();
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    // Find and update user
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // Update user data
    const updatedUser = { ...users[userIndex], ...updatedData };
    users[userIndex] = updatedUser;

    // Save to localStorage
    this.saveUsers(users);
    this.setCurrentUser(updatedUser);

    return updatedUser;
  }

  // Check if user is authenticated
  static isAuthenticated() {
    return this.getCurrentUser() !== null;
  }
}