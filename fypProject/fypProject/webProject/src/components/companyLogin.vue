<template>
  <div>
    <form class="w3-padding-small w3-container w3-display-container w3-row w3-dark-gray " name="companyLogin">
      <div class="w3-col w3-margin-right w3-margin-left" style="width:30%">
        <span class="w3-margin-right w3-text-white">User ID</span>
        <input type="text" v-validate="{required: true}" class="w3-input w3-white" placeholder="User ID" name="userID" v-model="companyID">
        <span class="w3-text-red">{{ errors.first('userID') }}</span>
      </div>

      <div class="w3-col w3-margin-right w3-margin-left" style="width:30%">
        <span class="w3-text-white">Password</span>
        <input type="password" v-validate="{required: true}" class="w3-input w3-white" placeholder="Password" name="password" v-model="companyPWD">
        <span class="w3-text-red">{{ errors.first('password') }}</span>
      </div>

      <div class="w3-margin-top w3-display-right w3-margin-bottom w3-padding w3-col" style="width:15%">
        <button class="w3-btn w3-white w3-text-dark-gray" @click.prevent="submitLogin = true, checkLogin()">Login</button>
      </div>
    </form>

    <div>
      <div v-if="submitLogin&&IDbool&&!PWDbool">
        <b-alert variant="danger" dismissible v-model="showDismissibleAlert">
          Wrong Password!
        </b-alert>
      </div>
      <div v-if="submitLogin&&!IDbool&&!PWDbool">
        <b-alert variant="danger" dismissible v-model="showDismissibleAlert">
          Account not exist!
        </b-alert>
      </div>
    </div>

    <div class=" w3-container w3-light-gray w3-padding-top w3-padding-bottom w3-padding-small">
      <p class="w3-xlarge w3-margin-bottom">Register</p>
      <form name="companyRegister" class="">
        <p class="w3-margin-top">Company Name</p>
        <input type="text" v-validate="{required: true}" class="w3-margin-bottom w3-white w3-animate-input" style="width:30%" placeholder="Company Name" name="companyName" v-model="companyName">
        <span class="w3-text-red">{{ errors.first('companyName') }}</span>
        <br>
        <p class="w3-margin-top">Company ID</p>
        <input type="text" v-validate="{required: true}" class="w3-margin-bottom w3-white w3-animate-input" style="width:30%" placeholder="Company ID" name="companyID" v-model="comIDRes">
        <span class="w3-text-red">{{ errors.first('companyID') }}</span>
        <br>
        <p class="w3-margin-top">Website</p>
        <input type="text" v-validate="{required: true}" class="w3-margin-bottom w3-white w3-animate-input" style="width:30%" placeholder="Company Website (URL)" name="companyWebsite" v-model="companyURL">
        <span class="w3-text-red">{{ errors.first('companyWebsite') }}</span>
        <br>
        <p class="w3-margin-top">Password</p>
        <input type="password" v-validate="{required: true}" class="w3-margin-bottom w3-white w3-animate-input" style="width:30%" placeholder="Password" name="companyPassword" v-model="comPWDRes">
        <span class="w3-text-red">{{ errors.first('companyPassword') }}</span>
        <br>
        <button class="w3-btn w3-dark-gray w3-text-white" @click.prevent="submitRes = true, checkRes()">Register</button>
      </form>
      <div>
          <div v-if="submitRes&&regSuccess">
            <b-alert variant="success" dismissible v-model="showDismissibleAlert">
              Registration success!
            </b-alert>
          </div>
          <div v-else-if="submitRes&&!regSuccess">
            <b-alert variant="danger" dismissible v-model="showDismissibleAlert">
              Account already exist!
            </b-alert>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data() {
    return {
      companyID: "",
      companyPWD: "",
      comIDRes: "",
      companyName: "",
      companyURL: "",
      comPWDRes: "",
      submitLogin: false,
      submitRes: false,
      errorCode: "",
      dbID: "",
      dbPWD: "",
      showDismissibleAlert: false,
      IDbool: false,
      PWDbool: false,
      regSuccess: false
    }
  },

  methods: {
    checkLogin: function() {
      axios.post('http://localhost:3000/company_login', {
        companyID: this.companyID
      }).then((response) => {
        console.log(response);
        this.dbID = response.data.results[0].companyID;
        this.dbPWD = response.data.results[0].password;
        this.errorCode = response.data.code;
        console.log(this.dbID, this.dbPWD);

        if(this.errorCode != 106)
        {
          console.log("go into error code 203");
          if((this.dbID == this.companyID) && (this.dbPWD == this.companyPWD))
          {
            console.log("all correct");
            //this.showDismissibleAlert = true;
            this.IDbool = true;
            this.PWDbool = true;
            router.push({name: 'companyHome', params: {companyID: this.companyID}});
          }
          else if((this.dbID == this.companyID) && (this.dbPWD != this.companyPWD))
          {
            console.log("wrong password");
            //alert wrong password using v-if
            this.IDbool = true;
            this.PWDbool = false;
            this.showDismissibleAlert = true;
          }
        }
        else
        {
          console.log("all wrong");
          //alert account not exist using v-if
          this.IDbool = false;
          this.PWDbool = false;
          this.showDismissibleAlert = true;
        }
      })


    },

    checkRes: function() {
      axios.post('http://localhost:3000/company_register', {
        companyID: this.comIDRes,
        password: this.comPWDRes,
        companyName: this.companyName,
        website: this.companyURL
      }).then(response => {
        console.log(response);
        this.errorCode = response.data.code;
        console.log(this.errorCode);

        if(this.errorCode != 104)
        {
          console.log("go into error code 202");
            //alert register success using v-if
          this.regSuccess = true;
          this.showDismissibleAlert = true;
        }
        else
        {
          console.log("go into error code 104");
          //alert account already exist using v-if
          this.regSuccess = false;
          this.showDismissibleAlert = true;
        }
      })
    }
  }
}
</script>

<style>
body {
  background-color: #f1f1f1;
}
</style>
