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

      <form class="w3-margin-right w3-container w3-white w3-padding-large" style="margin-left:20%">
        <p>Event Name: <input type="text" v-validate="{required: true}" class="w3-input" placeholder="Event Name" name="eventName" v-model="eventName"></p>
        <span class="w3-text-red">{{ errors.first('eventName') }}</span>
        <br>
        <p>Event Start Date and Time: <input type="datetime" v-validate="{required: true}" class="w3-input" placeholder="Start Date" name="startDateTime" ref="startDateTime" v-model="startDateTime"></p>
        <span class="w3-text-red">{{ errors.first('startDateTime') }}</span>
        <br>
        <p>Event End Date and Time: <input type="datetime" v-validate="{required: true, after: startDateTime}" class="w3-input" placeholder="End Date" name="endDateTime" v-model="endDateTime"></p>
        <ul class="w3-text-red">
          <li v-for="error in errors.collect('endDateTime')">{{ error }}</li>
        </ul>
        <br>
        <p>Event Location: <input type="text" v-validate="{required: true}" class="w3-input" placeholder="Event Address" name="eventAddr" v-model="location"></p>
        <span class="w3-text-red">{{ errors.first('evnetAddr') }}</span>
        <br>
        <p>Event Description: <input type="text" v-validate="{required: true}" class="w3-input" placeholder="Event Description" name="eventDes" v-model="eventDes"></p>
        <span class="w3-text-red">{{ errors.first('eventDes') }}</span>
        <br>
        <p>Event Capacity: <input type="number" v-validate="{required: true}" class="w3-input" placeholder="Maximum number of participants" name="eventCap" v-model="eventCap"></p>
        <span class="w3-text-red">{{ errors.first('eventCap') }}</span>
        <br>
        <p>Length of Each Reservation: <input type="number" v-validate="{required: true}" class="w3-input" placeholder="Length of each reservation (e.g. 15min, 30min, 45min, etc)" name="reservationLength" v-model="resLength"></p>
        <span class="w3-text-red">{{ errors.first('reservationLength') }}</span>
        <br>
        <p>Start of Reservation period: <input type="date" v-validate="{required: true}" class="w3-input" placeholder="" name="reservationStart" ref="resStart" v-model="resStart"></p>
        <span class="w3-text-red">{{ errors.first('reservationStart') }}</span>
        <br>
        <p>End of Reservation Period: <input type="date" v-validate="{required: true, after:resStart}" class="w3-input" placeholder="" name="reservationEnd" v-model="resEnd"></p>
        <ul class="w3-text-red">
          <li v-for="error in errors.collect('reservationEnd')">{{ error }}</li>
        </ul>
        <br>
        <button class="w3-btn w3-white w3-border w3-border-black" @click.prevent="submitClick = true, resEvent()">Register Event</button>
       </form>
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
      eventName: "",
      startDateTime: "",
      endDateTime: "",
      location: "",
      eventDes: "",
      eventCap: "",
      resStart: "",
      resEnd: "",
      errorCode: "",
      submitClick: false,
      QRcode: "",
      resLength: ""
    }
  },
  methods: {
    resEvent: function() {
      axios.post('http://localhost:3000/createEvent', {
        eventID: this.eventID,
        eventName: this.eventName,
        location: this.location,
        eventDes: this.eventDes,
        companyID: this.companyID,
        startDateTime: this.startDateTime,
        endDateTime: this.endDateTime,
        resStart: this.resStart,
        resEnd: this.resEnd,
        eventCap: this.eventCap,
        resLength: this.resLength
      }).then(response => {
        console.log(response);
        this.errorCode = response.data.code;

        if(this.errorCode == 208)
        {
          console.log('Create event success!');

          router.push({name: 'companyHome', params: {companyID}})
        }
        else {
          console.log('Create event fail! Please try again.');

          router.push({name: 'comEventRes', params: {companyID}})
        }
      })



    }

  },
  created() {
    this.companyID = this.$route.params.companyID;

    axios.get('http://localhost:3000/getEventNo')
    .then(response => {
      console.log(response);
      this.eventID = response.data.result[0].newNum;
      console.log(this.eventID);
    })
  }
}
</script>

<style>
body {
  background-color: #f1f1f1;
}
</style>
