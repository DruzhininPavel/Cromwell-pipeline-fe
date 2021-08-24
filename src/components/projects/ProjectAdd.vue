<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="card card-container">
                <h5 class="card-title">Add project</h5>
                <Form @submit="handleAddProject" :validation-schema="schema">
                    <div class="form-group">
                        <label for="name">Enter Project name</label>
                        <Field type="text" class="form-control" id="name" name="name" />
                        <ErrorMessage name="name" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                        <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Add</span>
                        </button>
                    </div>

                    <div class="form-group">
                        <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ProjectService from "../../services/project.service"
export default {
    name: "ProjectAdd",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            name: yup.string().required("Password is required!"),
        });

        return {
            loading: false,
            message: "",
            schema,
        };
    },
    methods: {
        handleAddProject(data) {
            this.loading = true;

            ProjectService.addProject(data).then(
                (response) => {
                    this.$router.push("/projects/" + response.data.projectId);
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
    },
};
</script>