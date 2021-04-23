<template lang="pug">
  #table(@wheel.prevent="wheel")
    .cover(v-for="tableList in tableLists")
      img(:src="tableList.img" @click="showDetail(tableList)")
    .pop_up_window
      img.window_simple(src="../assets/entry/inside_Screen/window_simple.png")
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
      currentTableList: null
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
    position: absolute
    display: flex
    flex-direction: column
    justify-content: start
    align-items: start
    top: 25%
    left: 20%
    width: 60%
    height: 45%
    // background-color: rgba(white, 0.7)
    .cover
      // border: 1px solid #000
      display: flex
      justify-content: center
      align-items: center
      left: 5%
      top: 5%
      width: 8vw
      height: 8vw
      min-width: 2vw
      min-height: 2vw
      max-width: 8vw
      max-height: 8vw
      img
        position: absolute
        width: 12%
        height: 20%
    .pop_up_window
      position: absolute
      width: 70%
      left: 20%
      top: 10%
      display: none
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
      position: absolute
      bottom: 0
      width: 100%
</style>