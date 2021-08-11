<template>
    <div class="row">
        <div class="card card-container">
            <h1> {{ project.name }} </h1>
            <h3> {{ project.projectId }} </h3>
            <router-link :to="'/projects/' + project.projectId"  class="nav-link"> To project: {{ project.name }}</router-link>
        </div>
    </div>
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