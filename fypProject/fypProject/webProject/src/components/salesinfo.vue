<template>
  <div class="">

    <div class="w3-container w3-light-gray">
      <div class="w3-btn w3-round-xlarge w3-padding-small" @click="backPage()"><i class="material-icons">keyboard_arrow_left</i></div>
    </div>


<div class="w3-center w3-container w3-border-top	w3-border-bottom w3-padding-16">
  <img :src="sinfoList.profileIMG" height="212">
</div>

<div v-if="errorCode == 111" class="w3-large w3-text-red w3-center" >
  Fail to load the sales information
</div>

<div class="w3-bar  w3-border-bottom  ">
  <span class="w3-bar-item">SalesID</span>
  <span class="w3-bar-item">{{sinfoList.salesID}} </span>
</div>

<div class="w3-bar  w3-border-bottom ">
  <div class="w3-bar-item">Chinese Name</div>
  <div class="w3-bar-item"> {{sinfoList.chiName}} </div>
</div>

<div class="w3-bar  w3-border-bottom ">
  <div class="w3-bar-item">English Name</div>
  <div class="w3-bar-item">{{sinfoList.engName}}</div>
</div>

<div class="w3-container">
  <p></p>
  <p></p>
</div>

<p><b><h5>Personal Information</h5></b></p>

<div class="w3-bar w3-border-bottom w3-border-top">
  <div class="w3-bar-item">Contact Number</div>
  <div class="w3-bar-item">{{sinfoList.telNo}} </div>
</div>

<div class="w3-bar  w3-border-bottom">
  <div class="w3-bar-item">Email</div>
  <div class="w3-bar-item"> {{sinfoList.email}}</div>
</div>

<div class="w3-bar  w3-border-bottom">
  <div class="w3-bar-item">WeChat ID</div>
  <div class="w3-bar-item"> {{sinfoList.WeChatID}}</div>
</div>

<div class="w3-bar  w3-border-bottom">
  <div class="w3-bar-item">Introduction</div>
  <div class="w3-bar-item">{{sinfoList.introduction}}</div>
</div>

<div class="w3-container w3-center w3-padding-32">
<router-link :to="{ name: 'salesedit', params: {salesID: salesID} }"><button class="w3-button w3-black w3-text-white w3-margin-right">Edit</button></router-link>
<router-link :to="{ name: 'salesLogin'}"><button class="w3-btn w3-black w3-text-white w3-margin-left">Logout</button></router-link>
</div>


</div>
</template>

<script>
import axios from 'axios';
import router from '../router'
export default {
  data () {
    return {
      sinfoList: [],
      errorCode:"",
      salesID: ""
    }
  },

    methods:{
      backPage: function() {
        router.go(-1);
      }
    },

    created() {
      this.salesID = this.$route.params.salesID;
      axios.post('http://localhost:3000/salesman_information',{
        salesID: this.salesID,
    })
      .then(response => {
        this.sinfoList = response.data.rows[0];
        this.errorCode = response.data.code;
        console.log(response);
        console.log(this.sinfoList);
        })
    }
}
</script>

<style scoped>

</style>
