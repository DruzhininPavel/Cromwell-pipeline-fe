<template>
  <div v-if="Array.isArray(userData)" class="container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{userData[0].firstName}} {{userData[0].lastName}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Email {{currentUser.email}}</h6>
        <p class="card-text">User  ID: {{userData[0].userId}}</p>
        <p class="card-text">First Name: {{userData[0].firstName}}</p>
        <p class="card-text">Last  Name: {{userData[0].lastName}}</p>
        <router-link to="/profile/edit" class="btn btn-primary btn-block">Edit Profile</router-link>
        <router-link to="/profile/password" class="btn btn-primary btn-block">Change Password</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
export default {
  name: 'Profile',
  data() {
    return {
      userData: {},
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  beforeCreate() {
    let user = JSON.parse(localStorage.getItem('user'))
    UserService.getUserProfile(user.email).then(
      (response) => {
          this.userData = response.data;
      },
      (error) => {
          this.userData =
          (error.response &&
              error.response.data &&
              error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>