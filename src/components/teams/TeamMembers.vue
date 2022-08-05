<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams">Go to view</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';
// injecting team members...

export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: 'Test',
      members: [],
    };
  },

  methods:{
    loadTeamMemebers(teamId)
    {
    // $route the gives access to various informaiton
    // const teamId = route.params.teamId;

    // Now taking teamId as props
    const selectedTeam = this.teams.find((team) => team.id === teamId);
    const members = selectedTeam.members;
    const selectedMembers = [];
    for (const member of members) {
      const selectedUser = this.users.find((user) => user.id === member);
      selectedMembers.push(selectedUser);
    }

    this.members = selectedMembers;
    this.teamName = selectedTeam.name;

    }

  },
  created() {
    this.loadTeamMemebers(this.teamId);
  },

  // watchers watch the data properties and can also take as argument the name value for data property
  // watchers also takes the oldvalue as argument
  watch: {
    teamId(newId, oldId){
      console.log(newId, oldId);
      this.loadTeamMemebers(newId);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
