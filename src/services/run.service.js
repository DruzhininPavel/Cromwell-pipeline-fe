import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/runs';

class RunService {

  getRuns() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getRun(runId) {
    return axios.get(API_URL + '/' + runId, { headers: authHeader() });
  }

  addRun(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  updateRun(runId, data) {
    return axios.put(API_URL + '/' + runId, data, { headers: authHeader() });
  }

  deleteRun(runId) {
    return axios.delete(API_URL + '/' + runId, { headers: authHeader() });
  }
}

export default new RunService();