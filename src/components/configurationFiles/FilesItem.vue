<template>
    <li class="list-group-item">
        <div class="col">
            File: {{ file.path }}
        </div>
        <div class="col">
            <router-link :to="'/projects/' + projectId + '/files/' + file.path"  class="btn btn-primary btn-block"> Open </router-link>
        </div>
    </li>
</template>
<script>
export default {
    name: 'FilesItem',
    props: {
        file: {
            default: null
        }
    },
    data() {
        return {
            projectId: this.$route.params.projectId
        }
    }
}
</script>