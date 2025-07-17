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
        <div class="w3-col" style="width:50%">
          <ul>
            <li class="w3-bar">
              <span class="w3-bar-item">Company ID</span>
              <span class="w3-bar-item">{{companyID}}</span>
            </li>

            <li class="w3-bar">
              <span class="w3-bar-item">Company Name</span>
              <span class="w3-bar-item"><input v-model="companyName" class="w3-input" type="text" placeholder="company Name"></span>
            </li>

            <li class="w3-bar">
              <span class="w3-bar-item">Website</span>
              <span class="w3-bar-item"><input v-model="website" class="w3-input" type="text" placeholder="website"></span>
            </li>

            <li class="w3-bar">
              <span class="w3-bar-item w3-text-blue"><router-link :to="{ name: 'companypw', params: {companyID: companyID} }">Change Password?</router-link></span>
            </li>
          </ul>


          <div class="w3-container w3-center w3-padding-32">
          <button class="w3-button w3-black w3-text-white" @click.prevent="update()">Save</button>
          </div>

          <div v-if="!updateSuccess">
            <b-alert variant="danger" dismissible v-model="showDismissibleAlert">
              Update fail!
            </b-alert>
          </div>
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
      companyName:"",
      website:"",
      errorCode:"",
      cinfoList:[],
      updateSuccess: false,
      showDismissibleAlert: false

    }
  },
  methods: {
    update: function() {
      axios.post('http://localhost:3000/company_information_edit', {
        companyID: this.companyID,
        companyName: this.companyName,
        website: this.website,
      }).then(response => {
        console.log(response);
        this.errorCode = response.data.code;
        console.log(this.errorCode);
        if(this.errorCode == 114)
        {
          console.log('update fail');
          this.updateSuccess = false;
          this.showDismissibleAlert = true;

        }
        else {
          console.log('update success');
          this.updateSuccess = true;
          this.showDismissibleAlert = false;

          router.push({name: 'companyinfo', params: {companyID: this.companyID}});
        }
      })
  }

  },

  created() {
    this.companyID = this.$route.params.companyID;
    axios.post('http://localhost:3000/company_information',{
      companyID: this.companyID
      })
    .then(response => {
      console.log(response);
      this.cinfoList = response.data.rows[0];
      this.companyName = response.data.rows[0].companyName;
      this.website = response.data.rows[0].website;
      this.errorCode = response.data.code;
      console.log(this.cinfoList);
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
