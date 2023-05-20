<template>
  <div class="d-flex justify-center align-center flex-column h-screen bg">
    <v-form class="d-flex flex-column w-33 bg-green-lighten-4 pa-6 rounded border">
      <v-text-field
          label="First name"
          variant="solo-filled"
          type="text"
          color="green"
          v-model="signupData.firstname"
          :rules="nameRules"
          validate-on="blur"
      />
      <v-text-field
          label="Last name"
          variant="solo-filled"
          type="text"
          color="green"
          v-model="signupData.lastname"
          :rules="nameRules"
          validate-on="blur"
      />
      <v-text-field
          label="Middle name"
          variant="solo-filled"
          type="text"
          color="green"
          v-model="signupData.middlename"
          :rules="nameRules"
          validate-on="blur"
      />
      <v-text-field
          label="Username"
          variant="solo-filled"
          type="text"
          color="green"
          v-model="signupData.userName"
          :rules="userNameRule"
          validate-on="blur"
      />
      <v-autocomplete
          v-model="signupData.country"
          :items="componentData.countries"
          label="Country"
          variant="solo-filled"
          color="green"
          :rules="countryRules"
          validate-on="blur"
      ></v-autocomplete>
      <v-text-field
          label="Email"
          variant="solo-filled"
          type="email"
          color="green"
          :rules="emailRules"
          v-model="signupData.email"
          validate-on="blur"
      />
      <v-text-field
          label="Password"
          variant="solo"
          color="green"
          :type="componentData.showPassword? 'text' : 'password'"
          :append-inner-icon="componentData.showPassword? 'mdi-eye' : 'mdi-eye-off'"
          @click:appendInner="componentData.showPassword = !componentData.showPassword"
          :rules="passwordRules"
          validate-on="blur"
          v-model="signupData.password"
      />
      <v-btn
          color="green"
          text="Register"
          @click="signupUser"
          :disabled="!isFormValid()"
      />
      <p
          class="text-body-2 justify-space-between d-flex text-green-darken-4 pt-6"
      >
        Already have an account?
        <router-link
            to="/login"
            class="text-decoration-none text-black text-green-darken-4 font-weight-bold"
        >Login
        </router-link>
      </p>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import {signup, login, getAccessToken, getUserInfo} from '@/services/AuthService'
import {
  validateEmail,
  validatePassword,
  validateCountry,
  validateName,
  validateUsername,
  isFormValid
} from '@/services/ValidationService';

export default {
  data() {
    return {
      componentData: {
        countries: [],
        showPassword: false
      },
      signupData: {
        userName: '',
        firstname: '',
        lastname: '',
        middlename: '',
        country: null,
        email: '',
        password: ''
      },
      loginData: {},
      otherData: {
        userId: '',
        userToken: ''
      }
    };
  },
  created() {
    this.loginData = {
      email: this.signupData.email,
      password: this.signupData.password
    }
  },
  computed: {
    emailRules() {
      return validateEmail(this.signupData.email);
    },
    passwordRules() {
      return validatePassword(this.signupData.password);
    },
    countryRules() {
      return validateCountry(this.signupData.country, this.componentData.countries);
    },
    nameRules() {
      return validateName(this.signupData.firstname);
    },
    userNameRule() {
      return validateUsername(this.signupData.userName);
    },
  },
  mounted() {
    this.fetchCountries();
  },
  methods: {
    fetchCountries() {
      axios.get('https://restcountries.com/v2/all')
          .then(res => {
            this.componentData.countries = res.data.map(country => country.name)
          })
          .catch(err => {
            console.error(err)
          })
    },
    isFormValid() {
      return isFormValid(this.signupData);
    },
    async signupUser() {
      try {
        const signupResponse = await signup(
            this.signupData.userName,
            this.signupData.firstname,
            this.signupData.middlename,
            this.signupData.lastname,
            this.signupData.country,
            this.signupData.email,
            this.signupData.password
        )
        console.log(signupResponse)
        const loginResponse = await login(this.signupData.email, this.signupData.password);
        console.log(loginResponse)
        const userToken = await getAccessToken();
        const decodeAccessToken = JSON.parse(atob(userToken.split('.')[1]));
        const userId = decodeAccessToken.userId;
        const userInfo = await getUserInfo(userId, userToken);
        console.log(userInfo);
      }
      catch (err) {
        console.error(err)
      }
    }
  },
};
</script>