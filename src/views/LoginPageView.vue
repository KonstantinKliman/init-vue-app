<template>
  <div class="d-flex justify-center align-center flex-column h-screen">
    <loader-component v-if="componentData.isLoading"></loader-component>
    <v-card class="d-flex flex-column w-33 bg-green-lighten-4 pa-6 rounded border">
      <v-form>
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
            append-icon='mdi-login'
            class="w-100"
            :disabled="!isFormValid()"
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
      <alert-component
          :type="componentData.typeAlert"
          :message="otherData.errorMessage"
          :show="componentData.showAlert"
      />
    </v-card>
  </div>
</template>

<script>
import {getAccessToken, getUserInfo, login} from "@/services/AuthService";
import {capitalize} from "vue";
import {isFormValid, validateEmail, validatePassword} from "@/services/ValidationService";
import AlertComponent from "@/components/AlertComponent";

export default {
  components: {AlertComponent},
  data() {
    return{
      loginData:{
        email: '',
        password: ''
      },
      otherData:{
        userToken: '',
        userId: '',
        errorMessage: ''
      },
      componentData: {
        showPassword: false,
        showAlert: false,
        typeAlert: '',
        isLoading: false
      }
    }
  },
  computed: {
    emailRules() {
      return validateEmail(this.loginData.email)
    },
    passwordRules() {
      return validatePassword(this.loginData.password)
    }
  },
  methods: {
    async loginUser() {
      try {
        this.componentData.isLoading = true;
        await login(this.loginData.email, this.loginData.password);
        const userToken = await getAccessToken();
        const decodeAccessToken = JSON.parse(atob(userToken.split('.')[1]));
        const userId = decodeAccessToken.userId;
        const userInfo = await getUserInfo(userId, userToken);
        localStorage.setItem('accessToken', userToken);
        this.componentData.isLoading = false
        this.showAlertWithTimeout(`Welcome, ${capitalize(userInfo.profile.firstname)}!`, 'success')
        setTimeout(() => {
          this.$router.push('/');
        }, 2000);
      }
      catch (err) {
        this.componentData.isLoading = false;
        if (err.response.status === 401) {
          this.showAlertWithTimeout('Insert correct data', 'error')
        }
      }
    },
    showAlertWithTimeout(message, typeAlert) {
      this.otherData.errorMessage = message
      this.componentData.typeAlert = typeAlert
      this.componentData.showAlert = true;
      setTimeout(() => {
        this.componentData.showAlert = false;
      }, 5000);
    },
    isFormValid() {
      return isFormValid(this.loginData, 'login');
    }
  }
}
</script>

<style>

</style>
