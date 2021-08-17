import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/projects/';

class ConfigurationService {
  getConfigurationContent(projectId) {
    return axios.get(API_URL + projectId + '/configurations', { headers: authHeader() });
  }

  addConfiguration(projectId, configuration) {
    return axios.put(API_URL + projectId + '/configurations', configuration, { headers: authHeader() });
  }

  deleteConfiguration(projectId) {
    return axios.delete(API_URL + projectId + '/configurations', { headers: authHeader() });
  }
}

export default new ConfigurationService();