<template>
    <div v-if="configuration.active" class="container">
        <div class="row justify-content-md-center">
            <div class="card card-container">
                <div class="card-body">
                    <h5 class="card-title">Configuration</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Project ID: {{ configuration.projectId }}</h6>
                    <p class="card-text">Active: {{ configuration.active }}</p>
                    <p class="card-text">Version: {{ configuration.version }}</p>
                    <p class="card-text">File: {{ configuration.projectFileConfigurations[0].path }}</p>
                    <p class="card-text">Inputs: 
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="input in configuration.projectFileConfigurations[0].inputs" :key="input">
                                    <th scope="row">{{ input.name }}</th>
                                    <td>{{ input.typedValue._type }}</td>
                                    <td>{{ input.typedValue.value }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </p>
                    <router-link :to="'/projects/' + configuration.projectId + '/configuration/edit'" class="btn btn-primary btn-block">Edit</router-link>
                    <a @click="hanleDeactivateConfiguration" class="btn btn-secondary btn-block" :disabled="loading">Deactivate</a>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <router-link :to="'/projects/' + projectId + '/files/upload'" class="btn btn-primary col-3 mr-4">Add Configuration</router-link>
    <router-link class="btn btn-danger col-3" :to="'/projects/' + projectId">Back</router-link>
</template>

<script>
import ProjectConfigurationService from "../../services/configurations.service";
export default {
    name: 'ProjectConfiguration',
    data() {
        return {
            projectId: this.$route.params.projectId,
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