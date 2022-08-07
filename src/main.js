import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import TeamsLists from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';
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
      components: {default: TeamsLists, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    }, //can use alias as alternative of redirect but won't get path on url
    { name: 'users', path: '/users', components: {default: UsersList, footer: UsersFooter} },
    // Dynamic Component, Manuplating Component by passing the props, Ordering also metters while passing the params to path.
    // By making props true we can take data as props from another component

    { path: '/:notFound(.*)', redirect: '/teams' },
  ],

  LinkExactActiveClass: 'active',
  // Manuplating Scrolling behaviour
  scrollBehavior(_, _2, savedPosition)
  {
    if (savedPosition)
    {
      return savedPosition
    }
    return{ left: 0, top: 0};
  }
});

// Navigation gaurd for authentications
router.beforeEach(function(to, from, next)
{
  console.log('Global beforeEach');
  console.log(to, from);

  // if (to.name === 'team-members')
  // {
  //   next();
  // }
  // else {
  //   next({name: 'team-members', params: {teamId: 't2'}});
  // }

  next();

});
const app = createApp(App);

// using router
app.use(router);

app.mount('#app');
