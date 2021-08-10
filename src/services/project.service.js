import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class ProjectService {
  getProjectsContent() {
    return axios.get(API_URL + 'projects', { headers: authHeader() });
  }

  getProjectContent(projectId) {
    return axios.get(API_URL + 'projects?name=' + projectId, { headers: authHeader() });
  }

  addProject(data) {
    return axios.post(API_URL + 'projects', data, { headers: authHeader() });
  }

  editProject(projectId, data) {
    return axios.put(API_URL + 'projects/' + projectId, data, { headers: authHeader() });
  }

  deleteProject(projectId) {
    return axios.delete(API_URL + 'projects/' + projectId, { headers: authHeader() });
  }
}

export default new ProjectService();