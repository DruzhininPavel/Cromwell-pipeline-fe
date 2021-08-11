<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="card card-container">
                <h5 class="card-title">Validate File</h5>
                <Form @submit="handleValidateFile" :validation-schema="schema">
                    <div class="form-group">
                        <label for="content">Enter your script</label>
                        <Field as="textarea" type="textarea" class="form-control" id="content" name="content" rows="3" />
                        <ErrorMessage name="name" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" :disabled="loading">
                        <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                        ></span>
                        <span>Validate</span>
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
    name: "ValidateFile",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            content: yup.string().required("Shold be filled"),
        });

        return {
            loading: false,
            message: "",
            success: "",
            schema,
        };
    },
    methods: {
        handleValidateFile(data) {
            this.loading = true;

            FileService.validateFile(data).then(
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
    },
};
</script>