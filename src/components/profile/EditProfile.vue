<template>
    <div class="container">
        <div class="row justify-content-md-center">
                <div class="card card-container">
                    <h5 class="card-title">Edit profile</h5>
                    <div v-if="Array.isArray(userData)" class="card-body">
                    <Form @submit="handleEditProfile" :validation-schema="schema">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <Field type="text" class="form-control" id="firstName" name="firstName" :value="userData[0].firstName" />
                            <ErrorMessage name="firstName" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <Field type="text" class="form-control" id="lastName" name="lastName" :value="userData[0].lastName" />
                            <ErrorMessage name="lastName" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <Field type="text" class="form-control" name="email" id="email" :value="userData[0].email" />
                            <ErrorMessage name="email" class="error-feedback" />
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
    name: "EditProfile",
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
            email: yup.string().required("Email is required!"),
            firstName: yup.string().required("First Name is required!"),
            lastName: yup.string().required("Last Name is required!"),
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
        handleEditProfile(newUserData) {
            this.loading = true;

            UserService.updateProfile(newUserData).then(
                () => {
                    let newUser = JSON.parse(localStorage.getItem('user'));
                    newUser.email = newUserData.email;
                    localStorage.setItem('user', JSON.stringify(newUser));
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