<template>
  <v-app>
    <NavigationComponent ref="navigationComponent" @toggle-menu="toggleMenu"></NavigationComponent>

    <v-app-bar app class="bg-green-lighten-4">
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <p>Welcome to {{ pageTitle }}</p>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent";

export default {
  name: 'ContactsPageView',
  components: {
    NavigationComponent
  },
  computed: {
    pageTitle() {
      // Получение заголовка страницы на основе текущего маршрута
      const route = this.$route;
      const menuItems = this.$options.components.NavigationComponent.data().menuItems;
      const menuItem = menuItems.find(item => item.route === route.path);
      return menuItem ? menuItem.title : 'Page not found';
    }
  },
  methods: {
    toggleMenu() {
      if (this.$refs.navigationComponent) {
        this.$refs.navigationComponent.drawer = !this.$refs.navigationComponent.drawer;
      }
    }
  }
};
</script>
