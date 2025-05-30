import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue'
import MainDashboard from '../views/Dashboard.vue';
import ManageChargers from '../views/ManageChargers.vue';
import ChargerList from '../views/ChargerList.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: MainDashboard },
  { path: '/manage', component: ManageChargers },
  { path: '/chargers', component: ChargerList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})


export default router;
