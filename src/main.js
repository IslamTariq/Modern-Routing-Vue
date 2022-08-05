import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import TeamsLists from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers';
import App from './App.vue';

const router = createRouter({
  //  To keep the record of web history
  history: createWebHistory(),
  // Registering Components
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      component: TeamsLists,
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    }, //can use alias as alternative of redirect but won't get path on url
    { name: 'users', path: '/users', component: UsersList },
    // Dynamic Component, Manuplating Component by passing the props, Ordering also metters while passing the params to path.
    // By making props true we can take data as props from another component

    { path: '/:notFound(.*)', redirect: '/teams' },
  ],

  LinkExactActiveClass: 'active',
});
const app = createApp(App);

// using router
app.use(router);

app.mount('#app');
