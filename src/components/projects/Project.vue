<template>
    <div class="card card-container">
        <h1> {{ project.name }} </h1>
        <h3> {{ project.projectId }} </h3>
        <router-link :to="'/projects/' + project.name"  class="nav-link"> To project: {{ project.name }}</router-link>
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