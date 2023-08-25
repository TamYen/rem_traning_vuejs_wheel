import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

const Profile = () => import('./components/Profile.vue');
const BoardUser = () => import('./components/BoardUser.vue');
const BoardModerator = () => import('./components/BoardModerator.vue');
const BoardAdmin = () => import('./components/BoardAdmin.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/user',
        name: 'BoardUser',
        component: BoardUser
    },
    {
        path: '/mod',
        name: 'BoardModerator',
        component: BoardModerator
    },
    {
        path: '/admin',
        name: 'BoardAdmin',
        component: BoardAdmin
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        return next('/login');
    } else {
        next();
    }
});

export default router;