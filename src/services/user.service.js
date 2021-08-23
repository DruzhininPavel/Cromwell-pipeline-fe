import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
  getUserProfile(email) {
    return axios.get(API_URL + 'users?email=' + email, { headers: authHeader() });
  }

  deleteRofile() {
    return axios.delete(API_URL + 'users', { headers: authHeader() });
  }

  updateProfile(user) {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
    return axios.put(API_URL + 'users/info', data, { headers: authHeader() });
  }

  updatePassword(passwords) {
    return axios.put(API_URL + 'users/password', passwords, { headers: authHeader() });
  }
}

export default new UserService();