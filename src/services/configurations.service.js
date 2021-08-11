import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/configurations';

class ConfigurationService {
  getConfigurationContent(projectId) {
    return axios.get(API_URL + '?project_id=' + projectId, { headers: authHeader() });
  }

  addConfiguration(configuration) {
    return axios.post(API_URL, configuration, { headers: authHeader() });
  }

  deleteConfiguration(projectId) {
    return axios.delete(API_URL + '?project_id=' + projectId, { headers: authHeader() });
  }
}

export default new ConfigurationService();