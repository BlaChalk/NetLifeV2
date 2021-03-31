<template lang="pug">
  #table
    .cover(v-for="tableList in tableLists")
      img(alt="" :src="tableList.img")
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      tableLists: [
        {
          name: 'calculator',
          img: '../assets/calculator.png'
        },
        {
          name: 'chrome',
          img: '../assets/chrome.png'
        },
      ]
    };
  },
  props: {
    windowSize: {
      default: [0, 0]
    }
  },
  watch: {
    windowSize () {

      TweenMax.to('.cover', 0.5, {
        width: this.windowSize[0]/15,
        height: this.windowSize[0]/15
      })
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
    width: 100%
    height: 100%
    background-color: #777
    .cover
      width: 80px
      height: 80px
      margin: 30px
      margin-bottom: 0px
      img
        width: 100%
        height: 100%
</style>