<template>
  <div class="w3-padding-small">
  <h1 class="w3-container w3-margin-bottom w3-xxxlarge">Register Page</h1>
  <form class="w3-container w3-margin-top" name="userRegister">
    <div class="">
    <mt-field label="User ID" placeholder="User ID" type="text" v-model="userID" class="w3-border-0 w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="userID"></mt-field>
    <span class="w3-text-red">{{ errors.first('userID') }}</span>
  </div>

  <div class="">
    <mt-field label="Password" placeholder="Password" type="password" v-model="userPWD" class="w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="password"></mt-field>
    <span class="w3-text-red">{{ errors.first('password') }}</span>
  </div>

  <div class="">
    <mt-field label="Contact Number" v-validate="{length:11, required: true}" type="tel" placeholder="Contact Number" v-model="telNo" name="contact_number" class="w3-margin-bottom w3-col s12 m12 l12"></mt-field>
    <ul class="w3-text-red">
      <li v-for="error in errors.collect('contact_number')">{{ error }}</li>
    </ul>
  </div>
  <span v-if="submitClick&&!registerSuccess">
    <br>
    <p class="w3-text-red">Account already exists!</p>
  </span>
<br>
<div class="w3-center">
  <p class="w3-btn w3-text-green"><router-link to="/"><u>Already have an account?</u></router-link></p>
  <p class="w3-btn w3-text-green"><router-link :to="{name: 'salesRegister'}"><u>Register as salesmen</u></router-link></p>
</div>
  <p class="w3-center"><button class="w3-btn w3-large w3-medium w3-green w3-margin-left w3-margin-right" @click.prevent="submitClick = true, checkInput()">Register</button></p>
</form>
</div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'mint-ui';
import router from '../router'

export default {
  data() {
    return {
      userID: "",
      userPWD: "",
      engName: "",
      chiName: "",
      telNo: "",
      submitClick: "",
      errorCode: "",
      registerSuccess: false
    }
  },

  methods: {
    checkInput: function() {
      axios.post('http://localhost:3000/register', {
        userID: this.userID,
        password: this.userPWD,
        telNo: this.telNo
      }).then((response) => {
        console.log(response);
        this.errorCode = response.data.code;
        console.log(this.errorCode);

        if(this.errorCode != 104)
        {
          this.registerSuccess = true;

          Toast({
            message: 'Registration success',
            position: 'bottom',
            duration: 5000
          });
          router.push("/");
        }
        else {
          this.registerSuccess = false;
          Toast({
            message: 'Account already exist',
            position: 'bottom',
            duration: 5000
          });
        }
      })
    }
  },

  components: {

  }

}
</script>

<style>

</style>
