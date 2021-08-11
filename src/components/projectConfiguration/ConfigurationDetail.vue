<template>
    <div v-if="configuration.active" class="container">
        <div class="row justify-content-md-center">
            <div class="card card-container">
                <div class="card-body">
                    <h5 class="card-title">Configuration</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Project ID: {{ configuration.projectId }}</h6>
                    <p class="card-text">Acative: {{ configuration.active }}</p>
                    <p class="card-text">Version: {{ configuration.version }}</p>
                    <p class="card-text">Data: {{ configuration.projectFileConfigurations }}</p>
                    <router-link :to="'/projects/' + configuration.projectId + '/configuration/edit'" class="btn btn-primary btn-block">Edit</router-link>
                    <a @click="hanleDeactivateConfiguration" class="btn btn-secondary btn-block" :disabled="loading">Deactivate</a>
                    <router-link :to="'/projects/' + configuration.projectId">Back</router-link>
                </div>
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
            configuration: {},
            loading: false,

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
    methods: {
        hanleDeactivateConfiguration() {
            this.loading = true;
            if(confirm("Do you realy whant to delet this configuration?")){
                ProjectConfigurationService.deleteConfiguration(this.configuration.projectId).then(
                    () => {
                        this.loading = false;
                        this.$router.push('/projects/' + this.configuration.projectId)
                    },
                    (error) => {
                        this.loading = false;
                        this.message =
                            (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString();
                    }
                );
            }
        },
    },
}
</script>