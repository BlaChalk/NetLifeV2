<template lang="pug">
  #table(@wheel.prevent="wheel")
    .login
      img.user_sticker(src="../assets/entry/inside_Screen/user_sticker.png")
      img.login_button(src="../assets/entry/inside_Screen/login_button.png" @click="showTable()")
    .cover(v-for="tableList in tableLists")
      img.icon(:src="tableList.img" @click="showDetail(tableList)")
    .pop_up_window(draggable="true")
      img.window_simple(src="../assets/entry/inside_Screen/window_simple.png" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', 'This text may be dragged')")
      .features
        img.i(src="../assets/entry/inside_Screen/i.svg")
        img.o(src="../assets/entry/inside_Screen/o.svg")
        img.x(src="../assets/entry/inside_Screen/x.svg")
      .message 這是一個測試用的信息，這是一個測試用的信息，這是一個測試用的信息，這是一個測試用的信息。
    img.toolbox(src="../assets/entry/inside_Screen/toolbox.png")
      
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      tableLists: [
        {
          name: 'calculator',
          img: require('@/assets/calculator.png'),
          detail: '這是測驗用文字1'
        },
        {
          name: 'chrome',
          img: require('@/assets/chrome.png'),
          detail: '這是測驗用文字2'
        },
      ],
      currentTableList: null,
      tableZoomIn: 150
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
      $('.toolbox').show()
      $('.login').hide()
      this.$emit('windowZoomIn', this.tableZoomIn)
    },
    showDetail(tableList){
      this.currentTableList = tableList
      $('.pop_up_window').show()
      // $('.pop_up_window').toggle()
      $('.message').text(this.currentTableList.detail)
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
    top: 25%
    left: 20%
    width: 60%
    height: 45%
    background-color: rgba(white, 0.1)
    .login
      width: 100%
      height: 100%
      position: relative
      .user_sticker
        position: absolute
        width: 10vw
        left: 50%
        top: 20%
        transform: translateX(-50%)
      .login_button
        position: absolute
        width: 20vw
        left: 50%
        top: 120%
        transform: translateX(-50%)
        &:hover
          cursor: url(~@/assets/pointer.png), pointer
          width: 22vw
    .cover
      // display: none
      position: relative
      display: flex
      justify-content: center
      align-items: center
      left: 5%
      top: 5%
      width: 7vw
      height: 7vw
      min-width: 2vw
      min-height: 2vw
      max-width: 7vw
      max-height: 7vw
      margin-top: 1vw
      .icon
        display: none
        // position: absolute
        width: 100%
        // height: 10%
        cursor: url(~@/assets/pointer.png), pointer
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
        left: 2.5vw
        top: -10vw
        text-align: left
        color: #222
    .toolbox
      display: none
      position: absolute
      bottom: 0
      width: 100%
</style>