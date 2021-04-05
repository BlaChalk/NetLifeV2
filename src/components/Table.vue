<template lang="pug">
  #table(@wheel.prevent="wheel")
    .cover(v-for="tableList in tableLists")
      img(:src="tableList.img")
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      tableLists: [
        {
          name: 'calculator',
          img: '/img/calculator.png'
        },
        {
          name: 'chrome',
          img: '/img/chrome.png'
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
    position: relative
    display: flex
    flex-direction: column
    justify-content: start
    align-items: start
    width: 100%
    height: 100%
    min-width: 50%
    min-height: 50%
    background-color: #777
    .cover
      width: 8vw
      height: 8vw
      min-width: 4vw
      min-height: 4vw
      max-width: 8vw
      max-height: 8vw
      margin: 30px
      margin-bottom: 0px
      img
        width: 100%
        height: 100%
</style>