// API service for server communication
import { config } from '../config.js';

class ApiService {
  constructor() {
    this.baseUrl = config.api.baseUrl;
  }

  // Generic API call method
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // User authentication
  async login(credentials) {
    return this.request(config.api.endpoints.auth + '/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  // Get user progress and XP
  async getUserProgress() {
    return this.request(config.api.endpoints.progress);
  }

  // Update user XP
  async updateXP(points) {
    return this.request(config.api.endpoints.user + '/xp', {
      method: 'PATCH',
      body: JSON.stringify({ points })
    });
  }

  // Get coding suggestions
  async getSuggestions() {
    return this.request('/suggestions');
  }

  // Submit coding question answer
  async submitAnswer(questionId, answer) {
    return this.request('/questions/submit', {
      method: 'POST',
      body: JSON.stringify({ questionId, answer })
    });
  }
}

export default new ApiService();