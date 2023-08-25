<template>
    <div class="contaner">
        <header class="jumbotron">
            <h3>{{ content }}</h3>
        </header>
    </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    name: 'app-home',
    data() {
        return {
            content: '',
        };
    },
    mounted() {
        UserService.getPublicContent()
            .then((response) => {
                this.content = response.data;
            })
            .catch((error) => {
                this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            });
    },
};
</script>