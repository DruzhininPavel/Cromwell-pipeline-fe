<template>
  <div v-if="project" class="container">
      <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">ID: {{ project.projectId }}</h6>
            <p class="card-text">OwnerID: {{ project.ownerId }}</p>
            <p class="card-text">Acative: {{ project.active }}</p>
            <p class="card-text">RepositoryId: {{ project.repositoryId }}</p>
            <p class="card-text">Version: {{ project.version }}</p>
            <p class="card-text">Visibility: {{ project.visibility }}</p>
            <router-link :to="'/projects/' + project.projectId + '/files'" class="btn btn-primary btn-block">Files</router-link>
            <router-link :to="'/projects/' + project.projectId + '/configuration'" class="btn btn-primary btn-block">Configuration</router-link>
            <router-link :to="'/projects/' + project.projectId + '/runs'" class="btn btn-primary btn-block">Runs</router-link>
            <router-link :to="'/projects/' + project.projectId + '/edit'" class="btn btn-primary btn-block">Rename</router-link>
            <button @click="handleDeactivateProject" class="btn btn-secondary btn-block" :disabled="loading"><span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Deactivate</span></button>
                        <router-link to="/projects">Back</router-link>
            
        </div>
    </div>
  </div>
</template>

<script>
import ProjectService from "../../services/project.service";
export default {
    name: 'ProjectDetails',
    data() {
        return {
            project: {}
        };
    },
    beforeCreate() {
        ProjectService.getProjectContent(this.$route.params.projectId).then(
            (response) => {
                this.project = response.data;
            },
            (error) => {
                this.project =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            }
        );
    },
    methods: {
        handleDeactivateProject(projectId) {
            this.loading = true;
            if(confirm("Do you really want to deactivate project?")){
                ProjectService.deleteProject(projectId).then(
                    () => {
                        this.$router.push("/projects");
                    },
                    (error) => {
                        this.message =
                            (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                    }
                );
            }
            this.loading = false;
        }
    },
};
</script>