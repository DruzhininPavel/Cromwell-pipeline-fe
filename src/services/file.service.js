import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class FileService {
  getFile(projectId, path) {
    return axios.get(API_URL + 'projects/' + projectId + '/files/' + path, { headers: authHeader() });
  }

  getFiles(projectId) {
    return axios.get(API_URL + 'projects/' + projectId + '/files', { headers: authHeader() });
  }

  uploadFile(projectId, data) {
    return axios.post(API_URL + 'projects/' + projectId + '/files', data, { headers: authHeader() });
  }

  buildConfiguration(projectId, path) {
    return axios.get(API_URL + 'projects/' + projectId + '/files/configurations/' + path, { headers: authHeader() });
  }

  validateFile(data) {
    return axios.post(API_URL + 'files/validation', data, { headers: authHeader() });
  }
}

export default new FileService();