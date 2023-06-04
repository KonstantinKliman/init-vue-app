<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list class="d-flex justify-space-between flex-column h-100">
      <div>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.route" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div class="d-flex justify-center align-content-end">
        <v-btn
            class="w-75"
            @click="logout"
            append-icon="mdi-logout"
            color="green"
        >
          Logout
        </v-btn>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        {
          title: 'Home page',
          icon: 'mdi-home',
          route: '/'
        },
        {
          title: 'About us',
          icon: 'mdi-information',
          route: '/about'
        },
        {
          title: 'Contacts',
          icon: 'mdi-email',
          route: '/contacts'
        }
      ]
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('accessToken');
      this.$router.push('/login');
    }
  }
};
</script>
