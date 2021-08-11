import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/projects';

class ProjectService {
  getProjectsContent() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getProjectContent(projectId) {
    return axios.get(API_URL + '/' + projectId, { headers: authHeader() });
  }

  addProject(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  editProject(projectId, data) {
    return axios.put(API_URL + '/' + projectId, data, { headers: authHeader() });
  }

  deleteProject(projectId) {
    return axios.delete(API_URL + '/' + projectId, { headers: authHeader() });
  }
}

export default new ProjectService();