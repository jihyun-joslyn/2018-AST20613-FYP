<template>
  <div>
    <header class="w3-light-gray w3-container ">
      <div class="w3-right w3-margin-right w3-margin-top">
        <router-link :to="{ name: 'companyinfo', params: {companyID: companyID} }"><span class="w3-btn w3-round w3-white w3-margin-right w3-padding-small"><i class="w3-circle w3-gray w3-text-white small material-icons">person_outline</i><span class="">{{companyID}}</span></span></router-link>
        <button class="w3-btn w3-margin-left w3-black"><router-link :to="{name: 'companyLogin'}">Log Out</router-link></button>
      </div>
    </header>

    <div class="w3-container">
    <div class="w3-panel w3-padding-16 w3-dark-gray">
      <span class="w3-left w3-text-white">ALL EVENTS</span>
      <button class="w3-btn w3-tiny w3-white w3-text-dark-gray w3-right"><router-link :to="{ name: 'comEventRes', params: {companyID: companyID} }">ADD EVENT</router-link></button>
    </div>
    <div class="w3-dark-gray w3-sidebar w3-bar-block" style="width:25%">
      <div class="w3-margin-top w3-white">
      <vue-cal xxsmall :selected-date= todayDate
         xsmall
         :time-from="10 * 60"
         :disable-views="['years', 'year', 'day', 'week', 'month']"
         default-view="month"
         style="height: 290px"
         :events="events"
         >
       </vue-cal>
     </div>
    </div>
    <div v-for="event in eventList" class="w3-container" style="margin-left:25%">
      <div class="w3-panel w3-padding-64 w3-white w3-leftbar w3-rightbar w3-border-gray">
        <router-link :to="{ name: 'comEventInfo', params: {companyID: companyID, eventID: event.eventID} }">
          <div class="w3-col" style="width:20%">
            <p class="w3-center w3-text-dark-gray w3-large">{{event.start}}<br>-<br>{{event.end}}</p>
          </div>
          <div class="w3-col" style="width:80%">
            <p class="w3-xlarge">{{event.eventName}}</p>
            <p class="w3-text-gray">{{event.eventDes}}</p>
          </div>
        </router-link>
      </div>
      <br>
    </div>
  </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from 'axios'
import router from '../router'

export default {
  data() {
    return{
      companyID: "",
      eventList: [],
      events: [],
      todayDate: ""
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
    }
  },
  created() {
    this.companyID = this.$route.params.companyID;
    console.log(this.$route.params);
    axios.post('http://localhost:3000/companyHome', {
      companyID: this.companyID
    }).then(response => {
      console.log(response);
      this.eventList = response.data.results;

      axios.post('http://localhost:3000/eventCal', {
        companyID: this.companyID
      }).then(response => {
        console.log(response);
        console.log(response.data.rows);
        this.events = response.data.rows;
      })

      axios.get('http://localhost:3000/getToday')
      .then(response => {
        console.log(response);
        console.log(response.data.result[0].now);
        this.todayDate = response.data.result[0].now;
      })
    })
  },
  components: {
    VueCal
  }

}
</script>

<style>
body {
  background-color: #f1f1f1;
}

.vuecal__cell--has-events {background-color: #fffacd;}
.vuecal__cell-events-count {display: none;}


</style>
