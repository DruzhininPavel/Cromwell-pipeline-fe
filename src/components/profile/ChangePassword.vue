<template>
    <div class="container">
        <div class="row justify-content-md-center">
                <div class="card card-container">
                    <h5 class="card-title">Edit profile</h5>
                    <div v-if="Array.isArray(userData)" class="card-body">
                    <Form @submit="handleChangePassword" :validation-schema="schema">
                        <div class="form-group">
                            <label for="currentPassword">Enter Current Password</label>
                            <Field type="password" class="form-control" id="currentPassword" name="currentPassword" />
                            <ErrorMessage name="currentPassword" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="newPassword">Enter New Password</label>
                            <Field type="password" class="form-control" id="newPassword" name="newPassword" />
                            <ErrorMessage name="newPassword" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="repeatPassword">Repeat New Password</label>
                            <Field type="password" class="form-control" id="repeatPassword" name="repeatPassword" />
                            <ErrorMessage name="repeatPassword" class="error-feedback" />
                        </div>

                        <div class="form-group">
                            <button class="btn btn-primary btn-block" :disabled="loading">
                            <span
                                v-show="loading"
                                class="spinner-border spinner-border-sm"
                            ></span>
                            <span>Submitt</span>
                            </button>
                        </div>
                        <div class="form-group">
                            <router-link class="btn btn-danger btn-block" :to="'/profile/'">Cancel</router-link>
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
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UserService from "../../services/user.service"
export default {
    name: "ChangePassword",
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            currentPassword: yup.string().required("Password is required!"),
            newPassword: yup.string().required("Re Password is required!"),
            repeatPassword: yup.string().required("Re Password is required!"),
        });

        return {
            loading: false,
            message: "",
            schema,
            userData: {},
        };
    },
    beforeCreate() {
        UserService.getUserProfile(this.$store.state.auth.user.email).then(
        (response) => {
            this.userData = response.data;
        },
        (error) => {
            this.userData =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        }
        );
    },
    methods: {
        handleChangePassword(passwords) {
            this.loading = true;
            // currentPassword: Password, newPassword: Password, repeatPassword: Password

            UserService.updatePassword(passwords).then(
                () => {
                    this.$router.push("/profile");
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