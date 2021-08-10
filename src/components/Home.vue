<template>
  <div class="container">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Projects</h5>
        <h6 class="card-subtitle mb-2 text-muted">Projects Area</h6>
        <p class="card-text">At this place we can manage our projects</p>
        <router-link to="/projects" class="card-link">Projects</router-link>
      </div>
    </div>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">User Profile</h5>
        <h6 class="card-subtitle mb-2 text-muted">User Profile Area</h6>
        <p class="card-text">At this place we can manage our user profile</p>
        <router-link to="/profile" class="card-link">User Profile</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>