<template>
  <div class="container">
    <header class="jumbotron">
      <div v-if="Array.isArray(content)">
        <div v-for="project in content" :key="project">
          <project :project="project"></project>
        </div>  
      </div>
      <div v-else> 
        <p>Projects not found </p>
      </div>
    </header>
      <router-link to="/projects/add" class="btn btn-primary btn-block" >
        <span>Add Project</span>
      </router-link>
  </div>
</template>

<script>
import ProjectService from "../services/project.service";
import Project from "./projects/Project"

export default {
  name: "BoardProjects",
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