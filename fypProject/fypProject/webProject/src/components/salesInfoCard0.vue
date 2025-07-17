<template>
  <div>
    <div class="w3-container w3-panel w3-topbar w3-bottombar w3-leftbar w3-rightbar w3-border w3-border-black" height="200">
      <div class="w3-col" style="width:40%">
        <img :src="infoList.profileIMG" width="150" height="200">
      </div>
      <div class="w3-col w3-padding-small" style="width:60%">
        <span>{{infoList.engName}}</span><br>
        <span>{{infoList.chiName}}</span><br>
        <span>WeChat ID: {{infoList.WeChatID}}</span><br>
        <span>Email: {{infoList.email}}</span><br>
        <br>
        <p>{{infoList.introduction}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'infoCard',
  props: {
    salesID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      infoList: []
    }
  },

  created() {
    //this.salesID = this.$route.params.salesID;

    axios.post("http://localhost:3000/infoCard", {
      salesID: this.salesID
    }).then(response => {
      console.log(response);
      this.infoList = response.data.results[0];
    })
  }
}
</script>

<style>

</style>
