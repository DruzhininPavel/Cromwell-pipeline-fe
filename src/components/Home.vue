<template>
  <div class="container">
    <h1 class="display-4">Projects</h1>
    <hr class="my-4">
    <ul class="list-group list-group-flush">
      <div div v-if="Array.isArray(content)">
        <div v-for="project in content" :key="project.name">
          <Project :project="project"></Project>
        </div>  
      </div>
      <div v-else> 
        <p>Projects not found </p>
      </div>
    </ul>
    <hr class="display-4">
    <router-link to="/projects/add" class="btn btn-primary btn-block" >
      <span>Add Project</span>
    </router-link>
  </div>
</template>

<script>
import ProjectService from "../services/project.service";
import Project from "./projects/Project"

export default {
  name: "Home",
  components: {
    Project
  },
  data() {
    return {
      content: null,
    };
  },
  mounted() {
    ProjectService.getProjectsContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>