<template>

  <div class="home" >
    <div class="header">
      <mt-header class="w3-light-gray" fixed :title="articleName"><!--title前不加冒號會無法傳入變量articleName-->
        <mt-button icon="back" slot="left" @click="backPage()">返回</mt-button>
        <!--<mt-button @click="publishBtnClicked()" slot="right">发布</mt-button>-->
      </mt-header>
    </div>
    <!--start of body-->
    <div class="body" @click="body()" >
      <div class="usernameBar">

        <h4><img :src="picIMG" width="30" height="30" class="w3-margin-right">{{salesID}}</h4>
      </div><!--頂部用戶名欄，用戶名從後端接收過來-->

      <!--文章主体-->
      <div v-for="showp in article" class="article">
        <div :id="ShowPbtn?'BlueParagraph':'WhiteParagraph'">
          <span v-html="showp.p" ></span>
        </div>
        <span v-show="ShowPbtn" @click="delParagraph(showp)">
          <v-icon name="trash" class="BodyIcon" id="BodyIconDel"></v-icon>&nbsp
        </span>
        <span v-show="ShowPbtn" @click="delBtnClose()">
          &nbsp<v-icon name="x-square" class="BodyIcon" id="BodyIconClose" ></v-icon>
        </span>
      </div>
      <br/>

    </div><!--End of Body-->

    <div>
      <router-link :to="{ name: 'salesInfoPage', params: {salesID: salesID} }"><infoCard :salesID="salesID" /></router-link>
    </div>

    <div id="joinBtn">
      <router-link :to="{ name: 'eventInfoPage', params: {eventID: eventID} }"><mt-button class="w3-black w3-text-white" size="small" @click="" >参加这个活动</mt-button></router-link>
    </div>

    <div class="w3-light-gray Qbottom w3-animate-bottom" v-show="questionShow"><!--底部帮助栏-->
      <span>幫助</span>
      <span>撤回</span>
      <span>刪除</span>
      <span>重做</span>
      <span>添加</span>
    </div>

    <!--ActionSheet 添加按钮的弹窗-->
    <div >
       <mt-actionsheet :actions= "actions"v-model="sheetVisible"></mt-actionsheet>
    </div>

    <div class="w3-light-gray bottom" v-show="bottomShow"> <!--底部欄-->
      <span @click="questionShow=true"><v-icon name="help-circle" class="BottomIcon"></v-icon></span>
      <span @click="noPermission"><v-icon name="rotate-ccw" class="BottomIcon"></v-icon></span>
      <span @click="noPermission"><v-icon name="trash-2" class="BottomIcon"></v-icon></span>
      <span @click="noPermission"><v-icon name="rotate-cw" class="BottomIcon"></v-icon></span>
      <span @click="actionSheet"><v-icon name="plus" class="BottomIcon"></v-icon></span>
    </div>

  </div>
</template>

<script>
//import LabelEdit from 'label-edit'
import axios from 'axios'
import {Toast,MessageBox} from 'mint-ui'
//import { serverBus } from '../main.js'
import router from '../router'
import infoCard from '@/components/salesInfoCard'

