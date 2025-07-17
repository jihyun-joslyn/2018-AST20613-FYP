<template>
  <div>
    <header class="w3-container w3-light-gray">
      <p class="w3-btn w3-round-xlarge w3-padding-large"><router-link :to="{ name: 'userinfo', params: {userID: userID} }"><img :src="picIMG" width="30" height="30" class="w3-margin-right">{{userID}}</router-link></p>
    </header>
    <div class="w3-bar w3-col s12 m12 l12">
      <span class="w3-bar-item w3-btn w3-left w3-col s2 m2 l2" @click="backPage()"><i class="small material-icons">navigate_before</i><span>Back</span></span>
      <div class="w3-bar-item w3-center w3-large">Event registration</div>
    </div>
    <div class="w3-container">
    <h2 class="w3-border-bottom">{{eventName}}</h2>
    <form class="" name="eventRegister" v-if="resAvailable">
      <p>Date</p>
      <input type="text" @click="openDatePicker(), showDate()" v-validate="{required: true}" class="w3-input w3-padding-16 w3-margin-bottom w3-col s12 m12 l12" placeholder="" name="date" v-model="resDate">
      <mt-datetime-picker
        ref="dpicker"
        type="date"
        v-model="resdate"
        :startDate="changeJS(eventStart)"
        :endDate="changeJS(eventEnd)"
        confirmText="Confirm"
        cancelText="Cancel"
        @confirm="returnDate(resdate)">
      </mt-datetime-picker>
      <span class="w3-text-red">{{ errors.first('date') }}</span>
      <br>
      <p>Start Time</p>
      <input type="time" @click="openTimePicker()" v-validate="{required: true}" class="w3-input w3-padding-16 w3-margin-bottom w3-col s12 m12 l12" placeholder="" name="startTime" v-model="startTime">
      <mt-datetime-picker
        ref="picker"
        type="time"
        v-model="startTime"
        :startHour="parseInt(startH)"
        :endHour="parseInt(endH)"
        confirmText="Confirm"
        cancelText="Cancel">
      </mt-datetime-picker>
      <span class="w3-text-red">{{ errors.first('startTime') }}</span>
      <br>
<!--      <p>End Time</p>
      <input type="time" v-validate="{required: true}" class="w3-input w3-padding-16 w3-margin-bottom w3-col s12 m12 l12" placeholder="" name="endTime" v-model="endTime">
      <span class="w3-text-red">{{ errors.first('endTime') }}</span> -->
      <br><br>
      <p v-if="submitClick&&timeAvailable" class="w3-margin-top w3-margin-bottom"><i class="w3-text-green material-icons">event_available</i>Time available for registration</p>
      <p v-else-if="submitClick&&!timeAvailable" class="w3-margin-top w3-margin-bottom"><i class="w3-text-red material-icons">event_busy</i>Time not available for registration</p>
      <div class="w3-center w3-margin-top">
          <button class="w3-btn w3-black" @click.prevent="submitClick == true, checkInput()">Register Event</button>
      </div>
    </form>
    <form class="" name="eventRegister" v-else-if="!resAvailable">
      <p>Date</p>
      <input type="date" class="w3-disabled w3-input w3-padding-16 w3-margin-bottom w3-col s12 m12 l12" placeholder="" name="date" v-model="resDate" disabled>
      <br>
      <p>Start Time</p>
      <input type="time" class="w3-disabled w3-input w3-padding-16 w3-margin-bottom w3-col s12 m12 l12" placeholder="" name="startTime" v-model="startTime" disabled>

      <br><br>
      <p class="w3-margin-top w3-margin-bottom"><i class="w3-text-red material-icons">event_busy</i>Not available for registration</p>
      <div class="w3-center w3-margin-top">
          <button class="w3-disabled w3-btn w3-black" @click="" disabled>Register Event</button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import moment from 'moment'
import { MessageBox } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';

