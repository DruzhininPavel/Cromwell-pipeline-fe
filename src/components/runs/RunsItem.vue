<template>
    <th scope="row">{{run.runId}}</th>
    <td>{{run.projectVersion}}</td>
    <td>{{run.status}}</td>
    <!-- <td>{{run.results}}</td> -->
    <td>
        <span v-if="run.status === 'created'">{{run.results}}</span>
        <button v-else type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#m-' + run.runId">
            Show
        </button>
    </td>
    <td>{{run.timeStart}}</td>
    <td>
        <button v-if="run.status === 'created'" type="button" class="btn btn-primary" @click="handleUpdateRun">
            Update
        </button>
    </td>

    <div class="modal fade" :id="'m-' + run.runId" tabindex="-1" role="dialog" aria-labelledby="Run results" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Results</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Поздравляем!!!</p>
                <p>Анализ вашего генетического кода показал что вы "Кукуруза"!</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save to file</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import RunsService from "../../services/run.service"
export default {
    name: "RunsItem",
    props: {
        run: null
    },
    methods: {
        handleUpdateRun() {
            const data = {
                status: "done",
                timeStart: this.run.timeStart,
                results: "You are cucumber!"
            }
            RunsService.updateRun(this.run.projectId, this.run.runId, data).then(
                this.$router.push('/projects/' + this.run.projectId + '/runs/')
            );
        }
    }
}
</script>