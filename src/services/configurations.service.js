import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/configurations';

class UserService {
  getConfigurationContent(projectId) {
    return axios.get(API_URL + '?project_id=' + projectId, { headers: authHeader() });
  }
}

export default new UserService();