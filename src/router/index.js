import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignupPage from '../views/SignupPage.vue';
import Dashboard from '../views/Dashboard.vue';
import Tickets from '../views/Tickets.vue';
import NotFound from '../views/NotFound.vue';
import { getSession } from '../services/authService';
import { toast } from 'vue3-toastify';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/auth/login', name: 'Login', component: LoginPage },
  { path: '/auth/signup', name: 'Signup', component: SignupPage },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', name: 'Tickets', component: Tickets, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: "NotFound", component: NotFound}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const session = getSession();

  if (to.meta.requiresAuth) {
    if (!session) {
      next("/auth/login");
    } else if (new Date(session.expireAt) > new Date()) {
      next();
    } else {
      toast.error("Your session has expired — please log in again.");
      next("/auth/login");
    }
  } else {
    next();
  }
});

export default router;