<template>
  <div class="">

    <div class="w3-container w3-light-gray">
      <div class="w3-btn w3-round-xlarge w3-padding-small" @click="backPage()"><i class="material-icons">keyboard_arrow_left</i></router-link></div>
    </div>


    <div class="w3-center w3-container w3-border-top	w3-border-bottom w3-padding-16">
      <img :src="sinfoList.profileIMG" width="" height="212">
      <br><br>
      <span class="w3-button w3-black w3-text-white btn-file">
        Change file<input type="file" name="avatar" ref="file" accept="image/*" v-on:change="handleFileUpload()">
      </span>
      <span v-if="imgClick">
        {{fileName}}
        <br><br>
        <button class="w3-button w3-black w3-text-white" @click="submitFile()">Submit File</button>
      </span>
    </div>

<div class="w3-bar  w3-border-bottom">
  <mt-field label="Sales ID" placeholder="Sales ID" type="text" v-model="salesID" disabled></mt-field>
</div>

<div class="w3-bar  w3-border-bottom ">
  <mt-field label="Chinese Name" placeholder="中文名字" type="text" v-model="chiName"></mt-field>
</div>

<div class="w3-bar  w3-border-bottom ">
  <mt-field label="English Name" placeholder="English Name" text="text" v-model="engName"></mt-field>
</div>

<div class="w3-bar  w3-border-bottom ">
  <div class="w3-bar-item w3-text-blue"><router-link :to="{ name: 'salespw', params: {salesID: salesID} }">Change password?</router-link></div>
</div>

<div class="w3-container">
  <p></p>
  <p></p>
</div>

<p><b><h5>Personal Information</h5></b></p>

<div class="w3-bar  w3-border-bottom w3-border-top">
  <mt-field label="Contact Number" v-validate="{length:11}" type="tel" placeholder="Contact Number" v-model="telNo" name="contact_number"></mt-field>
  <p class="w3-text-red">{{ errors.first('contact_number') }}</p>
</div>

<div class="w3-bar  w3-border-bottom">
  <mt-field label="Email" placeholder="Email" type="email" v-model="email"></mt-field>
</div>

<div class="w3-bar  w3-border-bottom">
  <mt-field label="WeChat ID" placeholder="WeChat ID" type="text" v-model="wechatID"></mt-field>
</div>

<div class="w3-bar  w3-border-bottom">
  <mt-field label="Introduction" placeholder="Write down something about yourself..." type="textarea" v-model="introduction"></mt-field>
</div>


<div class="w3-container w3-center w3-padding-32">
<p><button @click.prevent="submit()" class="w3-button w3-black w3-text-white">Save</button></p>
</div>

</div>
</template>

<script>
import axios from 'axios';
import {Toast} from 'mint-ui';
import router from '../router'

export default {
  data () {
    return {
        check:1,
        salesID: "",
        chiName:"",
        engName:"",
        telNo:"",
        email:"",
        wechatID:"",
        website:"",
        introduction:"",
        errorCode:"",
        sinfoList:[],
        imgFile: "",
        imgClick: false,
        fileName: "",
        code: "",
        fullName: ""
    }
  },
  methods:{
    submit: function() {
      axios.post('http://localhost:3000/salesman_information_edit',{
        chiName: this.chiName,
        engName: this.engName,
        telNo: this.telNo,
        email: this.email,
        WeChatID: this.wechatID,
        introduction: this.introduction,
        salesID: this.salesID
      })
      .then(response => {
        this.errorCode = response.data.code;
        console.log(response);

        if(this.errorCode == 207) {
          Toast({
            message: 'Update sales information success',
            position: 'bottom',
            duration: 5000
          });

          router.push({name: 'salesinfo', params:{salesID: this.salesID}});
          this.check = 2;
        }
        else if (this.errorCode == 110) {
          this.check = 0;

          Toast({
            message: 'Update sales information fail',
            position: 'bottom',
            duration: 5000
          });
        }
      })
    },

    backPage: function() {
      router.go(-1);
    },

    handleFileUpload: function() {
      console.log(this.$refs.file.files);
      this.imgFile = this.$refs.file.files[0];
      this.fileName = this.$refs.file.files[0].name;
      this.imgClick = true;
    },

    submitFile: function() {
      let formData = new FormData();
      formData.append('avatar', this.imgFile);

      axios.post('http://localhost:3000/uploadImage',formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(response => {
        console.log(response);
        this.code = response.data.code;
        if(this.code == 237)
        {
          Toast({
            message: 'Image successully uploaded',
            position: 'bottom',
            duration: 5000
          });

          this.fullName = 'http://localhost/fyp/webProject/src/image/' + response.data.result;
          console.log(this.fullName);

          axios.post('http://localhost:3000/salesImageDB', {
            profileIMG: this.fullName,
            salesID: this.salesID
          }).then(response => {
            console.log(response);
            console.log(this.sinfoList.profileIMG);
            this.sinfoList.profileIMG = this.fullName;
          })
        }
        else
        {
          Toast({
            message: 'Image upload fail',
            position: 'bottom',
            duration: 5000
          });
        }
      })
    }
  },

  created() {
    this.salesID = this.$route.params.salesID;
    axios.post('http://localhost:3000/salesman_information',{
      salesID: this.salesID})
    .then(response => {
        console.log(response);
        this.sinfoList = response.data.rows[0];
        this.chiName = response.data.rows[0].chiName;
        this.engName = response.data.rows[0].engName;
        this.telNo = response.data.rows[0].telNo;
        this.email = response.data.rows[0].email;
        this.wechatID = response.data.rows[0].WeChatID;
        this.introduction = response.data.rows[0].introduction;
        this.errorCode = response.data.code;

        console.log(this.sinfoList);
      })
  }

}
</script>

<style scoped>
.btn-file {
    position: relative;
    overflow: hidden;
}
.btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
}
</style>
