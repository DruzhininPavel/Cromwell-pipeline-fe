<template>
    <ul class="list-group">
      <router-link v-for="project in projects" :key="project.id" :class="'list-group-item list-group-item-action' + isActive(project.projectId)" :to="'/projects/' + project.projectId"> 
        <span>{{ project.name }}</span>
      </router-link>
    </ul>
</template>

<script>
import ProjectService from "../services/project.service";

export default {
  name: "NavProjects",
  data() {
    return {
      projects: null,
      projectId: null
    };
  },
  watch: {
    $route(to){
      this.getProjects()
      if(to.params.projectId) this.projectId = to.params.projectId;
      else this.projectId = null;
    }
  },
  mounted() {
    this.getProjects()
  },
  methods: {
    isActive(id) {
      if(this.projectId) {
        return (this.projectId === id ) ? " active" : "";
      } else {
        return "";
      }
    },
    getProjects() {
      ProjectService.getProjectsContent().then(
        (response) => {
          this.projects = response.data;
        },
        (error) => {
          this.projects =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
};
</script>