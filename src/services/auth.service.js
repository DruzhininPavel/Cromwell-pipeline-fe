import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signIn', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data == "OK") {
          user.accessToken = response.headers['access-token']
          user.refreshToken = response.headers['refresh-token']
          user.tokenExpiration = response.headers['access-token-expiration']

          localStorage.setItem('user', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signUp', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    });
  }

  refreshToken() {
    let user = JSON.parse(localStorage.getItem('user'))
    axios.get(API_URL + 'refresh?refreshToken=' + user.refreshToken, { headers: authHeader() })
      .then(response => {
        if (response.data == "OK") {
          user.accessToken = response.headers['access-token']
          user.refreshToken = response.headers['refresh-token']
          user.tokenExpiration = response.headers['access-token-expiration']

          localStorage.setItem('user', JSON.stringify(user));
        }

        return user;
      }).catch( error => {
        console.log(error);
        localStorage.removeItem('user');
      }

      );
  }
}

export default new AuthService();