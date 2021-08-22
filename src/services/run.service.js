import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/projects/';

class RunService {

  getRuns(projectId) {
    return axios.get(API_URL + projectId + '/runs', { headers: authHeader() });
  }

  getRun(projectId, runId) {
    return axios.get(API_URL + projectId + '/runs/' + runId, { headers: authHeader() });
  }

  addRun(projectId, data) {
    return axios.post(API_URL + projectId + '/runs', data, { headers: authHeader() });
  }

  updateRun(projectId, runId, data) {
    return axios.put(API_URL + projectId + '/runs/' + runId, data, { headers: authHeader() });
  }

  deleteRun(projectId, runId) {
    return axios.delete(API_URL + projectId + '/runs/' + runId, { headers: authHeader() });
  }
}

export default new RunService();