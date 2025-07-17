import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'
import 'w3-css/w3.css'
import 'w3-css/4/w3pro.css'
import 'w3-css/4/w3mobile.css'
import VeeValidate from 'vee-validate';
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import register from '@/components/register'
import events from '@/components/events'
import eventInfo from '@/components/eventInfo'
import registerEvent from '@/components/registerEvent'
import companyLogin from '@/components/companyLogin'
import companyHome from '@/components/companyHome'
import comEventRes from '@/components/comEventRes'
import comEventInfo from '@/components/comEventInfo'
import salesLogin from '@/components/salesLogin'
import salesRegister from '@/components/salesRegister'
import article from '@/components/article'
import userinfo from '@/components/userinfo'
import editinfo from '@/components/editinfo'
import changepw from '@/components/changepw'
import companypw from '@/components/companypw'
import editcominfo from '@/components/editcominfo'
import salesedit from '@/components/salesedit'
import salesinfo from '@/components/salesinfo'
import salespw from '@/components/salespw'
import companyinfo from '@/components/companyinfo'
import createArticle from '@/components/createArticle'
import salesInfoPage from '@/components/salesInfoPage'
import editArticle from '@/components/editArticle'
import readArticle from '@/components/readArticle'
import createEvent from '@/components/createEvent'
import eventInfoPage from '@/components/eventInfoPage'
import infoCard from '@/components/salesInfoCard'
import readArticlePage from '@/components/readArticlePage'

Vue.use(BootstrapVue);
Vue.use(Router)
Vue.use(Mint)
Vue.use(VeeValidate);

export default new Router({
  routes: [
    {
      path:'/readArticle/:salesID/:articleID',
      name:'readArticle',
      component: readArticle
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/editArticle/:salesID/:eventID',
      name:'editArticle',
      component: editArticle
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },

    {
      path: '/events/:userID',
      name: 'events',
      component: events
    },

    {
      path: '/eventInfo/:userID/:eventID',
      name: 'eventInfo',
      component: eventInfo
    },

    {
      path: '/registerEvent/:userID/:eventID',
      name: 'registerEvent',
      component: registerEvent
    },

    {
      path: '/companyLogin',
      name: 'companyLogin',
      component: companyLogin
    },

    {
      path: '/companyHome/:companyID',
      name: 'companyHome',
      component: companyHome
    },

    {
      path: '/comEventRes/:companyID',
      name: 'comEventRes',
      component: comEventRes
    },

    {
      path: '/comEventInfo/:companyID/:eventID',
      name: 'comEventInfo',
      component: comEventInfo
    },

    {
      path: '/salesLogin',
      name: 'salesLogin',
      component: salesLogin
    },

    {
      path: '/salesRegister',
      name: 'salesRegister',
      component: salesRegister
    },

    {
      path: '/article/:salesID',
      name: 'article',
      component: article
    },

    {
      path: '/userinfo/:userID',
      name: 'userinfo',
      component: userinfo
    },

    {
      path: '/editinfo/:userID',
      name: 'editinfo',
      component: editinfo
    },

    {
      path: '/changepw/:userID',
      name: 'changepw',
      component: changepw
    },

    {
      path: '/companypw/:companyID',
      name: 'companypw',
      component: companypw
    },

    {
      path: '/editcominfo/:companyID',
      name: 'editcominfo',
      component: editcominfo
    },

    {
      path: '/salesedit/:salesID',
      name: 'salesedit',
      component: salesedit
    },

    {
      path: '/salesinfo/:salesID',
      name: 'salesinfo',
      component: salesinfo
    },

    {
      path: '/salespw/:salesID',
      name: 'salespw',
      component: salespw
    },

    {
      path: '/companyinfo/:companyID',
      name: 'companyinfo',
      component: companyinfo
    },

    {
      path: '/createArticle/:salesID',
      name: 'createArticle',
      component: createArticle
    },
    /*
    {
      path: '/createArticle',
      name: 'createArticle',
      component: createArticle
    },*/
    {
      path: '/salesInfoPage/:salesID',
      name: 'salesInfoPage',
      component: salesInfoPage
    },

    {
      path: '/createEvent/:userID',
      name: 'createEvent',
      component: createEvent
    },

    {
      path: '/eventInfoPage/:eventID',
      name: 'eventInfoPage',
      component: eventInfoPage
    },

    {
      path: '/readArticlePage/:articleID',
      name: 'readArticlePage',
      component: readArticlePage
    }
  ]
})
