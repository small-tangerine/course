<template>
  <div id="app" :style="getStyle">
    <!-- content -->
    <mooc-container>
      <mooc-header height="72px">
        <m-header />
      </mooc-header>
      <mooc-main>
        <router-view />
      </mooc-main>
    </mooc-container>
    <!-- back to top -->
    <mooc-backtop :show-height="500"></mooc-backtop>
    <!-- login -->
    <login style="z-index: 5000!important;" v-if="showLogin" @maskClick="handleMaskClick" />
  </div>
</template>
<script>
import MHeader from 'components/header/index.vue'
import { mapGetters, mapMutations } from 'vuex'
import { scrollMixin } from 'assets/js/mixin.js'
export default {
  name: 'App',
  mixins: [scrollMixin],
  computed: {
    getStyle () {
      return {
        'max-height': this.showLogin ? '100%' : '',
        'overflow': this.showLogin ? 'hidden' : ''
      }
    },
    ...mapGetters(['showLogin'])
  },
  methods: {
    handleMaskClick () {
      this.setShowLogin(!this.showLogin)
    },
    ...mapMutations({
      'setShowLogin': 'login/SET_SHOW_LOGIN'
    })
  },
  components: {
    MHeader,
    Login: () => import('components/login/index.vue')
  }
}
</script>
