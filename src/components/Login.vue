<template>
    <div class="col=md-12">
        <div class="card card-container">
            <!-- <img class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" id="profile-img" /> -->
            <Form @submit="handleLogin" :validation-schema="schema">
                <div class="form-group">
                    <label for="username">Username</label>
                    <Field
                        name="username"
                        type="text"
                        class="form-control"
                        id="username"
                    />
                    <ErrorMessage name="username" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <Field
                        name="password"
                        type="password"
                        class="form-control"
                        id="password"
                    />
                    <ErrorMessage name="password" />
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block" type="submit" :disabled="isSubmitting">
                        <span v-if="isSubmitting" class="spinner-border spinner-border-sm"></span>
                        <span>Login</span>
                    </button>
                </div>

                <div v-if="message" class="alert alert-danger" role="alert">
                    {{ message }}
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
    name: 'app-login',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            username: yup.string().required('username is required'),
            password: yup.string().required('pw is required'),
        });

        return {
            username: '',
            password: '',
            message: '',
            isSubmitting: false,
            schema,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push('/profile');
        }
    },
    methods: {
        handleLogin(user) {
            this.isSubmitting = true;

            this.$store
                .dispatch('auth/login', user)
                .then(() => {
                    this.$router.push('/profile');
                })
                .catch((error) => {
                    this.message = error.response.data.message;
                })
                .finally(() => {
                    this.isSubmitting = false;
                });
        }
    },
}
</script>