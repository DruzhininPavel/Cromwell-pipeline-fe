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
        <div class="progress" v-if="run.status === 'created'">
            <div class="progress-bar" role="progressbar" :style="el_style" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"> {{ el_inner_text }} </div>
        </div>
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
export default {
    name: "RunsItem",
    props: {
        run: null
    },
    data() {
        return {
            el_inner_text: "0%",
            el_style() {
                return {
                    width: '0%'
                }
            } 
        }
    },
    mounted() {
        this.doProgress()
    },
    methods: {
       doProgress() {
           if(this.run.status === 'created') {
                let percent = 0;
                 

                let timer = setInterval( () => {
                    if (percent == 100) {
                        clearInterval(timer);
                        this.run.update();
                    }
                    this.el_inner_text = percent + "%";
                    this.el_style.width = percent + '%';
                    percent += 10;
                }, 1000);
           }
       } 
    }
}
</script>