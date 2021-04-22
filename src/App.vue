<template lang="pug">
#app
  //- router-link(to="/")
  <router-view/>
  //- .swiper-container
    .swiper-wrapper
      .swiper-slide 首頁
      .swiper-slide 第一
      .swiper-slide 第二
      .swiper-pagination
      .swiper-scrollbar
</template>

<style lang="sass">

$color_blue_start: #011627
$color_blue_end: #F6FFF8

html, body
  height: 100%
  margin: 0
  overflow: hidden

#app
  // border: 1px solid #000
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  // color: #2c3e50
  background: linear-gradient(20deg, $color_blue_start, $color_blue_end)
  background-size: 100% 500%
  animation: daylight 30s both 1
  @keyframes daylight
    0%
      background-position: 100% 0%
    100%
      background-position: 100% 100%
  height: 100%
  cursor: url(/img/cursor.png), auto
.swiper-container
  width: 10vw
  height: 100vh
  float: right
  // border: 1px solid #000
  background-color: rgba(250, 243, 221, 0.7)
  .swiper-slide
    display: flex
    justify-content: center
    align-items: center
    font-size: 1.2rem
    cursor: url(/img/pointer.png), pointer
    color: #111
    &:hover
      font-size: 1.7rem
  .swiper-slide-active
      font-weight: bold
      font-size: 1.7rem

</style>
