<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="card card-container">
                <h5 class="card-title">Files</h5>
                <div v-if="Array.isArray(files)">
                    <div v-for="file in files" :key="file">
                    <FilesItem :file="file"></FilesItem>
                    </div>  
                </div>
                <div v-else> 
                    <p>Files not found </p>
                </div>
                <hr>
                <router-link :to="'/projects/' + projectId + '/files/upload'" class="btn btn-primary btn-block">Upload new file</router-link>
                <hr>
                <router-link class="btn btn-danger" :to="'/projects/' + projectId">Back</router-link>
            </div>
            
        </div>
    </div>
</template>

<script>
import FileService from "../../services/file.service"
import FilesItem from "./FilesItem.vue"
export default {
    name: "ProjectFiles",
    components: {
        FilesItem,
    },
    data() {
        return {
            loading: false,
            files: null,
            projectId: this.$route.params.projectId
        };
    },
    mounted() {
        FileService.getFiles(this.projectId).then(
        (response) => {
            this.files = response.data;
        },
        (error) => {
            this.files =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        }
        );
    }
};
</script>
