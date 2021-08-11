<template>
  <div class="container">
      <div class="card" v-if="configuration.active">
        <div class="card-body">
            <h5 class="card-title">Configuration</h5>
            <h6 class="card-subtitle mb-2 text-muted">Project ID: {{ configuration.projectId }}</h6>
            <p class="card-text">Acative: {{ configuration.active }}</p>
            <p class="card-text">Version: {{ configuration.version }}</p>
            <p class="card-text">Data: {{ configuration.projectFileConfigurations }}</p>
            <a href="#" class="btn btn-primary btn-block">Edit</a>
            <a href="#" class="btn btn-secondary btn-block">Deactivate</a>
            <router-link :to="'/project/' + projectId">Back</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import ProjectConfigurationService from "../../services/configurations.service";
export default {
    name: 'ProjectConfiguration',
    data() {
        return {
            configuration: null,
            projectId: ""
        };
    },
    beforeCreate() {
        ProjectConfigurationService.getConfigurationContent(this.$route.params.projectId).then(
            (response) => {
                this.configuration = response.data;
            },
            (error) => {
                this.configuration =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            }
        );
    },
    mounted() {
        this.projectId = this.$route.params.projectId
    }
}
</script>