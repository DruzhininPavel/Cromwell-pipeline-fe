<template>
  <div class="container">
    <h1 class="display-4">Projects</h1>
    <hr class="my-4">
    <board-projects></board-projects>
    <hr class="display-4">
    <router-link to="/projects/add" class="btn btn-primary btn-block" >
      <span>Add Project</span>
    </router-link>
  </div>
</template>

<script>
import BoardProjects from "./BoardProjects.vue"

export default {
  name: "Home",
  components: {
    BoardProjects
  },
  data() {
    return {
      content: null,
    };
  },
};
</script>