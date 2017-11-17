<template>
<div class="list">
  <div class="list-cells">
      <div class="list-cell">
          <div class="list-cell-hd">
              <img width="18" src="./msg-icon.png" alt="">
          </div>
          <div class="list-cell-bd">
            <p>我的消息</p>
          </div>
          <div class="list-cell-ft"></div>
      </div>
    </div>
    <div class="list-cells">
      <div class="list-cell">
          <div class="list-cell-hd">
              <img width="18" src="./vip-icon.png" alt="">
          </div>
          <div class="list-cell-bd">
            <p>会员中心</p>
          </div>
          <div class="list-cell-ft"></div>
      </div>
      <div class="list-cell">
          <div class="list-cell-hd">
              <img width="18" src="./shop-icon.png" alt="">
          </div>
          <div class="list-cell-bd">
            <p>商城</p>
          </div>
          <div class="list-cell-ft"></div>
      </div>
      <div class="list-cell">
          <div class="list-cell-hd">
              <img width="18" src="./box-icon.png" alt="">
          </div>
          <div class="list-cell-bd">
            <p>在线免流量听歌</p>
          </div>
          <div class="list-cell-ft"></div>
      </div>
    </div>
    <div class="list-cells">
      <div class="list-cell">
          <div class="list-cell-hd">
              <img width="18" src="./setting-icon.png" alt="">
          </div>
          <div class="list-cell-bd">
            <p>设置</p>
          </div>
          <div class="list-cell-ft"></div>
      </div>
      <div class="list-cell">
          <div class="list-cell-hd">
              <img width="18" src="./Code-icon.png" alt="">
          </div>
          <div class="list-cell-bd">
            <p>扫一扫</p>
          </div>
          <div class="list-cell-ft"></div>
      </div>
      <div class="list-cell">
          <div class="list-cell-hd">
              <img width="18" src="./clothes-icon.png" alt="">
          </div>
          <div class="list-cell-bd">
            <p>主题换肤</p>
          </div>
          <div class="list-cell-ft"></div>
      </div>
    </div>
</div>
    
</template>

<script>
  export default {
    name:'list'
  }
</script>

<style>
    .list-cells{
      display: block;
      width: 100%;
      height: auto;
      padding-top: 10px;
      background-color: #eeeff0;
    }

    .list-cell{
      display: block;
      width: 100%;
      height: 45px;
      background-color: #feffff;
    }
    .list-cell{
      border-bottom: 1px solid #e5e5e5 
    }
    .list-cell>.list-cell-hd{
      display: inline-block;
      width: 45px;
      height: 100%;
      vertical-align: top;
    }
    .list-cell-hd>img{
      display: block;
      margin: 13.5px auto 0 auto;
    }
    .list-cell-bd{
      display: inline-block;
      font-size: 14px;
      line-height: 45px;
      color: #333;
      text-align: right;
    }
    .list-cell-bd>p{
      margin: 0;
    }
</style>