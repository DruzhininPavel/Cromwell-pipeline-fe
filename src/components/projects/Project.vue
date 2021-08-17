<template>
    <li class="list-group-item">
        <div class="col">
            {{ project.name }}
        </div>
        <div class="col">
            <router-link :to="'/projects/' + project.projectId"  class="btn btn-primary btn-block"> Open </router-link>
        </div>
    </li>
</template>

<script>
export default {
    name: 'Project',
    props: {
        project: {
            default: null
        }
    }
}
</script>