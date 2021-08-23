<template>
    <div class="container">
        <h5 class="display-4">Runs</h5>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Version</th>
                <th scope="col">Status</th>
                <th scope="col">Result</th>
                <th scope="col">Time start</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody v-if="Array.isArray(runs)">
                <tr v-for="run in runs" :key="run">
                    <RunsItem :run="run"></RunsItem>
                </tr>  
            </tbody>
            <div v-else> 
                <p>Runs not found </p>
            </div>
        </table>
            <a @click="handleAddNewRun" class="btn btn-primary col-3 mr-4">Start new run</a>
            <router-link class="btn btn-danger col-3" :to="'/projects/' + projectId">Back</router-link>
    </div>
</template>
<script>
import RunsItem from "./RunsItem.vue"
import RunsService from "../../services/run.service"
export default {
    name: "Runs",
    components: {
        RunsItem
    },
    data() {
        return {
            runs: null,
            projectId: this.$route.params.projectId,
        }
    },
    mounted() {
        this.handleGetRuns();
    },
    methods: {
        handleAddNewRun() {
            const data = {
                projectId: this.projectId,
                projectVersion: "v0.0.1",
                results: "No results"
            }
            RunsService.addRun(this.projectId, data).then(
                () => {
                    this.handleGetRuns();
                },
                (error) => {
                    this.runs =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                }
            );
        },
        handleGetRuns() {
            RunsService.getRuns(this.projectId).then(
            (response) => {
                this.runs = response.data;
            },
            (error) => {
                this.runs =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            }
            );
        }
    }
    
}
</script>