export default {
  data() {
    return {
      resDate: "",
      startTime: "",
      endTime: "",
      submitClick: false,
      userID: "",
      eventID: "",
      dbTime: [],
      testStart: "",
      testEnd: "",
      timeAvailable: false,
      availableFlag: 0,
      resID: "",
      errorCode: "",
      _startTime: "",
      _endTime: "",
      eventName: "",
      resStart: "",
      resEnd: "",
      _resStart: "",
      _resEnd: "",
      todayDate: "",
      _todayDate: "",
      resStartM: "",
      resEndM: "",
      todayDateM: "",
      resAvailable: false,
      confirmClicked: true,
      eventStart: "",
      eventEnd: "",
      _eventStart: "",
      _eventEnd: "",
      _resDate: "",
      _eventStartT: "",
      _eventEndT: "",
      resDateTime: "",
      resLength: "",
      resStatus: "",
      code: "",
      eventStartDateTime: "",
      eventEndDateTime: "",
      startH: "",
      endH: "",
      resdate: "",
      picIMG: ""
    }
  },

  methods: {
    postDate: function() {
      axios.post('http://localhost:3000/reservation_time', {
        date: this.resDate,
        eventID: this.eventID
      }).then(response => {
        console.log(response);
        this.dbTime = response.data.results;

        for(var i = 0; i < this.dbTime.length; i++)
        {
          this.testStart = moment(this.dbTime[i].startTime, "HH:mm:ss");
          this.testEnd = moment(this.dbTime[i].endTime, "HH:mm:ss");
          this._startTime = moment(this.startTime, "HH:mm:ss");
          this._endTime = moment(this.endTime, "HH:mm:ss");

          //resStart before start time and resEnd before start time -> available
          //resStart before start time and resEnd after end time -> not available
          //resStart after start time -> not available
          //resStart after end time and resEnd after end time -> available
          if(moment(this.startTime).isBefore(this.testStart))
          {
            if(moment(this.endTime).isBefore(this.testStart))
              this.timeAvailable = true;
            else if(moment(this.endTime).isAfter(this.testEnd))
              this.timeAvailable = false;
          }
          else if(moment(this.startTime).isAfter(this.testEnd))
            this.timeAvailable = false;
          else if(moment(this.startTime).isAfter(this.testEnd))
            this.timeAvailable = true;

          if(this.timeAvailable)
            this.availableFlag++;
        }

        if(this.availableFlag == this.dbTime.length)
          this.timeAvailable = true;
        else
          this.timeAvailable = false;

        console.log(this.resID);

        if(this.code == 135)
        {
          if(this.timeAvailable)
          {
            MessageBox.confirm('Please confirm to register event or click cancel to save event.')
            .then(action => {
              console.log("clicked confirm");
              console.log(this.resDate);
              axios.post('http://localhost:3000/reserve', {
                resID: this.resID,
                userID: this.userID,
                eventID: this.eventID,
                resDate: this.resDate,
                startTime: this.startTime,
                endTime: this.endTime,
                status: 1
              }).then(response => {
                console.log(response);
                this.errorCode = response.data.code;

                if(this.errorCode != 210)
                {
                  MessageBox.alert('Please exit the page and try to register the event again').then(action => {
                    console.log('clicked cancel');

                    router.push({name: 'registerEvent', params: {userID: this.userID, eventID: this.eventID, eventName: this.eventName}});
                  });


                }
                else {
                  router.push({name: 'eventInfo', params: {userID: this.userID, eventID: this.eventID}});
                }
              })
            }).catch(action => {
              console.log("clicked cancel");
              console.log(this.resDate);
              axios.post('http://localhost:3000/reserve', {
                resID: this.resID,
                userID: this.userID,
                eventID: this.eventID,
                resDate: this.resDate,
                startTime: this.startTime,
                endTime: this.endTime,
                status: 0
              }).then(response => {
                console.log(response);
                this.errorCode = response.data.code;

                if(this.errorCode != 210)
                {
                  MessageBox.alert('Please exit the page and try to save the event again').then(action => {
                    console.log('clicked cancel');

                    router.push({name: 'registerEvent', params: {userID: this.userID, eventID: this.eventID}});
                  });


                }
                else {
                  router.push({name: 'eventInfo', params: {userID: this.userID, eventID: this.eventID}});
                }
              })
            });
          }
          else
          {
            MessageBox.alert('Your chosen time slot is not available for registration').then(action => {
              console.log('confirm cancel');
            });
          }
        }
        else
        {
          if(this.timeAvailable)
          {
              MessageBox.confirm("Please confirm to register event or click cancel to save event.")
              .then(action => {
                console.log("clicked confirm");

                axios.post('http://localhost:3000/upUserEvent', {
                  resID: this.resID,
                  userID: this.userID,
                  resDate: this.resDate,
                  startTime: this.startTime,
                  endTime: this.endTime,
                  status: 1
                }).then(response => {
                  console.log(response);
                  this.errorCode = response.data.code;

                  if(this.errorCode != 200)
                  {
                    MessageBox.alert('Please exit the page and try to save the event again').then(action => {
                      console.log('clicked cancel');

                      router.push({name: 'registerEvent', params: {userID: this.userID, eventID: this.eventID}});
                    });


                  }
                  else {
                    router.push({name: 'eventInfo', params: {userID: this.userID, eventID: this.eventID}});
                  }
                })
              }).catch(action => {
                console.log("clicked cancel");

                axios.post('http://localhost:3000/upUserEvent', {
                  resID: this.resID,
                  userID: this.userID,
                  resDate: this.resDate,
                  startTime: this.startTime,
                  endTime: this.endTime,
                  status: 0
                }).then(response => {
                  console.log(response);
                  this.errorCode = response.data.code;

                  if(this.errorCode != 200)
                  {
                    MessageBox.alert('Please exit the page and try to save the event again').then(action => {
                      console.log('clicked cancel');

                      router.push({name: 'registerEvent', params: {userID: this.userID, eventID: this.eventID}});
                    });


                  }
                  else {
                    router.push({name: 'eventInfo', params: {userID: this.userID, eventID: this.eventID}});
                  }
                })
              })
            }
            else
            {
              MessageBox.alert('Your chosen time slot is not available for registration').then(action => {
                console.log('confirm cancel');
              });
            }
          }
        })
    },
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
      let dateString = `${date.getFullYear()}`+"-"+`${date.getMonth() + 1}`+"-"+`${date.getDate()}`

      return dateString
    },

    changeJS: function(datetime) {
      let date = new Date(datetime);
      let dateString = `${date.toLocaleString()}`

      return date
    },

    backPage: function() {
      router.go(-1);
    },

    checkInput: function(){
      this._eventStart = moment((this.eventStart), "YYYY-MM-DD HH:mm:ss");
      this._eventEnd = moment((this.eventEnd), "YYYY-MM-DD HH:mm:ss");
      console.log(this.resDate);
      console.log(this.changeFormat(this.resDate) + " " + this.startTime);
      this.resDateTime = moment((this.changeFormat(this.resDate) + " " + this.startTime), "YYYY-MM-DD HH:mm:ss");
      console.log(this._eventStart);
      console.log(this.resDateTime);
      this._startTime = moment((this.startTime), "HH:mm:ss");
      console.log((this.resDateTime).diff(this._eventStart));
      this.resDate = moment(moment((this.resDate), "YYYY-MM-DD")).format("YYYY-MM-DD");
      console.log(this.resDate);
      if((moment(this.resDateTime).isSameOrAfter(this._eventStart)) && (moment(this._eventEnd).isSameOrAfter(this.resDateTime)))
      {
        console.log("available");

        this._endTime = moment(this._startTime).add(15, 'minute');
        console.log(this._endTime);
        console.log(this.startTime);
        this.endTime = moment(this._endTime).format("HH:mm");
        console.log(this.endTime);

        this.postDate();
      }
      else {
        console.log("not available");

        MessageBox.alert('The time you chose is not in the event period.').then(action => {
          console.log('confirm cancel');
        });
      }
    },

    openTimePicker: function()
    {
        this.$refs.picker.open();
    },

    openDatePicker: function()
    {
        this.$refs.dpicker.open();
    },

    returnDate: function(dateString)
    {
      this.resDate = this.changeFormat(dateString);
      console.log(this.resDate);
    },

    showDate: function()
    {
      axios.post('http://localhost:3000/getUserRes', {
        userID: this.userID,
        eventID: this.eventID
      }).then(response => {
        console.log(response);
        this.code = response.data.code;

        if(this.code == 235)
        {
          this.resStatus = response.data.results[0].status;
          console.log(this.resStatus);
          if(!this.resStatus)
          {
            this.resDate = response.data.results[0].resDate;
            this.startTime = response.data.results[0].startTime;
            this.resID = response.data.results[0].resID;
            this.resdate = this.changeJS(this.resDate);
            console.log(this.resDate);
          }
        }
      })
    }
  },

  created() {
    this.userID = this.$route.params.userID;
    this.eventID = this.$route.params.eventID;
    this.eventName = this.$route.params.eventName;
    console.log(this.eventID);
    axios.post('http://localhost:3000/getReservationPeriod', {
      eventID: this.eventID
    }).then(response => {
      console.log(response);
      this.resStart = response.data.result[0].resStart;
      this.resEnd = response.data.result[0].resEnd;
      this.todayDate = response.data.result[0].curr;
      console.log(response.data.result[0]);
      console.log(this.changeFormat(this.todayDate))

      this.resStartDate = this.changeFormat(this.resStart);
      this.resEndDate = this.changeFormat(this.resEnd);
      this.todayDateDate = this.changeFormat(this.todayDate);
      console.log(this.todayDateDate);
      this.resStartM = moment((this.resStartDate), "YYYY-MM-DD");
      this.resEndM = moment((this.resEndDate), "YYYY-MM-DD");
      this.todayDateM = moment((this.todayDateDate), "YYYY-MM-DD");
      console.log((this.todayDateM).isAfter(this.resStartM));
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

      axios.get('http://localhost:3000/getResNo')
      .then(response => {
        console.log(response);
        this.resID = response.data.result[0].newNum;
        console.log(this.resID);
      })

      axios.post('http://localhost:3000/getEventTime', {
        eventID: this.eventID
      }).then(response => {
        console.log(response);
        this.eventStart = response.data.results[0].start;
        this.eventEnd = response.data.results[0].end;
        this.resLength = response.data.results[0].resLength;
        this.eventStartDateTime = response.data.results[0].startDate;
        this.startH = response.data.results[0].startHour;
        this.endH = response.data.results[0].endHour;
        console.log(this.eventStart);
      //  this._eventStartT = moment((this.eventStart), "HH:mm:ss");
      })

      axios.post('http://localhost:3000/getUserRes', {
        userID: this.userID,
        eventID: this.eventID
      }).then(response => {
        console.log(response);
        this.code = response.data.code;

        if(this.code == 235)
        {
          this.resStatus = response.data.results[0].status;
          console.log(this.resStatus);
          if(!this.resStatus)
          {
            this.resDate = response.data.results[0].resDate;
            this.startTime = response.data.results[0].startTime;
            this.resID = response.data.results[0].resID;
            this.resDate = this.changeJS(this.resDate);
            console.log(this.resDate);
          }
          else
          {
            MessageBox.alert('You have already resgistered for the event.').then(action => {
              console.log('clicked cancel');
              this.resAvailable = false;
              //router.go(-1);
            });
          }
        }
      })
      console.log(this.$refs);
      //if user editing event, put the value in the input box
      //date time picker
      axios.post('http://localhost:3000/getUserIMG', {
        userID: this.userID
      }).then(response => {
        console.log(response);
        this.picIMG = response.data.rows[0].profileIMG;
      })

      axios.post('http://localhost:3000/getEventName', {
        eventID: this.eventID
      }).then(response => {
        console.log(response);
        this.eventName = response.data.results[0].eventName;
      })
    })
  }
  //check user input is between event date time
}
</script>

<style>

</style>
