import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import SignUp from '../components/SignUp.vue';
import DashBoard from '../components/DashBoard.vue';
import CampingSpot from '../components/CampingSpot.vue';
import UserBookings from '../components/UserBookings.vue';
import AdminComponent from '../components/AdminComponent.vue';
import UserInfo from '../components/UserInfo.vue'; // Import UserInfo.vue
import AppHeader from '../components/AppHeader.vue';

const routes = [
  {
    path: '/LoginForm',
    name: 'LoginForm',
    components: {
      default: LoginForm,
      header: AppHeader
    }
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    components: {
      default: SignUp,
      header: AppHeader
    }
  },
  {
    path: '/DashBoard',
    name: 'DashBoard',
    components: {
      default: DashBoard,
      header: AppHeader
    }
  },
  {
    path: '/CampingSpot',
    name: 'CampingSpot',
    components: {
      default: CampingSpot,
      header: AppHeader
    }
  },
  {
    path: '/UserBookings',
    name: 'UserBookings',
    components: {
      default: UserBookings,
      header: AppHeader
    }
  },
  {
    path: '/admin',
    name: 'AdminComponent',
    components: {
      default: AdminComponent,
      header: AppHeader
    }
  },
  {
    path: '/UserInfo', // Updated path for UserInfo component
    name: 'UserInfo',
    components: {
      default: UserInfo,
      header: AppHeader
    },
    props: {
      default: true // Pass route params as props to UserInfo component if needed
    }
  },
  {
    path: '/',
    redirect: '/LoginForm'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
