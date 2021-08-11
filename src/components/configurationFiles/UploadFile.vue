<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="card card-container">
                <h5 class="card-title">Upload File</h5>
                <Form @submit="handleUploadFile" :validation-schema="schema" id="uploadFileForm">
                    <div class="form-group">
                        <label for="path">Enter file path</label>
                        <Field type="text" class="form-control" id="path" name="path" rows="3" />
                        <ErrorMessage name="name" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="content">Enter your script</label>
                        <Field as="textarea" v-model="contentFile" class="form-control" id="content" name="content" rows="5"></Field>
                        <ErrorMessage name="name" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <a @click="handleValidateFile" class="btn btn-primary btn-block" :disabled="loading">
                        <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Validate</span>
                        </a>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                        <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Upload</span>
                        </button>
                    </div>
                    <div class="form-group">
                        <div v-if="success" class="alert alert-success" role="alert">
                        {{ success }}
                        </div>
                    </div>
                    <div class="form-group">
                        <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                        </div>
                    </div>
                    <Field as="hidden" id="projectId" name="projectId" :value="this.projectId" />
                    <Field as="hidden" id="version" name="version" value="v0.0.4" />
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import FileService from "../../services/file.service"
export default {
    name: "UploadFile",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            path: yup.string().required("Shold be filled"),
            content: yup.string().required("Shold be filled"),
            projectId: yup.string().required("Shold be filled"),
            version: yup.string().required("Shold be filled"),
        });

        return {
            loading: false,
            message: "",
            success: "",
            schema,
            projectId: this.$route.params.projectId,
            projectVersion: "",
            contentFile: "",
        };
    },
    methods: {
        handleValidateFile() {
            this.loading = true;
            this.success = '';
            this.message = '';
            FileService.validateFile({content: this.contentFile}).then(
                () => {
                    this.loading = false;
                    this.success = "OK!"
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
            );
        },
        handleUploadFile(data) {
            this.loading = true;
            this.success = '';
            this.message = '';
            let post = {
                projectId: data.projectId,
                version: data.version,
                projectFile: {
                    path: data.path,
                    content: data.content
                }
            }
            FileService.uploadFile(post).then(
                () => {
                    this.loading = false;
                    this.success = "OK!"
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
            );
        },
    }
};
</script>