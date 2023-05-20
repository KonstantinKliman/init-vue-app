<template>
  <div>
    <h1>Your profile:</h1>
    <p>Email:{{ this.email }}</p>
    <p>First name: {{ this.firstname }}</p>
    <p>Last name: {{ this.lastname }}</p>
    <p>Middle name: {{ this.middlename }}</p>
    <p>Country: {{ this.country }}</p>
  </div>
</template>

<script>
import { getUserInfo } from "@/services/AuthService";

export default {
  data() {
    return {
      email:'',
      firstname:'',
      lastname:'',
      middlename: '',
      country: ''
    }
  },
  mounted() {
    this.getUserInfoOnPage()
  },
  methods: {
    async getUserInfoOnPage(){
      const userToken = localStorage.getItem('accessToken');
      const decodeAccessToken = JSON.parse(atob(userToken.split('.')[1]));
      const userId = decodeAccessToken.userId;
      const userInfo = await getUserInfo(userId, userToken);
      this.email = userInfo.email
      this.firstname = userInfo.profile.firstname
      this.lastname = userInfo.profile.lastname
      this.middlename = userInfo.profile.middlename
      this.country = userInfo.profile.country
    }
  }
}
</script>

<style scoped>

</style>