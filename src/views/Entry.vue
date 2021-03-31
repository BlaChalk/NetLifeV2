<template lang="pug">
  #entry(@wheel.prevent="wheel")
    Table(:windowSize="windowSize")
    Nav
</template>

<script>
import Table from '@/components/Table.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'entry',
  data() {
    return {
      windowSize: []
    }
  },
  components: {
      Table, Nav
  },
  methods: {
    wheel(evt){
      // if($('#entry').width() > 720) {
        TweenMax.to('#entry', 0.8, {
          width: '-=' + evt.deltaY/10 + 'vw',
          height: '-=' + evt.deltaY/10 + 'vh',
        })
        this.windowSize = [$('#entry').width(), $('#entry').height()]
      // }
    },
  }
}

</script>

<style lang="sass">
  #entry
    position: relative
    border: 1px solid #000
    width: 100vw
    height: 100vh
    min-width: 50vw
    min-height: 50vh
    max-width: 100vw
    max-height: 100vh
    background-color: #aaa
</style>