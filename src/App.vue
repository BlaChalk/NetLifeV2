<template lang="pug">
  #app
    //- router-link(to="/")
    <router-view/>
</template>

<style lang="sass">
html, body
  height: 100%
  margin: 0

#app
  // border: 1px solid #000
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  // color: #2c3e50
  background-color: #F6FFF8
  height: 100%

#nav
  a
    color: #2c3e50
    &.router-link-exact-active
      color: #42b983
</style>
