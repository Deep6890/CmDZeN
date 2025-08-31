// Authentication utilities
export const auth = {
  // Login user and store credentials
  login: (email, password) => {
    const userData = {
      email,
      loginTime: new Date().toISOString(),
      isLoggedIn: true
    };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');

    // Trigger auth change event
    window.dispatchEvent(new Event('authChange'));

    return userData;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userPreferences');

    // Trigger auth change event
    window.dispatchEvent(new Event('authChange'));
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },

  // Get current user data
  getCurrentUser: () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },

  // Save user preferences
  savePreferences: (preferences) => {
    const currentPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const updatedPrefs = { ...currentPrefs, ...preferences };
    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
  },

  // Get user preferences
  getPreferences: () => {
    const prefs = localStorage.getItem('userPreferences');
    return prefs ? JSON.parse(prefs) : {};
  }
};