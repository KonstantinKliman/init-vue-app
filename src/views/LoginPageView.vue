<template>
  <div class="d-flex justify-center align-center flex-column h-screen bg">
    <v-form class="d-flex flex-column w-33 bg-green-lighten-4 pa-5 rounded border">
      <v-text-field
          clearable
          label="Email"
          variant="solo-filled"
          type="email"
          color="green"
          v-model="loginData.email"
      />
      <v-text-field
          label="Password"
          variant="solo-filled"
          color="green"
          v-model="loginData.password"
          :type="componentData.showPassword? 'text' : 'password'"
          :append-inner-icon="componentData.showPassword? 'mdi-eye' : 'mdi-eye-off'"
          @click:appendInner="componentData.showPassword = !componentData.showPassword"
      />
      <v-btn
          color="green"
          text="Login"
          @click="loginUser"
      />
      <p 
          class="text-body-2 justify-space-between d-flex text-green-darken-4 pt-5"
      >
        Don`t have an account?
        <router-link
            to="/signup"
            class="text-decoration-none text-black text-green-darken-4 font-weight-bold"
        >Sign up</router-link>
      </p>
    </v-form>
  </div>
</template>

<script>
// import router from 'vue-router';
import { login, getAccessToken, getUserInfo } from "@/services/AuthService";

export default {
  data() {
    return{
      loginData:{
        email: '',
        password: ''
      },
      otherData:{
        userToken: '',
        userId: ''
      },
      componentData: {
        showPassword: false
      }
    }
  },
  methods: {
    async loginUser() {
      try {
        const loginResponse = await login(this.loginData.email, this.loginData.password);
        console.log(loginResponse)
        const userToken = await getAccessToken();
        const decodeAccessToken = JSON.parse(atob(userToken.split('.')[1]));
        const userId = decodeAccessToken.userId;
        const userInfo = await getUserInfo(userId, userToken);
        console.log(userInfo);
        localStorage.setItem('accessToken', userToken)
        this.$router.push('/');
      }
      catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style>

</style>
