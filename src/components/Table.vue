<template lang="pug">
  #table
    .login
      img.user_sticker(src="../assets/entry/inside_Screen/user_sticker.png")
      img.login_button(src="../assets/entry/inside_Screen/login_button.png" @click="showTable(); hideLogin()")
    .cover(v-for="tableList in tableLists")
      img.icon(:src="tableList.img" @click="showDetail(tableList)")
      .name {{ tableList.name }}
    .pop_up_window(draggable="true")
      img.window_simple(src="../assets/entry/inside_Screen/window_simple.png" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', 'This text may be dragged')")
      .features
        img.i(src="../assets/entry/inside_Screen/i.svg")
        img.o(src="../assets/entry/inside_Screen/o.svg")
        img.x(src="../assets/entry/inside_Screen/x.svg" @click="closeDetail()")
      .message 這是一個測試用的信息，這是一個測試用的信息，這是一個測試用的信息，這是一個測試用的信息。
    img.toolbox(src="../assets/entry/inside_Screen/toolbox.png")
    .startFunction(:class="{isPanelOpen: isPanelOpen}")
      img.start_panel(src="../assets/entry/inside_Screen/start_panel.png")
      img.turnOffButton.reStart(src="../assets/entry/inside_Screen/reStart.png" @click="reStartScreen()")
      img.turnOffButton.shutDown(src="../assets/entry/inside_Screen/shutDown.png" @click="shuDownScreen()")
    .start_button(@click="isPanelOpen=!isPanelOpen")
      
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      tableLists: [
        {
          name: '本機',
          img: require('@/assets/entry/inside_Screen/PC.png'),
          detail: '這是測驗用文字1'
        },
        {
          name: '檔案總管',
          img: require('@/assets/entry/inside_Screen/folder.png'),
          detail: '這是測驗用文字2'
        },
        {
          name: '資源回收桶',
          img: require('@/assets/entry/inside_Screen/RecycleBin.png'),
          detail: '這是測驗用文字2'
        },
      ],
      currentTableList: null,
      tableZoomIn: 150,
      screenOpacityAlt: 0.2,
      isPanelOpen: true
    };
  },
  props: {
    windowSize: {
      default: [0, 0]
    }
  },
  methods: {
    wheel(evt){
      TweenMax.to('.cover', 0.8, {
        width: '-=' + evt.deltaY/100 + 'vw',
        height: '-=' + evt.deltaY/100 + 'vw',
      })
    },
    showTable(){
      $('.cover').show()
      $('.icon').show()
      $('.name').show()
      $('.toolbox').show()
      $('.start_button').show()
      this.$emit('windowZoomIn', this.tableZoomIn)
    },
    hideTable(){
      $('.cover').hide()
      $('.icon').hide()
      $('.name').show()
      $('.toolbox').hide()
      $('.start_button').hide()
      $('.pop_up_window').hide()
    },
    showLogin(){
      setTimeout(() => {
        $('.login').show().css('height', '25vh')
      }, 800);
    },
    hideLogin(){
      $('.login').hide()
    },
    showDetail(tableList){
      this.currentTableList = tableList
      $('.pop_up_window').show()
      // $('.pop_up_window').toggle()
      $('.message').text(this.currentTableList.detail)
    },
    closeDetail(){
      $('.pop_up_window').hide()
    },
    screenOpacityUp(){
      TweenMax.to('#table', 0.5, {
        opacity: '+=' + this.screenOpacityAlt
      })
    },
    screenOpacityDown(){
      console.log('I am work.')
      TweenMax.to('#table', 0.5, {
        opacity: '-=' + this.screenOpacityAlt
      })
    },
    turnOffScreen(){
      $('#table').hide()
      this.hideLogin()
    },
    turnOnScreen(){
      $('#table').show()
      this.showLogin()
    },
    reStartScreen(){
      this.$emit('reStartScreen')
      this.isPanelOpen = !this.isPanelOpen
      this.hideTable()
      this.showLogin()
    },
    shuDownScreen(){
      this.$emit('shuDownScreen')
      this.isPanelOpen = !this.isPanelOpen
      this.hideTable()
      this.hideLogin()
    }
  }
}
</script>

<style lang="sass">
  #table
    position: relative
    display: flex
    flex-direction: column
    justify-content: start
    align-items: start
    top: 20%
    left: 20%
    width: 60%
    height: 50%
    background-color: rgba(white, 0.1)
    .login
      width: 100%
      height: 100%
      display: block
      position: relative
      .user_sticker
        display: block
        position: absolute
        width: 10vw
        left: 50%
        top: 50%
        transform: translateX(-50%)
      .login_button
        display: block
        position: absolute
        width: 20vw
        left: 50%
        top: 190%
        transform: translateX(-50%)
        &:hover
          cursor: url(~@/assets/pointer.png), pointer
          width: 22vw
    .cover
      position: relative
      display: flex-block
      justify-content: center
      align-items: center
      left: 4vw
      width: 5vw
      height: 5vw
      margin-top: 3.5vw
      cursor: url(~@/assets/pointer.png), pointer
      .icon
        display: none
        position: relative
        width: 100%
        height: 100%
      .name
        display: none
        position: relative
        width: 100%
        font-size: 14px
        margin-top: 1vh
        color: #fff
    .pop_up_window
      position: absolute
      width: 70%
      left: 20%
      top: 10%
      display: none
      .features
        position: absolute
        right: 0%
        top: 0%
        height: 3vw
        width: 12vw
        .i, .o, .x
          position: relative
          width: 1.5vw
          height: 1.5vw
          margin: 0.8vw 0.75vw
          background-color: #eeeeee
          &:hover
            background-color: #BCB8B1
            cursor: url(~@/assets/pointer.png), pointer
        .x:hover
          background-color: #DD1155
      .window_simple
        position: relative
        width: 100%
      .message
        position: relative
        width: 80%
        left: 5vw
        top: -15vw
        text-align: left
        color: #222
    .toolbox
      display: none
      position: absolute
      bottom: 0
      width: 100%
    .startFunction
      &.isPanelOpen
        display: none
      .start_panel
        position: absolute
        user-select: none
        width: 12vw
        bottom: 3.7vw
      .turnOffButton
        width: 3vw
        left: 3vw
        bottom: 5vw
        opacity: 0.8
        cursor: url(~@/assets/pointer.png), pointer
        &:hover
          background-color: #333
          opacity: 1
      .shutDown
        left: 7vw
    .start_button
      display: none
      background-color: #666
      position: absolute
      user-select: none
      bottom: 1vw
      width: 4vw
      height: 1.5vw
      left: 1.5vw
      &:hover
        background-color: #333
        cursor: url(~@/assets/pointer.png), pointer
</style>