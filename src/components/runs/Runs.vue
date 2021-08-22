<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="card card-container">
                <h5 class="card-title">Runs</h5>
                <div v-if="Array.isArray(runs)">
                    <div v-for="run in runs" :key="run">
                    <RunsItem :run="run"></RunsItem>
                    </div>  
                </div>
                <div v-else> 
                    <p>Runs not found </p>
                </div>
            </div>
            <router-link :to="'/projects/' + projectId + '/runs/add'" class="btn btn-primary btn-block">Add new run</router-link>
        </div>
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
            runs: null
        }
    },
    mounted() {
        RunsService.getRuns().then(
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
    },
    
}
</script>