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

    <div class="w3-xxlarge w3-text-white w3-dark-gray w3-sidebar w3-bar-block" style="width:20%">
      <router-link :to="{ name: 'companyHome', params: {companyID: companyID}}"><span class="w3-bar-item w3-button w3-padding-64 w3-border-bottom">Event Information</span></router-link>
      <router-link :to="{ name: 'comEventRes', params: {companyID: companyID}}"><span class="w3-bar-item w3-button w3-padding-64 w3-border-bottom">Create Event</span></router-link>
    </div>


    <div class="w3-margin-right w3-container w3-white w3-padding-large" style="margin-left:20%">
        <div class="w3-bar" style="width:50%">
          <ul>
            <li class="w3-bar">
            <span class="w3-bar-item w3-large">Company ID</span>
            <span class="w3-bar-item w3-large">{{cinfoList.companyID}}</span>
          </li>

            <li class="w3-bar">
              <span class="w3-bar-item w3-large">Company Name</span>
              <span class="w3-bar-item w3-large">{{cinfoList.companyName}}</span>
            </li>

            <li class="w3-bar">
              <span class="w3-bar-item w3-large">Website</span>
              <span class="w3-bar-item w3-large">{{cinfoList.website}}</span>
            </li>
          </ul>


          <div class="w3-container w3-center w3-padding-32">
          <p><router-link :to="{ name: 'editcominfo', params: {companyID: companyID} }"><input type="button" class="w3-button w3-black w3-text-white" value="Edit"></router-link></p>
          </div>

        </div>
      </div>





  </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  data() {
    return{
        cinfoList: [],
        errorCode: "",
        companyID: ""
    }
  },
  methods: {

  },

  created() {
    this.companyID = this.$route.params.companyID;
    axios.post('http://localhost:3000/company_information',{
      companyID: this.companyID})
    .then(response => {
        console.log(response);
        this.cinfoList = response.data.rows[0];
        this.errorCode = response.data.code;
        console.log(this.cinfoList);
      })
  },

  components: {

  },

}
</script>

<style>
body {
  background-color: #f1f1f1;
}

</style>
