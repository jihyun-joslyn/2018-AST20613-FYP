<template>
  <div class="w3-padding-small">
  <h1 class="w3-container w3-margin-bottom w3-xxxlarge">Register Page</h1>
  <form class="w3-container w3-margin-top" name="userRegister">
    <div class="">
    <mt-field label="Sales ID" placeholder="Sales ID" type="text" v-model="salesID" class="w3-border-0 w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="salesID"></mt-field>
    <span class="w3-text-red">{{ errors.first('salesID') }}</span>
  </div>

  <div class="">
    <mt-field label="Password" placeholder="Password" type="password" v-model="salesPWD" class="w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="password"></mt-field>
    <span class="w3-text-red">{{ errors.first('password') }}</span>
  </div>

  <div class="">
    <mt-field label="Contact Number" v-validate="{length:11, required: true}" type="tel" placeholder="Contact Number" v-model="telNo" name="contact_number" class="w3-margin-bottom w3-col s12 m12 l12"></mt-field>
    <ul class="w3-text-red">
      <li v-for="error in errors.collect('contact_number')">{{ error }}</li>
    </ul>
  </div>

  <div class="">
    <p>Organization
    <select v-validate="{required: true}" class="w3-select w3-input w3-margin-bottom w3-margin-top w3-col s12 m12 l12" name="organization" v-model="companyID">
      <option value="" disabled selected>Please select one</option>
      <option v-for="com in comList" v-bind:value="com.companyID">
        {{com.companyName}}
      </option>
    </select></p>
    <span class="w3-text-red">{{ errors.first('organization') }}</span>
  </div>

  <span v-if="submitClick&&!registerSuccess">
    <br>
    <p class="w3-text-red">Account already exist!</p>
  </span>
<br>
<div class="w3-center">
  <p class="w3-btn w3-text-green"><router-link :to="{name: 'salesLogin'}"><u>Already have an account?</u></router-link></p>
  <p class="w3-btn w3-text-green"><router-link to="/"><u>Register as user</u></router-link></p>
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
      salesID: "",
      salesPWD: "",
      telNo: "",
      submitClick: "",
      errorCode: "",
      companyID: "",
      comList: [],
      companyID: "",
      registerSuccess: false,
      QRcode: ""
    }
  },

  methods: {
    checkInput: function() {
      this.QRcode = location.host + "/#/salesInfoPage/"+ this.salesID;
      axios.post('http://localhost:3000/sales_register', {
        salesID: this.salesID,
        password: this.salesPWD,
        companyID: this.companyID,
        telNo: this.telNo,
        QRcode: this.QRcode
      }).then((response) => {
        console.log(response);
        this.errorCode = response.data.code;
      //  console.log(this.errorCode);

      if(this.errorCode != 104)
      {
        this.registerSuccess = true;
        router.push("salesLogin");
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

  created() {
    axios.get('http://localhost:3000/getCompany')
    .then(response => {
      console.log(response);
      this.comList = response.data.result;
    })
  }

}
</script>

<style>
</style>
