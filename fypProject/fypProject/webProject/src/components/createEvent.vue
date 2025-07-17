<template>
  <div>
    <header class="w3-container w3-light-gray">
      <p class="w3-btn w3-round-xlarge w3-padding-large"><router-link :to="{ name: 'userinfo', params: {userID: userID} }"><img :src="picIMG" width="30" height="30" class="w3-margin-right">{{userID}}</router-link></p>
    </header>

    <div class="w3-container">
      <ul class="w3-ul w3-col s12 m12 l12">
        <li v-for="eve in eventList" class="w3-bar w3-border-bottom">
          <router-link :to="{ name: 'eventInfo', params: {userID: userID, eventID: eve.eventID} }">
            <span class="w3-bar-item">
              <span class="w3-large">{{eve.eventName}}</span><br>
              <span class="w3-text-gray w3-small">{{eve.start}} - {{eve.end}}</span>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userID: "",
      picIMG: "",
      eventList: ""
    }
  },

  methods: {

  },
  created() {
    this.userID = this.$route.params.userID;

    axios.post('http://localhost:3000/getUserIMG', {
      userID: this.userID
    }).then(response => {
      console.log(response);
      this.picIMG = response.data.rows[0].profileIMG;
    })

    axios.get('http://localhost:3000/eventList')
    .then(response => {
      console.log(response);
      this.eventList = response.data.result;
    })

  }
}
</script>

<style>

</style>
