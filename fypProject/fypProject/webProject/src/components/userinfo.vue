<template>
  <div class="">

    <header class="w3-container w3-light-gray">
      <div class="w3-btn w3-round-xlarge w3-padding-small" @click="backPage()"><i class="material-icons">keyboard_arrow_left</i></div>
    </header>


<div class="w3-center w3-container w3-border-top	w3-border-bottom w3-padding-16">
  <img :src="infoList.profileIMG" width="" height="212">
</div>

<div v-if="errorCode == 112" class="w3-large w3-text-red w3-center" >
  Fail to load user information
</div>

<div class="w3-bar  w3-border-bottom  ">
  <span class="w3-bar-item">UserID</span>
  <span class="w3-bar-item">{{infoList.userID}}</span>
</div>

<div class="w3-bar  w3-border-bottom ">
  <div class="w3-bar-item">Chinese Name</div>
  <div class="w3-bar-item">{{infoList.chiName}}</div>
</div>

<div class="w3-bar  w3-border-bottom ">
  <div class="w3-bar-item">English Name</div>
  <div class="w3-bar-item">{{infoList.engName}}</div>
</div>

<div class="w3-container">
  <p></p>
  <p></p>
</div>

<p><b><h5>Personal Information</h5></b></p>

<div class="w3-bar w3-border-bottom w3-border-top">
  <div class="w3-bar-item">Contact Number</div>
  <div class="w3-bar-item">{{infoList.telNo}}</div>
</div>

<div class="w3-bar  w3-border-bottom">
  <div class="w3-bar-item">Email</div>
  <div class="w3-bar-item">{{infoList.email}}</div>
</div>

<div class="w3-bar  w3-border-bottom">
  <div class="w3-bar-item">WeChat ID</div>
  <div class="w3-bar-item">{{infoList.WeChatID}}</div>
</div>

<div class="w3-container w3-center w3-padding-32">
<router-link :to="{ name: 'editinfo', params: {userID: userID} }"><input type="button" class="w3-button w3-black w3-text-white w3-margin-right" value="Edit"></router-link>
<router-link to="/"><button class="w3-button w3-black w3-text-white w3-margin-right">Logout</button></router-link>
</div>


</div>
</template>

<script>
import axios from 'axios';
import router from '../router'
export default {
  data () {
    return {
        infoList: [],
        errorCode: "",
        userID: ""
    }
  },

    methods:{
      backPage: function() {
        router.go(-1);
      }
    },

    created() {
      this.userID = this.$route.params.userID;
      axios.post('http://localhost:3000/user_information',{
        userID: this.userID
        })
      .then(response => {
        console.log(response);
        this.infoList = response.data.rows[0];
        this.errorCode = response.data.code;
        console.log(this.infoList);
        console.log(this);
        })
    }
}

//past all user info through url
</script>

<style scoped>

</style>