export default {
 components:{infoCard},
  data () {
    return {
      salesID: '',
      articleName: '文章预览',
      message: "Only one Paragraph 1",
      ShowPbtn:false, //控制段落刪除按钮显示
      article:[],
      redo:[],
      undo:[],
      //控制Mint Action Sheet（添加按钮的弹窗）
      actions:[
        {name:'添加个人信息',method:this.noPermission},
        {name:'修改文章名', method:this.noPermission}
      ],
      //action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false,//ActionSheet是否顯示
      bottomShow: true, //控制底部欄的顯示
      questionShow: false,//控制疑問頁面的顯示
      ShowBlueBackground: false,//段落背景是否顯示藍色
      picIMG: "",
      articleID: "",
      eventID: ""
    }
  },

  methods:{
    actionSheet: function(){
    this.bottomShow = false;
    this.sheetVisible = true; //打開action sheet
    },
    getProfile:function(){},

    delParagraph:function(DelParagraph){
      this.undo.push(DelParagraph)
      console.log("Article before delete: \n"+DelParagraph);
      this.article.splice(DelParagraph.id,1);
      console.log("Article after delete: \n"+DelParagraph)
      var i;
      for(i=DelParagraph.id;i<this.article.length;i++){
        this.article[i].id--;
      }
      console.log("One paragraph deleted,And the index of article have changed")
    },

    Undo:function(){
      if(this.undo.length==0){
        Toast({
          message: '撤回不可用',
          position: 'bottom',
          duration: 1500
        })
        return
      }
      var temp = this.undo.pop()
      this.article.splice(temp.id, 0, temp);
      var i;
      for(i = temp.id+1;i<this.article.length;i++){
        this.article[i].id++;
      }
      this.redo.push(temp.id);
    },

    Redo:function(){
      if(this.redo.length==0){
        Toast({
          message: '重做不可用',
          position: 'bottom',
          duration: 1500
        })
        return
      }
      var index = this.redo.pop();
      this.delParagraph(this.article[index])
    },

    //Function for saving the Vue Data(Article) to Local storage (LocalArticle)
    saveArticle:function(){
      let temArticle = JSON.stringify(this.article);
      localStorage.localArticle = temArticle;
      console.log("Data save into LocalStorage Successfully. saveArticle() ")
    },

    //點擊body區域后，讓bottomShow變成True,讓questionShow變成False
    body:function(){
      this.questionShow=false
      this.bottomShow=true
    },


    publishBtnClicked:function(){
      MessageBox.confirm('确定进行文章发布?').then(action => {
        this.publish();
      });
    },

    publish:function(){
      this.saveArticle();
      let article = localStorage.localArticle
      let name = this.articleName
      axios.post('',{article,name})
      .then(function (response) {
        console.log(response);
        Toast({
        position:"middle",
        message: '发布成功',
        iconClass: 'mint-toast-icon mintui mintui-success',
        duration: 2000
        })
      })
      .catch(function (error) {
        console.log(error);
        Toast({
          position:"middle",
          message: '发布失败',
          iconClass:'mint-toast-icon mintui mintui-field-error',
          duration: 2000
        })
      });
      localStorage.clear();
    },

    editArticleName:function(){
      MessageBox
      .prompt(
      "发布前，先给文章取个名字吧"
      )
      .then(({ value, action }) => {
        this.articleName = value;
      });
    },

    //激活了删除模式后，点击段落的关闭按钮
    delBtnClose:function(){
      this.ShowPbtn=false
      Toast({
        position:"middle",
        message: '保存成功',
        iconClass: 'mint-toast-icon mintui mintui-success',
        duration: 2000
      })
    },

    noPermission:function(){
      this.bottomShow = true;
      Toast({
        position:"middle",
        message: '权限不足,无法使用',
        iconClass: 'mint-toast-icon mintui mintui-field-error',
        duration: 2000
      })
    },
    backPage: function() {
      router.go(-1);
    }
  },

  mounted:function(){
  //經過created生命週期后，到mounted時把‘本地數據’寫到vue的data裡面
    if(localStorage.getItem('localArticle')){
      try{
        this.article = JSON.parse(localStorage.getItem('localArticle'));
        console.log("Data write into Vue from LocalStorage Successfully!");
      }catch(e){
        localStorage.removeItem('localArticle');
      }
    }

  },

  created(){
    this.salesID = this.$route.params.salesID;
    this.articleID = this.$route.params.articleID;

    axios.post("http://localhost:3000/getArticleName", {
      articleID: this.articleID
    }).then(response => {
      console.log(response);
      this.articleName = response.data.results[0].title;
      this.eventID = response.data.results[0].eventID;
    })
    //serverBus.$on('getURL', (artURL) => {
    /*  MessageBox
      .prompt(
      "请输入文章名"
      )
      .then(({ value, action }) => {
        this.articleName = value;
      });*/
      var name = this.articleName;
      console.log("name: "+name);
      axios.post('http://localhost:3000/readArticle',{name})
        .then((response) => {
          console.log(response);
          console.log("Data received from backend successfully.");
          //接收到的數據為json格式，因此需要轉換成string儲存到temArticle以作寫入local storage
          let temArticle = JSON.stringify(response.data.article);
          console.log("Data transfer to string successfully. ")

          //檢查瀏覽器是否支持local storage，如支持就將數據寫入local storage
          if (typeof(Storage)!=="undefined"){
            localStorage.localArticle = temArticle;
            console.log("Data write into LocalStorage Successfully! "
            )//+localStorage.localArticle
          }
          },)
        .catch((error) => {
            console.log(error);
        });
    //});

    axios.post('http://localhost:3000/getSalesIMG', {
      salesID: this.salesID
    }).then(response => {
      console.log(response);
      this.picIMG = response.data.rows[0].profileIMG;
    })
  },

 beforeCreate:function(){
   //this.$router.go(0);
 }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*将Body Div往下移50px以不会和Header栏重叠*/
    .body{margin-top: 50px;}

    /*将用户名和Icon显示在同一水平线上并调整Icon的大小*/
    .usernameBar .icon {float: left;width: 25px; height: 25px;}
    .usernameBar h4{position: relative;left:10px; top:8px}

    /*文章主体*/
    .article{
      padding-left: 10px;
    }

    /*文章裡每個段落的icon（按刪除按鈕后顯示的按鈕）*/
    .BodyIcon{width: 18px; height: 18px; float:right;}
    .BodyIcon:active{background-color: rgba(137, 146, 154,0.6)}
    #BodyIconDel{color:red;margin-right: 2%}
    #BodyIconDel:active{background-color: rgba(230, 56, 56, 0.5)}
    #BodyIconClose{margin-right: 3%}

    /*底部栏*/
    .bottom {
      position: fixed;z-index: 9999;bottom: 0;left: 0;right: 0;/*底部欄置於底部*/
      background-color: rgb(38,162,255); /*rgb(39,162,255)*/
      padding:2px; text-align: center;/*vue icon平均分佈*/
    }

    /*底部栏icon*/
    .bottom .BottomIcon {
      width: 20px; height: 20px;/*調整icon大小*/
      margin: 8px 20px 0px 20px; /*icon分散不擁擠*/
    }
    .bottom .BottomIcon:active{
      background-color: rgba(137, 146, 154,0.6)
    }

    /*帮助栏*/
    .Qbottom{
      position: fixed;z-index: 9999;bottom: 0;left: 0;right: 0;/*底部欄置於底部*/
      background-color: rgba(39,162,255,0.9); /*rgb(39,162,255)*/
      padding:5px; text-align: center;/*vue icon平均分佈*/
      margin-bottom: 37px;
    }
    .Qbottom span{
      font-size: 16px;
      margin: 0px 16px 0px 16px;
    }

    #BlueParagraph{
      background: rgba(38,162,255,0.1)
    }
    #WhiteParagraph{
      background: white;
    }

    #joinBtn{
        margin-bottom: 50px; text-align: center;
    }

    .mint-button-text {
      color: black;
    }
</style>
