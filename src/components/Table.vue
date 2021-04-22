<template lang="pug">
  #table(@wheel.prevent="wheel")
    .cover(v-for="tableList in tableLists")
      img(:src="tableList.img")
    img.window_simple(src="../assets/entry/inside_Screen/window_simple.png")
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
          img: process.env.NODE_ENV === 'production' ? '/NetLifeV2/img/calculator.png' : '/img/calculator.png'
        },
        {
          name: 'chrome',
          img: process.env.NODE_ENV === 'production' ? '/NetLifeV2/img/chrome.png' : '/img/chrome.png'
        },
      ]
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
    .window_simple
      width: 60%
      left: 20%
      top: 10%
    .toolbox
      position: absolute
      bottom: 0
      width: 100%
</style>