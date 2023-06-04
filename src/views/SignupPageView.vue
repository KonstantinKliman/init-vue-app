<template>
  <div class="d-flex justify-center align-center flex-column h-screen">
    <loader-component v-if="componentData.isLoading"></loader-component>
    <v-card class="d-flex flex-column w-33 bg-green-lighten-4 pa-6 rounded border">
      <v-form>
        <v-text-field
            label="First name"
            variant="solo-filled"
            type="text"
            color="green"
            v-model="signupData.firstname"
            :rules="nameRules"
            validate-on="blur"
            class="pb-1"
        />
        <v-text-field
            label="Last name"
            variant="solo-filled"
            type="text"
            color="green"
            v-model="signupData.lastname"
            :rules="nameRules"
            validate-on="blur"
            class="pb-1"
        />
        <v-text-field
            label="Middle name"
            variant="solo-filled"
            type="text"
            color="green"
            v-model="signupData.middlename"
            :rules="nameRules"
            validate-on="blur"
            class="pb-1"
        />
        <v-text-field
            label="Username"
            variant="solo-filled"
            type="text"
            color="green"
            v-model="signupData.userName"
            :rules="userNameRule"
            validate-on="blur"
            class="pb-1"
        />
        <v-autocomplete
            v-model="signupData.country"
            :items="componentData.countries"
            label="Country"
            variant="solo-filled"
            color="green"
            :rules="countryRules"
            validate-on="blur"
            class="pb-1"
        ></v-autocomplete>
        <v-text-field
            label="Email"
            variant="solo-filled"
            type="email"
            color="green"
            :rules="emailRules"
            v-model="signupData.email"
            validate-on="blur"
            class="pb-1"
        />
        <v-text-field
            label="Password"
            variant="solo"
            color="green"
            :type="componentData.showPassword ? 'text' : 'password'"
            :append-inner-icon="componentData.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:appendInner="componentData.showPassword = !componentData.showPassword"
            :rules="passwordRules"
            validate-on="blur"
            v-model="signupData.password"
            class="pb-1"
        />
        <v-btn
            color="green"
            text="Register"
            @click="signupUser"
            :disabled="!isFormValid()"
            class="w-100"
            append-icon="mdi-account-plus"
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
      <alert-component
        :type="componentData.typeAlert"
        :message="otherData.errorMessage"
        :show="componentData.showAlert"
      />
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import {signup, login, getAccessToken} from '@/services/AuthService';
import {
  validateEmail,
  validatePassword,
  validateCountry,
  validateName,
  validateUsername,
  isFormValid
} from '@/services/ValidationService';
import AlertComponent from "@/components/AlertComponent";

export default {
  components: {AlertComponent},
  data() {
    return {
      componentData: {
        countries: [],
        showPassword: false,
        showAlert: false,
        typeAlert: '',
        isLoading: false
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
      otherData: {
        userId: '',
        userToken: '',
        errorMessage: ''
      }
    };
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
            this.componentData.countries = res.data.map(country => country.name);
          })
          .catch(err => {
            console.error(err);
          })
    },
    isFormValid() {
      return isFormValid(this.signupData, 'registration');
    },
    showAlertWithTimeout(message, typeAlert) {
      this.otherData.errorMessage = message;
      this.componentData.typeAlert = typeAlert;
      this.componentData.showAlert = true;
      setTimeout(() => {
        this.componentData.showAlert = false;
      }, 5000);
    },
    async signupUser() {
      try {
        this.componentData.isLoading = true;
        await signup(
            this.signupData.userName,
            this.signupData.firstname,
            this.signupData.middlename,
            this.signupData.lastname,
            this.signupData.country,
            this.signupData.email,
            this.signupData.password
        );
        await login(this.signupData.email, this.signupData.password);
        const userToken = await getAccessToken();
        localStorage.setItem('accessToken', userToken);
        this.componentData.isLoading = false;
        this.showAlertWithTimeout('Registered.', 'success');
        setTimeout(() => {
          this.$router.push('/');
        }, 2000);
      }
      catch (err) {
        const errorMessage = err.response.data.errors.CreateError[0];
        this.componentData.isLoading = false;
        this.showAlertWithTimeout(errorMessage, 'error');
      }
    }
  },
};
</script>