<template>
    <div id="app_aaa">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <!-- <a href="/" class="navbar-brand">huhu</a> -->
            <div class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link :to="{name: 'Home'}" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item" v-if="showModeratorBoard">
                    <router-link to="/mod" class="nav-link">Moderator Board</router-link>
                </li>
                <li class="nav-item" v-if="showAdminBoard">
                    <router-link to="/admin" class="nav-link">Admin Board</router-link>
                </li>
                <li class="nav-item" v-if="currentUser">
                    <router-link to="/user" class="nav-link">User</router-link>
                </li>
                <li class="nav-item" >
                    <router-link to="/kanban" class="nav-link">Kanban</router-link>
                </li>
            </div>

            <div v-if="currentUser" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/profile" class="nav-link">{{ currentUser.username }}</router-link>
                </li>
                <li class="nav-item">
                    <a href="/login" class="nav-link" @click.prevent="logOut">LogOut</a>
                </li>
            </div>

            <div v-else class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/login" class="nav-link">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link">Sign Up</router-link>
                </li>
            </div>

        </nav>

        <div class="container mt-9">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        showModeratorBoard() {
            return this.$store.state.auth.user && this.$store.state.auth.user.roles.includes('ROLE_MODERATOR');
        },
        showAdminBoard() {
            return this.$store.state.auth.user && this.$store.state.auth.user.roles.includes('ROLE_ADMIN');
        },
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        },
    }
}
</script>