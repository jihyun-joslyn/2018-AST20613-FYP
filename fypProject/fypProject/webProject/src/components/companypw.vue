<template>
  <div>
    <header class="w3-light-gray w3-container ">
      <div class="w3-right w3-margin-right w3-margin-top">
        <span class="w3-btn w3-round w3-white w3-margin-right w3-padding-small"><i class="w3-circle w3-gray w3-text-white small material-icons">person_outline</i><span class="">{{companyID}}</span></span>
        <button class="w3-btn w3-margin-left w3-black"><router-link :to="{name: 'companyLogin'}">Log Out</router-link></button>
      </div>
    </header>

    <div class="w3-container">
    <div class="w3-panel w3-padding-16 w3-dark-gray">
      <span class="w3-left w3-text-white">ALL EVENTS</span>
      <button class="w3-btn w3-tiny w3-white w3-text-dark-gray w3-right"><router-link :to="{ name: 'comEventRes', params: {companyID: companyID} }">ADD EVENT</router-link></button>
    </div>

    <div class="w3-dark-gray w3-sidebar w3-bar-block" style="width:20%">
      <div class="w3-xxlarge w3-text-white w3-dark-gray w3-sidebar w3-bar-block" style="width:20%">
       <a href="" class="w3-bar-item w3-button w3-padding-64 w3-border-bottom"><router-link :to="{ name: 'companyHome', params: {companyID: companyID} }">Event Information</router-link></a>
       <a href="" class="w3-bar-item w3-button w3-padding-64 w3-border-bottom"><router-link :to="{ name: 'comEventRes', params: {companyID: companyID} }">Create Event</router-link></a>
     </div>
    </div>

    <div class="w3-margin-right w3-container w3-white w3-padding-large" style="margin-left:20%">
        <div class="w3-col" style="width:50%">
          <p><b><h5>Change Password</h5></b></p>
          <ul>
            <li class="w3-bar">
              <span class="w3-bar-item">Original password</span>
              <span class="w3-bar-item"><input v-model="password" class="w3-input" type="password" placeholder="original password"></span>
            </li>

            <li class="w3-bar">
              <span class="w3-bar-item">New Password</span>
              <span class="w3-bar-item"><input v-model="newpw" class="w3-input" type="password" placeholder="new password" name="newpw"></span>
            </li>

            <li class="w3-bar">
              <span class="w3-bar-item">Confirm new password</span>
              <span class="w3-bar-item"><input v-model="secondin" v-validate="{ is: newpw }" class="w3-input" type="password" placeholder="Confirm new password" name="secondin"></span><br>
              <p class="w3-text-red">{{ errors.first('secondin') }}</p>
            </li>
          </ul>
          <div class="w3-container w3-center w3-padding-32">
            <button  v-on:click.prevent="update()" class="w3-btn w3-text-white w3-black">Save</button>
          </div>
        </div>
        <div v-if="!PWDbool">
          <b-alert variant="danger" dismissible v-model="showDismissibleAlert">
            Wrong Password!
          </b-alert>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'mint-ui';
import router from '../router'



export default {
  data() {
    return{
      companyID: "",
      password:"",
      newpw:"",
      secondin:"",
      companyName:"",
      website:"",
      errorCode:"",
      cinfoList:[],
      dbPWD: "",
      PWDbool: false,
      showDismissibleAlert: false

    }
  },
  methods: {
    update: function() {
      if(this.dbPWD == this.password){
        this.PWDbool = true;
        axios.post('http://localhost:3000/comNewPWD', {
          password: this.password,
          companyID: this.companyID
        }).then(response => {
          console.log(response);
          this.errorCode = response.data.code;

          router.push({name: 'companyinfo', param: {companyID: this.companyID}});
        })
      }
      else{
        this.PWDbool = false;
        this.showDismissibleAlert = true;
      }
  }

  },

  created() {
    this.companyID = this.$route.params.companyID;
    axios.post('http://localhost:3000/companyPWD', {
      companyID: this.companyID
    }).then(response => {
      console.log(response);
      this.dbPWD = response.data.results[0].password;
    })
  },

  components: {

  }

}
</script>

<style>
body {
  background-color: #f1f1f1;
}

</style>
