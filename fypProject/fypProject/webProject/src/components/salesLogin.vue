<template>
<div class="w3-padding-small">
  <h1 class="w3-container w3-xxxlarge w3-margin-bottom">Login Page</h1>
  <form class="w3-container w3-margin-top" name="userLogin">
    <div class="">
    <mt-field label="Sales ID" placeholder="Sales ID" type="text" v-model="salesID" class="w3-border-0 w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="salesID"></mt-field>
    <p class="w3-text-red">{{ errors.first('salesID') }}</p>
  </div>
  <div class="">
    <mt-field label="Password" placeholder="Password" type="password" v-model="salesPWD" class="w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="password"></mt-field>
    <p class="w3-text-red">{{ errors.first('password') }}</p>
  </div>
  <br>
  <div class="w3-center">
    <p class="w3-text-green w3-btn"><router-link to="/"><u>Login as user</u></router-link></p>
  </div>
    <p class="w3-margin-top w3-center w3-bar"><button class="w3-btn w3-medium w3-green w3-margin-left w3-margin-right" @click.prevent="submitClick = true, checkSales()">Login</button><button class="w3-btn w3-medium w3-green w3-margin-left w3-margin-right" ><router-link :to="{name: 'salesRegister'}">Register</router-link></button></p>
  </form>
</div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui';
import router from '../router'

export default {
  data() {
    return {
      salesID: "",
      salesPWD: "",
      dbID: "",
      dbPWD: "",
      errorCode: "",
      submitClick: false,
      proceed: false,
      IDbool: false,
      PWDbool: false
    }
  },

  methods: {
    checkSales: function() {
      axios.post('http://localhost:3000/sales_login', {
        salesID: this.salesID
      }).then((response) => {
        console.log(response);
        this.errorCode = response.data.code;
        this.dbID = response.data.results[0].salesID;
        this.dbPWD = response.data.results[0].password;
       console.log(this.dbID);

      if(this.errorCode == 203)
      {
        console.log("go into error code 203");

        if((this.salesID == this.dbID) && (this.salesPWD == this.dbPWD))
        {
          console.log("all correct");

          this.proceed = true;
          this.IDbool = true;
          this.PWDbool = true;

          router.push({name: 'article', params: {salesID: this.salesID}})
        }
        else if((this.salesID == this.dbID) && (this.salesPWD != this.dbPWD))
        {
          console.log("password wrong");

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
        console.log("all wrong");

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
