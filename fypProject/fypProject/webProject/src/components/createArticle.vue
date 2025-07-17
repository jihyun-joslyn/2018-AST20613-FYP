<template>
  <div>
    <header class="w3-container w3-light-gray">
      <p class="w3-btn w3-round-xlarge w3-padding-large"><router-link :to="{ name: 'salesinfo', params: {salesID: salesID} }"><img :src="picIMG" width="30" height="30" class="w3-margin-right">{{salesID}}</router-link></p>
    </header>
    <h1 class="w3-container w3-margin-bottom w3-xxxlarge">New Article</h1>
    <form class="w3-container">
      <mt-field label="URL of the article" placeholder="URL of the article" type="url" v-model="artURL" v-validate="{required: true}" class="w3-padding-16 w3-margin-bottom w3-col s12 m12 l12" name="URL"></mt-field>
      <span class="w3-text-red">{{ errors.first('URL') }}</span>
      <p>Event related to the article
      <select v-validate="{required: true}" class="w3-select w3-input w3-margin-bottom w3-margin-top w3-col s12 m12 l12" name="event" v-model="eventID">
        <option value="" disabled selected>Please select one</option>
        <option v-for="eve in events" v-bind:value="eve.eventID">
          {{eve.eventName}}
        </option>
      </select></p>
      <span class="w3-text-red">{{ errors.first('event') }}</span>

      <p class="w3-center"><button @click.prevent='submit()' class="w3-btn w3-center w3-black w3-text-white w3-margin-top">Add article</button></p>

    </form>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import { serverBus } from '../main.js'
export default {
  data() {
    return {
      salesID: "",
      eventID: "",
      events: [],
      artURL: "",
      picIMG: ""
    }
  },

  methods: {
    submit:function(){
      let url = this.artURL
      console.log(url);
      axios.post('http://localhost:3000/getArticle',{url})
          .then((response) => {
            console.log("Data received from backend: \n"+response.data.article);
            //接收到的數據為json格式，因此需要轉換成string儲存到temArticle以作寫入local storage
            let temArticle = JSON.stringify(response.data.article);
            console.log("Data transfer to string Successfully! "+temArticle)//+temArticle
            //檢查瀏覽器是否支持local storage，如支持就將數據寫入local storage
            if (typeof(Storage)!=="undefined"){
                localStorage.localArticle = temArticle;
                console.log("Data write into LocalStorage Successfully! ")//+localStorage.localArticle

            }
            //console.log(this.eventID);
            router.push({name: 'editArticle', params: {salesID: this.salesID, eventID: this.eventID}});
           })
          .catch((error) => {
                console.log(error);
          });
          //router.push({name: 'editArticle', params: {salesID: this.salesID, eventID: this.eventID}});
      //this.salesID,this.eventID
    //serverBus.$emit('getURL', this.artURL);

    }
  },

  created() {
    this.salesID = this.$route.params.salesID;
    axios.post('http://localhost:3000/getEvent', {
      salesID: this.salesID
    }).then(response => {
      console.log(response);
      this.events = response.data.rows;

      axios.post('http://localhost:3000/getSalesIMG', {
        salesID: this.salesID
      }).then(response => {
        console.log(response);
        this.picIMG = response.data.rows[0].profileIMG;
      })
    })
  }
}
</script>

<style>

</style>
