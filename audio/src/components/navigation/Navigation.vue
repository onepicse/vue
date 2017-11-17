<template>
  <div class="navigation">
    <mu-paper>
      <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
        <router-link to="/discovery" active-class="mu-bottom-item-active" class="mu-buttom-item">
          <div class="mu-buttom-item-wrapper">
            <i class="mu-bottom-item-icon mu-icon material-icons">
              shoppingmusic
            </i>
            <span class="mu-bottom-item-text">
              发现音乐
            </span>
          </div>
        </router-link>
        <router-link to="/myself" active-class="mu-bottom-item-active" class="mu-buttom-item">
          <div class="mu-buttom-item-wrapper">
            <i class="mu-bottom-item-icon mu-icon material-icons">
              headset
            </i>
            <span class="mu-bottom-item-text">
              我的音乐
            </span>
          </div>
        </router-link>
        <router-link to="/friends" active-class="mu-bottom-item-active" class="mu-buttom-item">
          <div class="mu-buttom-item-wrapper">
            <i class="mu-bottom-item-icon mu-icon material-icons">
              people
            </i>
            <span class="mu-bottom-item-text">
              朋友
            </span>
          </div>
        </router-link>
        <router-link to="/user" active-class="mu-bottom-item-active" class="mu-buttom-item">
          <div class="mu-buttom-item-wrapper">
            <i class="mu-bottom-item-icon mu-icon material-icons">
              person
            </i>
            <span class="mu-bottom-item-text">
              账号
            </span>
          </div>
        </router-link>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      bottomNav: 'shoppingmusic'
    }
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>

<style>
  .navigation{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
  }
</style>