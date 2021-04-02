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
  // mounted:function() {
  //     this.windowSize = [$('#entry').width(), $('#entry').height()]
    
  // },
  components: {
      Table, Nav
  },
  methods: {
    wheel(evt){
      TweenMax.to('#entry', 0.8, {
        width: '-=' + evt.deltaY/10 + 'vw',
        height: '-=' + evt.deltaY/10 + 'vh',
      })
      // this.windowSize[0] -= this.windowSize[0]*(evt.deltaY/1000)
      // this.windowSize[1] -= this.windowSize[1]*(evt.deltaY/1000)

      // this.$forceUpdate()
    },
  }
}

</script>

<style lang="sass">
  #entry
    position: absolute
    border: 1px solid #000
    width: 100vw
    height: 100vh
    min-width: 50vw
    min-height: 50vh
    max-width: 100vw
    max-height: 100vh
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    background-color: #aaa
</style>