<template lang="pug">
  #entry
    <Table/>
    <Nav/>
</template>

<script>
import Table from '@/components/Table.vue'
import Nav from '@/components/Nav.vue'

export default {
  name: 'entry',
  components: {
      Table, Nav
  }
}
</script>

<style lang="sass">
  #entry
    border: 1px solid #000
    height: 100vh
    width: 100vw
    background-color: #aaa
</style>