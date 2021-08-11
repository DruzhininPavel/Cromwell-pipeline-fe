import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/files';

class FileService {
  getFile(projectId, path, version) {
    return axios.get(API_URL + '/' + projectId + '/' + path + version, { headers: authHeader() });
  }

  getFiles(projectId, version) {
    return axios.get(API_URL + '/' + projectId + version, { headers: authHeader() });
  }

  uploadFile(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  buildConfiguration(projectId, path, version) {
    return axios.get(API_URL + '/configurations/' + projectId + '/' + path + version, { headers: authHeader() });
  }

  validateFile(data) {
    return axios.post(API_URL + '/validation', data, { headers: authHeader() });
  }
}

export default new FileService();