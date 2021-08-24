<template>
    <div v-if="buildedConfig" class="container">
        <h5 class="card-title">Enter inputs for WDL script</h5>
        <Form @submit="handleUploadConficuration" id="uploadConfigurationForm">
            <div v-for="input in buildedConfig.projectFileConfigurations[0].inputs" :key="input.name" class="form-group">
                <label for="path">Enter {{ input.name }}</label>
                <Field :type="fieldTypes[input.typedValue['_type']]" class="form-control" :id="input['name']" :name="input['name']" />
                <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                ></span>
                <span>Submit</span>
                </button>
            </div>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
                </div>
            </div>
        </Form>
        {{ buildedConfig }}
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import ConfigurationService from "../../services/configurations.service.js"
export default {
    name: "ConfigureFile",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            projectId: this.$route.params.projectId,
            buildedConfig: JSON.parse(localStorage.getItem("buildedConfiguration")),
            fieldTypes: {
                'String': "text", 
                "File": "text", 
                "Int": "text",
                "Float": "text",
                "Boolean": "text"
            },
            loaging: false,
            message: ''
        }
    },
    methods: {
        handleUploadConficuration(data) {
            this.loading = true;
            this.message = '';
            for(const [key, value] of Object.entries(this.buildedConfig.projectFileConfigurations[0].inputs)) {
                const path = value.name.split(".");
                const inputValue = data[path[0]][path[1]][path[2]];
                this.buildedConfig.projectFileConfigurations[0].inputs[key].typedValue.value = inputValue;
            }
            ConfigurationService.addConfiguration(this.projectId, this.buildedConfig).then(
                () => {
                    this.loading = false;
                    this.$router.push('/projects/' + this.projectId + '/configuration')
                },
                (error) => {
                    this.loading = false;
                    this.message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            )
        }
    }
    
}
</script>