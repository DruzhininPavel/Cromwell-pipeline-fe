<template>
   <div class="app-main-layout">
    <NavBar/>
    <div class="row">
        <div class="col-4">
            <h1 class="dicplay-4">Your projects</h1>
            <NavProjects/>
        </div>
        <div class="col-8">
            <main class="app-content">
                <router-view/>
            </main>
        </div>
    </div>
   </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NavProjects from '@/components/NavProjects.vue'

export default {
    name: 'main-layaot',
    components: {
        NavBar, NavProjects
    }
}
</script>