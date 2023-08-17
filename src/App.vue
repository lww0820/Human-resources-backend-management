<template>
  <div id="app">
    <!-- {{ num }} -->
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState('zzh', ['name'])
  },
  created() {
    console.log('zzh',this.name);
  }
}
</script>
