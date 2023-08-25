<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" id="profile-img" />
            <Form @submit="handleRegister" :validation-schema="schema">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <Field
                            name="username"
                            type="text"
                            class="form-control"
                            id="username"
                        />
                        <ErrorMessage name="username" class="invalid-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <Field
                            name="email"
                            type="text"
                            class="form-control"
                            id="email"
                        />
                        <ErrorMessage name="email" class="invalid-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <Field
                            name="password"
                            type="password"
                            class="form-control"
                            id="password"
                        />
                        <ErrorMessage name="password" class="invalid-feedback" />
                    </div>

                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit" :disabled="isSubmitting">
                            <span v-if="isSubmitting" class="spinner-border spinner-border-sm"></span>
                            <span>Register</span>
                        </button>
                    </div>
                </div>
            </Form>

            <div
                v-if="message"
                class="alert alert-danger"
                :class="successful ? 'alert-success' : 'alert-danger'"
            >
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
    name: 'app-register',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            username: yup.string().required('username is required').min(3, 'username must be at least 3 characters').max(20, 'username must be at most 20 characters'),
            email: yup.string().required('email is required').email('email must be a valid email address'),
            password: yup.string().required('pw is required').min(6, 'pw must be at least 6 characters').max(40, 'pw must be at most 40 characters'),
        });

        return {
            message: '',
            successful: false,
            schema,
            isSubmitting: false,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push('/profile');
        }
    },
    methods: {
        handleRegister(user) {
            this.message = '';
            this.successful = false;
            this.isSubmitting = true;

            this.$store.dispatch('auth/register', user)
                .then((data) => {
                    this.message = data.message;
                    this.successful = true;
                })
                .catch(() => {
                    this.message = 'Registration failed!';
                    this.successful = false;
                })
                .finally(() => {
                    this.isSubmitting = false;
                });
            }
    },
}
</script>