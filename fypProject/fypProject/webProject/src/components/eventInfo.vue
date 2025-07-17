<template>
  <div>
    <header class="w3-container w3-light-gray">
      <p class="w3-btn w3-round-xlarge w3-padding-large"><router-link :to="{ name: 'userinfo', params: {userID: userID} }"><img :src="picIMG" width="30" height="30" class="w3-margin-right">{{userID}}</router-link></p>
    </header>
    <div class="w3-container">
      <ul class="w3-ul w3-col s12 m12 l12">
        <li class="w3-bar">
          <div class="w3-bar-item">
            <span class="w3-xlarge">{{infoList.eventName}}</span>
          </div>
        </li>

        <li class="w3-bar">
          <span class="w3-bar-item"><i class="material-icons">access_time</i></span>
          <span class="">{{infoList.start}} - {{infoList.end}}</span>
        </li>

        <li class="w3-bar">
          <span class="w3-bar-item"><i class="material-icons">location_on</i></span>
          <div class="w3-bar-item">
            <span class="">{{infoList.location}}</span><br>
          </div>
        </li>

        <li class="w3-bar" v-if="resAvailable">
          <span class="w3-bar-item w3-text-green"><i class="material-icons">event_available</i></span>
          <div class="w3-bar-item">
            <span class="">Available for registration</span><br>
          </div>
        </li>

        <li class="w3-bar" v-if="!resAvailable">
          <span class="w3-bar-item w3-text-red"><i class="material-icons">event_busy</i></span>
          <div class="w3-bar-item">
            <span class="">Not available for registration</span><br>
          </div>
        </li>

        <li class="w3-bar">
          <span class="w3-bar-item"><i class="material-icons">info_outline</i></span>
          <div class="w3-bar-item">
            <span class="">{{infoList.eventDes}}</span><br>
          </div>
        </li>
      </ul>
    </div>

    <div class="w3-section w3-center" v-if="resAvailable">
        <button class="w3-btn w3-black"><router-link :to="{ name: 'registerEvent', params: {userID: userID, eventID: eventID, eventName: infoList.eventName} }">Register Event</router-link></button>
    </div>
    <div class="w3-section w3-center" v-else-if="!resAvailable">
      <button class="w3-btn w3-black w3-disabled" disabled>Register Event</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import moment from 'moment'

export default {
  data() {
    return {
      userID: "",
      eventID: "",
      infoList: [],
      resStart: "",
      resStartDate: "",
      resStartM: "",
      resStartD: "",
      resEndDate: "",
      resEndM: "",
      resEndD: "",
      resAvailable: false,
      todayDate: "",
      todayDateDate: "",
      todayDateM: "",
      todayDateD: "",
      picIMG: ""
    }
  },

  methods: {
    changeDate: function(datetime) {
      let date = new Date(datetime);
      let dateString = `${date.toLocaleDateString()}`

      return dateString
    },
    changeDateTime: function(datetime) {
      let date = new Date(datetime);
      let dateString = `${date.toLocaleString()}`

      return dateString
    },
    changeFormat: function(datetime) {
      let date = new Date(datetime);
      let dateString = `${date.getFullYear()}`+"-"+`${date.getMonth()}`+"-"+`${date.getDate()}`

      return dateString
    }
  },

  created() {
    this.userID = this.$route.params.userID;
    this.eventID = this.$route.params.eventID;

    axios.post('http://localhost:3000/eventInfo', {
      eventID: this.eventID
    }).then(response => {
      console.log(response);
      this.infoList = response.data.results[0];
      this.resStart = response.data.results[0].resStart;
      this.resEnd = response.data.results[0].resEnd;
      this.todayDate = response.data.results[0].curr;
      console.log(this.changeFormat(this.todayDate))

      this.resStartDate = this.changeFormat(this.resStart);
      this.resEndDate = this.changeFormat(this.resEnd);
      this.todayDateDate = this.changeFormat(this.todayDate);
      console.log(this.todayDateDate);
      this.resStartM = moment((this.resStartDate), "YYYY-MM-DD");
      this.resEndM = moment((this.resEndDate), "YYYY-MM-DD");
      this.todayDateM = moment((this.todayDateDate), "YYYY-MM-DD");
      console.log((this.todayDateM));
      if(((this.todayDateM).diff(this.resStartM) > 0) && ((this.resEndM).diff(this.todayDateM) > 0))
      {
        console.log('reservation available!');
        this.resAvailable = true;
      }
      else
      {
        console.log('reservation not available!');
        this.resAvailable = false;
      }

      axios.post('http://localhost:3000/getUserIMG', {
        userID: this.userID
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
