<template lang="pug">
  #entry(@wheel.prevent="wheel")
    img.computer(src="../assets/entry/computer.svg")
    img.photoFrame(src="../assets/entry/photoFrame.png")
    .todolists
      img.todolist.todolist1(src="../assets/entry/todolist1.png")
      img.todolist.todolist2(src="../assets/entry/todolist2.png")
    img.plant(src="../assets/entry/plant.png")
    .tissues
      img.tissue.tissue1(src="../assets/entry/tissue1.png")
      img.tissue.tissue2(src="../assets/entry/tissue2.png")
    img.lamp(src="../assets/entry/lamp.png")
    img.mug(src="../assets/entry/mug.png")
    //- Table(:windowSize="windowSize")
    //- Nav
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
    // border: 3vw solid #aaa
    width: calc(100vw*(3/4))
    height: 100vh
    min-width: calc(20vw*(3/4))
    min-height: 20vh
    // min-width: calc(50vw*(3/4))
    // min-height: 50vh
    max-width: calc(100vw*(3/4))
    max-height: 100vh
    left: 25%
    top: 50%
    transform: translate(-20%, -50%)
    background-color: #aaa
    img
      position: absolute
    .computer
      width: 280%
      height: 280%
      left: -55%
      top: -55%
    .photoFrame
      width: 50%
      left: -50%
      top: -200%
    .todolists
      .todolist
        width: 30%
        left: -80%
        top: -50%
      .todolist1
        left: -120%
    .plant
        width: 80%
        left: -150%
        top: 50%
    .tissues
      .tissue
        width: 20%
        left: -80%
        top: 220%
      .tissue1
        width: 25%
        left: -130%
        top: 250%
    .lamp
      width: 100%
      width: 100%
      left: 220%
      top: 10%
    .mug
      width: 30%
      left: 180%
      top: 230%
</style>