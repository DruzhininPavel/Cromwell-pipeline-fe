<template>
  <div v-if="project" class="container">
      <h1 class="dicplay-4">{{ project.name }}</h1>
      <div class="card">
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">ID: {{ project.projectId }}</h6>
            <p class="card-text">OwnerID: {{ project.ownerId }}</p>
            <p class="card-text">Active: {{ project.active }}</p>
            <p class="card-text">RepositoryId: {{ project.repositoryId }}</p>
            <p class="card-text">Version: {{ project.version }}</p>
            <p class="card-text">Visibility: {{ project.visibility }}</p>
            <router-link :to="'/projects/' + project.projectId + '/files'" class="btn btn-primary col-2 mr-4">Files</router-link>
            <router-link :to="'/projects/' + project.projectId + '/configuration'" class="btn btn-primary col-2 mr-4">Configuration</router-link>
            <router-link :to="'/projects/' + project.projectId + '/runs'" class="btn btn-danger col-2 mr-4">Runs</router-link>
            <router-link :to="'/projects/' + project.projectId + '/edit'" class="btn btn-primary col-2 mr-4">Rename</router-link>
            <button @click="handleDeactivateProject" class="btn btn-secondary col-2" :disabled="loading">
                <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                    ></span>
                <span>Deactivate</span>
            </button>
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
            project: null
        };
    },
    mounted() {
        this.updateProject()
    },
    watch: {
        $route(to, from){
            if(to.params.projectId !== from.params.projectId) this.updateProject()
        }
    },
    methods: {
        handleDeactivateProject() {
            this.loading = true;
            if(confirm("Do you really want to deactivate project?")){
                ProjectService.deleteProject(this.$route.params.projectId).then(
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
        },
        updateProject() {
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
        }
    },
};
</script>