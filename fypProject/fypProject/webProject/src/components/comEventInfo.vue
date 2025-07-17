<template>
  <div>
    <header class="w3-light-gray w3-container w3-margin-bottom">
      <div class="w3-right w3-margin-right w3-margin-top">
        <router-link :to="{ name: 'companyinfo', params: {companyID: companyID} }"><span class="w3-btn w3-round w3-white w3-margin-right w3-padding-small"><i class="w3-circle w3-gray w3-text-white small material-icons">person_outline</i><span class="">{{companyID}}</span></span></router-link>
        <button class="w3-btn w3-margin-left w3-black"><router-link :to="{name: 'companyLogin'}">Log Out</router-link></button>
      </div>
    </header>

    <div class="w3-margin-left w3-container">
      <div class="w3-xxlarge w3-text-white w3-dark-gray w3-sidebar w3-bar-block" style="width:20%">
        <router-link :to="{ name: 'companyHome', params: {companyID: companyID}}"><span class="w3-bar-item w3-button w3-padding-64 w3-border-bottom">Event Information</span></router-link>
        <router-link :to="{ name: 'comEventRes', params: {companyID: companyID}}"><span class="w3-bar-item w3-button w3-padding-64 w3-border-bottom">Create Event</span></router-link>
      </div>
    </div>

    <div class="w3-margin-right w3-container w3-white w3-padding-large" style="margin-left:20%">
        <div class="w3-col" style="">
          <ul class="w3-ul">
            <li class="w3-bar">
              <span class="w3-bar-item">
                <span class="w3-xlarge">{{infoList.eventName}}</span>
              </span>
            </li>

            <li class="w3-bar">
              <span class="w3-bar-item"><i class="material-icons">event</i></span>
                <span class="w3-bar-item">{{infoList.start}} - {{infoList.end}}</span><br>
            </li>

            <li class="w3-bar">
              <span class="w3-bar-item"><i class="material-icons">location_on</i></span>
              <span class="w3-bar-item">
                <span class="">{{infoList.location}}</span><br>
              </span>
            </li>

            <li class="w3-bar" v-if="resAvailable">
              <span class="w3-bar-item w3-text-green"><i class="material-icons">event_available</i></span>
              <div class="w3-bar-item">
                <span class="">Event available for registration</span><br>
              </div>
            </li>

            <li class="w3-bar" v-if="!resAvailable">
              <span class="w3-bar-item w3-text-red"><i class="material-icons">event_busy</i></span>
              <span class="w3-bar-item">
                <span class="">Event not available for registration</span><br>
              </span>
            </li>

            <li class="w3-bar">
              <span class="w3-bar-item"><i class="material-icons">info_outline</i></span>
              <span class="w3-bar-item">
                <span class="">{{infoList.eventDes}}</span><br>
              </span>
            </li>
          </ul>
        </div>
        <hr>
        <div class="w3-container">
          <div class="w3-panel w3-border-top w3-padding-small">
            People registered for the event ({{noPPL}}/{{infoList.eventCap}})
          </div>

          <div class="w3-col" style="width:50%">
            <ul class="w3-ul">
              <li class="w3-bar" v-for="part in partList.slice(0, arrayHalf)">
                <span class="w3-bar-item"><img :src="part.proPic" width="48" height="48"></span>
                <span class="w3-bar-item">
                  <span class="">{{part.uID}}</span><br>
                  <span class="w3-small w3-text-gray">{{part.startTime}} - {{part.endTime}}</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="w3-col" style="width:50%">
            <ul class="w3-ul">
              <li class="w3-bar" v-for="part in partList.slice(arrayHalf, arrayLength)">
                <span class="w3-bar-item"><img :src="part.proPic" width="48" height="48"></span>
                <span class="w3-bar-item">
                  <span class="">{{part.uID}}</span><br>
                  <span class="w3-small w3-text-gray">{{part.startTime}} - {{part.endTime}}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
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
      companyID: "",
      eventID: "",
      infoList: "",
      partList: "",
      resStart: "",
      resEnd: "",
      todayDate: "",
      resAvailable: false,
      arrayLength: 0,
      noPPL: "",
      resStartDate: "",
      resStartM: "",
      resEndDate: "",
      resEndM: "",
      todayDateDate: "",
      todayDateM: "",
      arrayHalf: ""
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
    changeTime: function(datetime) {
      let date = new Date(datetime);
      let dateString = `${date.toLocaleTimeString()}`

      return dateString
    },
    changeFormat: function(datetime) {
      let date = new Date(datetime);
      let dateString = `${date.getFullYear()}`+"-"+`${date.getMonth()}`+"-"+`${date.getDate()}`

      return dateString
    }
  },

  created() {
    this.companyID = this.$route.params.companyID;
    this.eventID = this.$route.params.eventID;
    console.log(this.$route.params);
    //console.log(window);
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

      axios.post('http://localhost:3000/reservationInfo', {
        eventID: this.eventID
      }).then(response => {
        console.log(response);
        this.partList = response.data.results;
        this.noPPL = this.partList.length
        this.arrayLength = this.partList.length;
        this.arrayHalf = this.partList.length / 2;
        //console.log(this.partList[0].endTime);
      })
    })

    axios.post('http://localhost:3000/reservationInfo', {
      eventID: this.eventID
    }).then(response => {
      console.log(response);
      this.partList = response.data.results;
      this.noPPL = this.partList.length
      this.arrayLength = this.partList.length;
      this.arrayHalf = this.partList.length / 2;
      //console.log(this.partList[0].endTime);
    })
  }
}
</script>

<style>
body {
  background-color: #f1f1f1;
}
</style>
