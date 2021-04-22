<template lang="pug">
  #entry(@wheel.prevent="wheel")
    img.table(src="../assets/entry/table.png")
    img.window(src="../assets/entry/window.png")
    .computer
      img.screen(src="../assets/entry/screen.png")
      img.keyboard(src="../assets/entry/keyboard.png")
      img.mouse(src="../assets/entry/mouse.png")
      img.host(src="../assets/entry/host.png")
      img.stereo_left(src="../assets/entry/stereo_left.png")
      img.stereo_right(src="../assets/entry/stereo_right.png")
    img.photoFrame(src="../assets/entry/photoFrame.png")
    .todolists
      img.todolist.todolist1(src="../assets/entry/todolist1.png")
      img.todolist.todolist2(src="../assets/entry/todolist2.png")
    img.plant(src="../assets/entry//plant.png")
    .tissues
      img.tissue.tissue1(src="../assets/entry/tissue1.png")
      img.tissue.tissue2(src="../assets/entry/tissue2.png")
    img.lamp(src="../assets/entry/lamp.png")
    img.mug(src="../assets/entry/mug.png")
    Table(:windowSize="windowSize")
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
        width: '-=' + evt.deltaY/10*(3/5) + 'vw',
        height: '-=' + evt.deltaY/10 + 'vh',
      })
      // this.windowSize[0] -= this.windowSize[0]*(evt.deltaY/1000)
      // this.windowSize[1] -= this.windowSize[1]*(evt.deltaY/1000)

      // this.$forceUpdate()
    },
  }
}
$(function() {
    $('.plant').hover(
      function(){
        let src = '/img/plant_growing.gif'
        $(this).attr( "src", src.replace( /\.gif$/, ".gif?rnd=" + Math.floor(Math.random() * 100) + 1));
      },  
      function(){
        $(this).attr('src', '/img/plant.png')
    })
});

</script>

<style lang="sass">
  #entry
    position: absolute
    // border: 3vw solid #aaa
    width: calc(100vw*(3/5))
    height: 100vh
    min-width: calc(35vw*(3/5))
    min-height: 35vh
    // min-width: calc(50vw*(3/4))
    // min-height: 50vh
    max-width: calc(100vw*(3/5))
    max-height: 100vh
    left: 40%
    top: 50%
    transform: translate(-40%, -50%)
    background-color: #aaa
    img
      position: absolute
    .table
      width: 600%
      height: 450%
      left: -200%
      top: 80%
    .window
      width: 150%
      left: 100%
      top: -120%
    .computer
      .screen
        width: 100%
        height: 100%
        left: 0%
      .keyboard
        width: 116%
        top: 110%
        left: -8%
      .mouse
        width: 20%
        top: 120%
        left: 120%
      .host
        width: 45%
        height: 105%
        left: 100%
      .stereo_left
        width: 25%
        height: 60%
        top: 45%
        left: -25%
      .stereo_right
        width: 25%
        height: 60%
        top: 45%
        left: 145%
    .photoFrame
      width: 50%
      left: -10%
      top: -90%
      transform-origin: top
      animation: wiggle 2s infinite linear //  delay iteration-count direction fill-mode
      &:hover
        animation: none
        width: 55%
        cursor: url(~@/assets/pointer.png), pointer
    @keyframes wiggle
      0%
        transform: rotate(0deg)
      25%
        transform: rotate(10deg)
      75%
        transform: rotate(-10deg)
      100%
        transform: rotate(0deg)
          
    .todolists
      .todolist
        width: 30%
        left: -60%
        top: -40%
        &:hover
          width: 35%
          cursor: url(~@/assets/pointer.png), pointer
      .todolist1
        left: -100%
    .plant
      position: absolute
      width: 80%
      left: -130%
      top: 50%
      // background-size: cover
      // background-image: url(../assets/entry/plant.png)
      &:hover
        width: 90%
        transform: translate(-5%, -20%)
        cursor: url(~@/assets/pointer.png), pointer
      //   background-origin: border-box
      //   background-image: url(../assets/entry/plant_growing.gif)
    .tissues
      .tissue
        width: 20%
        left: -60%
        top: 140%
      .tissue1
        width: 25%
        left: -100%
        top: 160%
    .lamp
      width: 85%
      left: 170%
      top: 20%
    .mug
      width: 30%
      left: 150%
      top: 130%
</style>