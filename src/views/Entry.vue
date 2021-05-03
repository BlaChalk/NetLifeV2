<template lang="pug">
  #entry
    img.table(src="../assets/entry/table.png")
    img.window(src="../assets/entry/window.png")
    .computer
      img.screen(src="../assets/entry/screen.png" :class="{isHoverScreen: isHoverScreen}")
      .button
        img.down(src="../assets/entry/down.png" @click="setScreenOpacityDown()")
        img.up(src="../assets/entry/up.png"  @click="setScreenOpacityUp()")
        img.menu(src="../assets/entry/menu.png")
        img.screen_button(src="../assets/entry/screen_button.png" @click="closeScreenAndZoomOut()")
      img.keyboard(src="../assets/entry/keyboard.png")
      img.mouse(src="../assets/entry/mouse.png")
      img.host(src="../assets/entry/host.png")
      img.stereo_left(src="../assets/entry/stereo_left.png")
      img.stereo_right(src="../assets/entry/stereo_right.png")
    img.photoFrame(src="../assets/entry/photoFrame.png" @click="getDetailBackground(0)")
    .todolists(@click="getDetailBackground(1)")
      img.todolist.todolist1(src="../assets/entry/todolist1.png")
      img.todolist.todolist2(src="../assets/entry/todolist2.png")
    img.plant(src="../assets/entry//plant.png" @click="getDetailBackground(2)")
    .tissues
      img.tissue.tissue1(src="../assets/entry/tissue1.png")
      img.tissue.tissue2(src="../assets/entry/tissue2.png")
    img.lamp(src="../assets/entry/lamp.gif")
    img.mug(src="../assets/entry/mug.png" @click="getDetailBackground(3)")
    .showDetail(v-show="isShowDetail" @click="isShowDetail=false")
      img#detailBackground
      #detailText
    Table(ref="table" :windowSize="windowSize" @windowZoomIn="selfZoomIn" @reStartScreen="zoomInScreen" @shuDownScreen="closeScreenAndZoomOut")
    //- Nav
</template>

