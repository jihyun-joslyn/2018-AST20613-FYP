<template>
<div class="w3-padding-small">
  <h1 class="w3-container w3-xxxlarge w3-margin-bottom">Login Page</h1>
  <form class="w3-container w3-margin-top" name="userLogin">
    <div class="">
    <mt-field label="User ID" placeholder="User ID" type="text" v-model="userID" class="w3-border-0 w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="userID"></mt-field>
    <p class="w3-text-red">{{ errors.first('userID') }}</p>

<!--    <p class="w3-text-red" v-if="submitClick&&!IDbool&&!PWDbool">Account Not Exist!</p> -->
  </div>
  <div class="">
    <mt-field label="Password" placeholder="Password" type="password" v-model="userPWD" class="w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="password"></mt-field>
    <p class="w3-text-red">{{ errors.first('password') }}</p>
<!--    <p class="w3-text-red" v-if="submitClick&&IDbool&&!PWDbool">Wrong Password!</p> -->
  </div>
  <br>
  <div class="w3-center">
    <p class="w3-text-green w3-btn"><router-link :to="{name: 'salesLogin'}"><u>Login as salesmen</u></router-link></p>
  </div>
    <p class="w3-margin-top w3-center w3-bar"><button class="w3-btn w3-medium w3-green w3-margin-left w3-margin-right" @click.prevent="submitClick = true, postUser()">Login</button><button class="w3-btn w3-medium w3-green w3-margin-left w3-margin-right" ><router-link :to="{name: 'register'}">Register</router-link></button></p>
  </form>

</div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'mint-ui';
import router from '../router'
import { Field } from 'mint-ui';

export default {
  data() {
    return {
      userID: "",
      userPWD: "",
      errorCode: "",
      dbID: "",
      dbPWD: "",
      proceed: false,
      IDbool: false,
      PWDbool: false,
      submitClick: false,
      errorCode: 9,
      result: []
    }
  },
  methods: {
    postUser: function() {
      axios.post('http://localhost:3000/login', {
        userID: this.userID
      }).then((response) => {
        console.log(response);
        this.errorCode = response.data.code;
        this.result = response.data.results;
        if(this.errorCode == 203)
        {
          this.dbID = response.data.results[0].userID;
          this.dbPWD = response.data.results[0].password;
        }
        console.log(this.result);
        console.log(this.dbID, this.dbPWD);

        if(this.errorCode == 203)
        {
          console.log('go in error code 203');

          if((this.userID == this.dbID) && (this.userPWD == this.dbPWD))
          {
            console.log('all correct');

            this.proceed = true;
            this.IDbool = true;
            this.PWDbool = true;

            router.push({name: 'events', params: {userID: this.userID}});
          }
          else if((this.userID == this.dbID) && (this.userPWD != this.dbPWD))
          {
            console.log('password wrong');

            this.proceed = false;
            this.IDbool = true;
            this.PWDbool = false;

            Toast({
              message: 'Wrong Password',
              position: 'bottom',
              duration: 5000
            });
          }
        }
        else {
          console.log('all wrong');

          this.proceed = false;
          this.IDbool = false;
          this.PWDbool = false;

          Toast({
            message: 'Account not exist',
            position: 'bottom',
            duration: 5000
          });
        }
      })
    }

  }
}
</script>

<style>

</style>
