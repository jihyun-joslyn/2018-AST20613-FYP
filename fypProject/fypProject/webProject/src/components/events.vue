<template>
  <div>
    <header class="w3-container w3-light-gray">
      <p class="w3-btn w3-round-xlarge w3-padding-large"><router-link :to="{ name: 'userinfo', params: {userID: userID} }"><img :src="picIMG" width="30" height="30" class="w3-margin-right">{{userID}}</router-link></p>
    </header>
    <div class="w3-container">
      <button class="w3-btn w3-tiny w3-right w3-black" @click="editMode = !editMode">Edit</button>
      <ul class="w3-ul w3-col s12 m12 l12">
        <li v-if="hvEvent" v-for="event in eventList" class="w3-bar w3-border-bottom">
          <span v-if="editMode"><span class="w3-btn w3-bar-item w3-right w3-text-red" :key="event.eveID" :value="event.eveID" @click="eventID = event.eveID, deleteEvent()"><i class="material-icons">remove_circle</i></span></span>
          <span v-if="event.status == 1">
            <span class="w3-bar-item">
              <i class="material-icons">done</i>
            </span>
            <div class="w3-bar-item" :key="event.eveID" :value="event.eveID">
              <router-link :to="{ name: 'eventInfo', params: {userID: userID, eventID: event.eveID} }">
                <span class="w3-large">{{event.eventName}}</span><br>
                <span v-if="event.status == 1" class="w3-text-gray">{{changeDate(event.resDate)}}<br>{{event.startTime}} - {{event.endTime}}</span>
              </router-link>
            </div>
          </span>
          <span v-if="event.status == 0">
            <span class="w3-bar-item">
              <i class="material-icons">mode_edit</i>
            </span>
            <div class="w3-bar-item" :key="event.eveID" :value="event.eveID">
              <router-link :to="{ name: 'registerEvent', params: {userID: userID, eventID: event.eveID, eventName: event.eventName} }">
                <span class="w3-large">{{event.eventName}}</span><br>
              </router-link>
            </div>
          </span>
        </li>
      </ul>
      <div v-if="!hvEvent" class="w3-display-middle w3-text-gray w3-xlarge">
        <p>You don't have any registered event!</p>
      </div>

      <div class="w3-btn w3-display-bottomright w3-circle">
        <router-link :to="{ name: 'createEvent', params: {userID: userID} }"><i class="material-icons w3-xxxlarge w3-text-blue-gray">add_circle</i></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'mint-ui';
import router from '../router'
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      editMode: false,
      userID: "",
      eventList: [],
      errorCode: "",
      eventID: "",
      affectRow: 0,
      hvEvent: false,
      errorCode1: "",
      picIMG: ""
    }
  },

  methods: {
    deleteEvent: function() {
      axios.post('http://localhost:3000/deleteEvent', {
        userID: this.userID,
        eventID: this.eventID
      }).then(response => {
        console.log(response);
        this.errorCode1 = response.data.code;
        this.affectRow = response.data.result.affectedRows;
        console.log(this.affectRow);

        if(this.affectRow)
        {
          MessageBox.alert('The event is deleted.')
          .then(action => {
            console.log("confirm delete success");
          })
        }
        else
        {
          MessageBox.alert('The event cannot be deleted. Please try again.')
          .then(action => {
            console.log("confirm delete fail");
          })
        }
      })


    },

    changeDate: function(datetime) {
      let date = new Date(datetime);
      let dateString = `${date.toLocaleDateString()}`

      return dateString
    }
  },

  created() {
    console.log(this);
    this.userID = this.$route.params.userID;

    axios.post('http://localhost:3000/getUserEvent', {
      userID: this.$route.params.userID
    })
    .then(response => {
      console.log(response);
      this.eventList = response.data.results;
      this.errorCode = response.data.code;

      if(this.errorCode == 210)
      {
        this.hvEvent = true;
      }
      else {
        this.hvEvent = false;
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
