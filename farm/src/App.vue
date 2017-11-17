<template>
  <div id="app">
    <transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
      <router-view></router-view>
    </transition>
    <v-bottomNav v-if="isShow"></v-bottomNav>
    <transition enter-active-class="animated slideInUp delay" leave-active-class="animated slideOutDown ">
      <v-login v-if="showLogin"></v-login>
      <v-register v-if="showRegister"></v-register>
    </transition> 

    <transition enter-active-class="animated slideInRight delay" leave-active-class="animated slideOutRight ">
      <v-seller v-if="showseller"></v-seller>
    </transition>
    <!-- loading动画 -->
    <div v-if="isLoading" class="loading-wrap">
      <div class="loading">
         <mu-circular-progress style="margin: 10px;" :size="40" color="#fff"/>
      </div>
    </div>
    <!-- 操作成功 -->
    <div v-if="showOperationSuccess" class="operationSuccess">
      <div class="success-wrap">
        <i class="icon-white-success"></i>
        <span>操作成功</span>
      </div>
    </div>
    <!-- 操作失败 -->
    <div v-if="showOperationError" class="operationError">
      <div class="error-wrap">
        <i class="icon-white-error"></i>
        <span>操作失败</span>
      </div>
    </div>
  </div>
</template>

<script>
  import bottomNav from '@/components/bottomNav/bottomNav'
  import login from '@/components/login/login'
  import register from '@/components/register/register'
  import seller from '@/components/seller/seller'
  export default {
    name: 'app',
    data() {
      return{

      }
    },
    methods: {

    },
    created: function () {
        //发送请求 获得两家 商家数据 
        //塞进index组件中
    },
    computed: {
        isShow: function () {
          return this.$store.state.showBottomNav;
        },
        showLogin: function () {
          return this.$store.state.showLogin;
        },
        showRegister: function () {
          return this.$store.state.showRegister;
        },
        showseller: function () {
          return this.$store.state.showseller;
        },
        isLoading: function () {
          return this.$store.state.isLoading;
        },
        showOperationSuccess: function () {
          return this.$store.state.showOperationSuccess;
        },
        showOperationError: function () {
          return this.$store.state.showOperationError;
        }
    },
    components: {
        'v-bottomNav' : bottomNav,
        'v-login' : login,
        'v-register' : register,
        'v-seller' : seller
      }
    }
  </script>

  <style lang="less">
    @import url(./assets/css/base.less);
    .delay{
      animation-delay:  0.3s;
    }
    #mapwrap{
      width: 100%;
      heigth: 667px;
    }
    .icon-white-success{
      background-image: url(./assets/img/icon-success.png)
    }
    .icon-white-error{
      background-image: url(./assets/img/icon-error.png)
    }
  </style>
