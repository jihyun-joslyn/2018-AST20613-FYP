<template>
<div class="">

  <h1 class="w3-container w3-margin-bottom w3-xxxlarge">Change password</h1>
    <form class="w3-container w3-margin-top" name="changePWD">
      <div class=" ">
        <mt-field label="Original Password" placeholder="Original Password" type="password" v-model="password" class="w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="password"></mt-field>
        <span class="w3-text-red">{{ errors.first('password') }}</span>
      </div>

        <div class="">
          <mt-field label="New Password" placeholder="New Password" type="password" v-model="newpw" class="w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true}" name="newPassword"></mt-field>
          <span class="w3-text-red">{{ errors.first('newPassword') }}</span>
        </div>

      <div class="">
        <mt-field label="Confirm New Password" placeholder="Confirm New Password" type="password" v-model="secondin" class="w3-margin-bottom w3-col s12 m12 l12" v-validate="{required: true, is: newpw}" name="confirmPassword"></mt-field>
        <ul class="w3-text-red">
          <li v-for="error in errors.collect('confirmPassword')">{{ error }}</li>
        </ul>
      </div>

    <div class="w3-center w3-padding-32">
    <button v-on:click.prevent="update()" class="w3-btn w3-text-white w3-black"><router-link :to="{ name: 'salesinfo', params: {salesID:salesID} }">Save</router-link></button>
    </div>
  </form>

</div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'mint-ui';
import router from '../router'

export default {
  data () {
    return {
        salesID: "",
        password:"",
        newpw:"",
        secondin:"",
        errorCode:"",
        getpw:""

    }
  },
  methods:{
    update: function() {
      axios.post('http://localhost:3000/salesmen_changepwd', {
        salesID: this.salesID,
        password: this.password,
        newPassword: this.newpw
      }).then(response => {
        console.log(response);
        this.errorCode = response.data.code;

        if(this.errorCode == 304)
        {
          Toast({
            message: 'Update password success',
            position: 'bottom',
            duration: 5000
          });

          router.push({name: 'salesinfo', params:{salesID: this.salesID}});
        }
        else {
          Toast({
            message: 'Update password fail',
            position: 'bottom',
            duration: 5000
          });
        }
      })
  }
},

  created() {
    this.salesID = this.$route.params.salesID;

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
