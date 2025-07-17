<template>
  <div class="">
    <header class="w3-container w3-light-gray">
      <p class="w3-btn w3-round-xlarge w3-padding-large"><router-link :to="{ name: 'salesinfo', params: {salesID: salesID} }"><img :src="picIMG" width="30" height="30" class="w3-margin-right">{{salesID}}</router-link></p>
    </header>
    <div>
      <button class="w3-btn w3-tiny w3-right w3-black" v-on:click="edit=!edit">Edit</button>
    </div>

    <div class=" w3-container">
      <ul>
        <li v-if="hvArt" v-for="art in artList" class="w3-bar w3-border-bottom">
          <span v-if="art.status == 1">
            <span class="w3-bar-item"><i class="material-icons">language</i></span>
            <span class="w3-bar-item"><router-link :to="{ name: 'readArticle', params: {salesID: salesID, articleID: art.articleID} }">{{art.title}}</router-link></span>
          </span>
          <span v-if="art.status == 0">
            <span class="w3-bar-item"><i class="material-icons">mode_edit</i></span>
            <span v-if="edit==true" class="w3-btn w3-bar-item w3-right w3-text-red" @click="articleID = art.articleID, delArticle()"><i class="material-icons">remove_circle</i></span>
            <span class="w3-bar-item"><router-link :to="{ name: 'editArticle', params: {salesID: salesID, eventID: art.eventID} }">{{art.title}}</router-link></span>
          </span>
        </li>
      </ul>
    </div>
    <div v-if="!hvArt" class="w3-display-middle w3-text-gray w3-xlarge">
      <p>You don't have any article!</p>
    </div>
    <div class="w3-text-blue-gray w3-display-bottomright">
      <router-link :to="{ name: 'createArticle', params: {salesID: salesID} }"><i class="w3-btn w3-circle w3-ripple medium material-icons">add_circle</i></router-link>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
import router from '../router'

export default {
  data () {
    return {
      edit: false,
      artList: [],
      errorCode: "",
      salesID: "",
      hvArt: false,
      picIMG: "",
      articleID: ""
    }
  },

    methods:{
      delArticle: function() {
        axios.post("http://localhost:3000/delArticle", {
          articleID: this.articleID
        }).then(response => {
          console.log(response);
          this.affectRow = response.data.result.affectedRows;
          console.log(this.affectRow);

          if(this.affectRow)
          {
            MessageBox.alert('The article is deleted.')
            .then(action => {
              console.log("confirm delete success");
            })
          }
          else
          {
            MessageBox.alert('The article cannot be deleted. Please try again.')
            .then(action => {
              console.log("confirm delete fail");
            })
          }
        })
      }
    },

    created() {
      this.salesID = this.$route.params.salesID;
      console.log(this.$route.params.salesID);
      axios.post('http://localhost:3000/getArticleList',{
        salesID: this.salesID
        })
      .then(response => {
          console.log(response);
          this.artList = response.data.rows;
          this.errorCode = response.data.code;
          console.log(this.errorCode);

          if(this.errorCode == 121)
          {
            console.log("go into 121");
            this.hvArt = false;
          }
          else
            this.hvArt = true;

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

<style scoped>

</style>
