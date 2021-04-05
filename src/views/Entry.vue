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
        width: '-=' + evt.deltaY/10*(3/4) + 'vw',
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
    border: 3vw solid #eee
    width: calc(100vw*(3/4))
    height: 100vh
    min-width: calc(50vw*(3/4))
    min-height: 50vh
    max-width: calc(100vw*(3/4))
    max-height: 100vh
    left: 25%
    top: 50%
    transform: translate(-20%, -50%)
    background-color: #aaa
</style>