<script>
import Table from '@/components/Table.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'entry',
  data() {
    return {
      windowSize: [],
      isHoverScreen: false,
      isShowDetail: false,
      detailBackground: [
        {
          name: 'photoFrame_background',
          img: require('@/assets/entry/photoFrame_background.png'),
          width: '46%',
          top: '0vh',
          left: '0vw'
        },
        {
          name: 'todolist_background',
          img: require('@/assets/entry/todolist_background.png'),
          text: '<b>Step01自覺： </b><br>紀錄自己的使用習慣。從記錄當中找到自己的問題。根據問題規劃執行目標。<br><br><b>Step02 規劃： </b><br>設定自己能負荷的階段性小目標和最終目標，並限制自己在時間內執行目標。<br><br><b>Step03 測試： </b><br>執行規劃中的目標，並記錄每一次的執行情況，持續觀察約2~4週。<br><br><b>Step04 修正： </b><br>執行一段時間後，將記錄拿出來觀察。若執行狀況差，則檢討失敗原因重新調整後再次執行。<br><br><b>Step05 達成科技平衡： </b><br>如果過程中順利，能夠持續執行，那麼，恭喜你!請繼續加油!，美好的成果正在等著你。',
          width: '75%',
          top: '0vh',
          left: '0vw'
        },
        {
          name: 'plant_background',
          img: require('@/assets/entry/plant_background.png'),
          width: '70%',
          top: '0vh',
          left: '0vw'
        },
        {
          name: 'mug_background',
          img: require('@/assets/entry/mug_background.png'),
          text(){
            let drawList = ['今天還是好星報', '初一十五看月亮']
            return drawList[Math.round(Math.random()*2)-1]
          },
          width: '60%',
          top: '10vh',
          left: '10vw'
        }
      ]
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
    selfZoomIn(val){
      TweenMax.to('#entry', 0.8, {
        width: val*(3/5) + 'vw',
        height: val + 'vh',
      })
    },
    setScreenOpacityUp(){
      this.$refs.table.screenOpacityUp()
    },
    setScreenOpacityDown(){
      this.$refs.table.screenOpacityDown()
    },
    closeScreenAndZoomOut(){
      $('.button').hide().css('opacity', '0')
      this.$refs.table.turnOffScreen()
      TweenMax.to('#entry', 0.8, {
        width: 35*(3/5) + 'vw' ,
        height: 35 + 'vh'
      })
      setTimeout(() => {
        this.isHoverScreen = true
      }, 1000);
      $('.screen').css('cursor', process.env.NODE_ENV === 'production' ? 'url(/NetLifeV2/img/pointer.png), pointer' : 'url(/img/pointer.png), pointer')
      
      let screen = document.querySelector('.screen')
      let _this = this

      screen.addEventListener('click', function () {
        _this.zoomInScreen()
      })
    },
    zoomInScreen(){
      setTimeout(() => {
        $('.button').show()
        TweenMax.to('.button', 0.8, {
          opacity: 1
        })
      }, 200);
      this.$refs.table.turnOnScreen()
      TweenMax.to('#entry', 0.8, {
        width: 100*(3/5) + 'vw' ,
        height: 100 + 'vh'
      })
      this.isHoverScreen = false
      $('.screen').css('cursor', process.env.NODE_ENV === 'production' ? 'url(/NetLifeV2/img/cursor.png), auto' : 'url(/img/cursor.png), auto')
    },
    getDetailBackground(number){
      this.isShowDetail = true
      let detailBackgroundData = this.detailBackground[number]
      let detailBackgroundId = document.getElementById('detailBackground')
      let detailTextId = document.getElementById('detailText')
      
      detailBackgroundId.src = detailBackgroundData.img
      detailBackgroundId.style.width = detailBackgroundData.width
      detailTextId.style.top = detailBackgroundData.top
      detailTextId.style.left = detailBackgroundData.left

      $('#detailText').html('')
      $('#detailText').html(detailBackgroundData.text)
    }
  }
}
$(function() {

  let plusURL = process.env.NODE_ENV === 'production' ? '/NetLifeV2' : ''

  $('.plant').hover(
    function(){
      let src = plusURL+'/img/plant_growing.gif'
      $(this).attr( "src", src.replace( /\.gif$/, ".gif?rnd=" + Math.floor(Math.random() * 100) + 1));
      $(this).css({'width': '90%', 'transform': 'translate(-5%, -20%)'})
    },  
    function(){
      let plant_src = plusURL+'/img/plant.png'
      $(this).attr('src', plant_src)
      $(this).css({'width': '80%', 'transform': 'translate(0%, 5%)'})
  })
  $('.mug').hover(
    function(){
      let src = plusURL+'/img/mug_falling.gif'
      $(this).attr( "src", src.replace( /\.gif$/, ".gif?rnd=" + Math.floor(Math.random() * 100) + 1));
      $(this).css({'width': '100%', 'transform': 'translate(-35%, -10%)'})
    },  
    function(){
      let plant_src = plusURL+'/img/mug.png'
      $(this).attr('src', plant_src)
      $(this).css({'width': '30%', 'transform': 'translate(5%, 10%)'})
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
    max-width: calc(150vw*(3/5))
    max-height: 150vh
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
        &.isHoverScreen
          &:hover
            width: 110%
            height: 110%
            transform: translate(-5%, -5%)
      .button
        display: inline-block
        img
          width: 5vw
          height: 3vw
          top: 85%
          &:hover
            cursor: url(~@/assets/pointer.png), pointer
            background-color: #333
            opacity: 0.5
        .down
          left: 15%
        .up
          left: 31%
        .screen_button
          left: 73%
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
      &:hover
        cursor: url(~@/assets/pointer.png), pointer
    .showDetail
      position: absolute
      display: flex
      justify-content: center
      align-items: center
      width: 100vw
      height: 100vh
      left: -31.6vw
      top: -32.6vh
      background-color: rgba(black, 0.6)
      #detailBackground
        width: 100%
        z-index: 10
      #detailText
        position: relative
        width: 55vw
        height: 65vh
        z-index: 11
        font-size: 28px
        text-align: left
        overflow-y: scroll
      ::-webkit-scrollbar
        width: 18px
      ::-webkit-scrollbar-thumb
        background-color: rgba(0, 0, 0, 0.5)
        border-radius: 10px
</style>