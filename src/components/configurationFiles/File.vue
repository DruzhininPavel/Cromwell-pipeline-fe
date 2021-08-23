<template>
    <div class="container">
        <h5 class="display-4">File</h5>
        <hr class="dicplay-4">
        <div class="row justify-content-md-center">    
            <div class="card card-container" v-if="file" >
                <h5 class="card-title">Path: {{file.path}}</h5>
                <p class="card-text">Content: <br/>{{file.content}}</p>
            </div>
        </div>

        <a @click="handleBuildConfig" class="btn btn-primary col-3 mr-4" :disabled="loading">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
            ></span>
            <span>Build Configuration</span>
        </a>
        <a @click="handleDeleteFile" class="btn btn-secondary col-3 mr-4" :disabled="loading">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
            ></span>
            <span>Delete file</span>
        </a>
        <router-link class="btn btn-danger col-3" :to="'/projects/' + projectId">Back</router-link>

    </div>
</template>

<script>
import FileService from "../../services/file.service"
export default {
    name: "ProjectFile",

    data() {
        return {
            loading: false,
            file: null,
            projectId: this.$route.params.projectId,
        };
    },
    mounted() {
        FileService.getFile(this.$route.params.projectId, this.$route.params.path).then(
        (response) => {
            this.file = response.data;
        },
        (error) => {
            this.file =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        }
        );
    },
    methods: {
        handleBuildConfig() {
            FileService.buildConfiguration(this.projectId, this.file.path).then(
                (response) => {
                    localStorage.setItem("buildedConfiguration", JSON.stringify(response.data));
                    this.$router.push('/projects/' + this.projectId + '/files/configure/' + this.file.path)
                },
                (error) => {
                    console.log(error);
                }
            )
        },
        handleDeleteFile() {
            if(confirm("Do you realy whant to delete this file?")){
                FileService.getFile(this.projectId, this.file.path).then(
                    (response) => {
                        localStorage.setItem("buildedConfiguration", JSON.stringify(response.data));
                        this.$router.push('/projects/' + this.projectId + '/files/configure/' + this.file.path)
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            }
            
        }
    }
};
</script>
