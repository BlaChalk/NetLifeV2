<template lang="pug">
  #table
    .login
      img.user_sticker(src="../assets/entry/inside_Screen/user_sticker.png")
      img.login_button(src="../assets/entry/inside_Screen/login_button.png" @click="showTable(); hideLogin()")
    .cover(v-for="tableList in tableLists")
      img.icon(:src="tableList.img" @dblclick="showDetail(tableList); zoomInDetail(tableList)")
      .name {{ tableList.name }}
    .pop_up_window(:id="'PopUpWindow'+currentTableList.number" v-for="currentTableList in currentTableLists")
      img.window_simple(src="../assets/entry/inside_Screen/window_simple.png" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', 'This text may be dragged')")
      .features
        img.i(src="../assets/entry/inside_Screen/i.svg" @click="zoomOutDetail(currentTableList)")
        img.o(src="../assets/entry/inside_Screen/o.svg")
        img.x(src="../assets/entry/inside_Screen/x.svg" @click="closeDetail(currentTableList)")
      .message {{ currentTableList.detail }}
    img.toolbox(src="../assets/entry/inside_Screen/toolbox.png")
    .thumbnailList(v-show="isThumbnail")
      .openedThumbnail(v-for="(currentTableList, key) in currentTableLists")
        img(:src="currentTableList.thumbnail" @click="showDetail(currentTableList); zoomInDetail(currentTableList)")
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
          number: '1',
          name: '本機',
          img: require('@/assets/entry/inside_Screen/PC.png'),
          thumbnail: require('@/assets/entry/inside_Screen/PC_thumbnail.png'),
          detail: '這是畚箕',
          show: false
        },
        {
          number: '2',
          name: '檔案總管',
          img: require('@/assets/entry/inside_Screen/folder.png'),
          thumbnail: require('@/assets/entry/inside_Screen/folder_thumbnail.png'),
          detail: '這是總管',
          show: false
        },
        {
          number: '3',
          name: '資源回收桶',
          img: require('@/assets/entry/inside_Screen/RecycleBin.png'),
          thumbnail: require('@/assets/entry/inside_Screen/recycleBin_thumbnail.png'),
          detail: '這是回收桶',
          show: false
        },
      ],
      currentTableLists: [],
      isThumbnail: true,
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
      setTimeout(() => {
        $('.cover').show()
        $('.icon').show()
        $('.name').show()
        $('.thumbnailList').css('display', 'flex')
      }, 800);
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
      $('.thumbnailList').hide()
    },
    showLogin(){
      $('.user_sticker').css('top', '20%')
      $('.login_button').css('top', '120%')
      setTimeout(() => {
        $('.login').show().css('height', '25vh')
      }, 800);
    },
    hideLogin(){
      $('.login').hide()
    },
    showDetail(tableList){
      this.currentTableLists.push(tableList)
      // 確保沒有重複
      this.currentTableLists = this.currentTableLists.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
      })
      this.isThumbnail = true
      // $('.pop_up_window').toggle()
    },
    zoomOutDetail(currentTableList){
      this.$nextTick(()=>{
        TweenMax.to('#PopUpWindow'+currentTableList.number, 0.8, {
          left: 40 + '%',
          top: 90 + '%',
          width: 5 + '%',
          opacity: 0,
          ease: Power2.out
        })
        $('#PopUpWindow'+currentTableList.number+' .message').css('opacity', '0')
        $('#PopUpWindow'+currentTableList.number+' .features').css('opacity', '0')
      })
    },
    zoomInDetail(currentTableList){
      this.$nextTick(()=>{
        TweenMax.to('#PopUpWindow'+currentTableList.number, 0.8, {
          left: 20 + '%',
          top: 10 + '%',
          width: 70 + '%',
          opacity: 1,
          ease: Power2.out
        })
        setTimeout(() => {
          TweenMax.to('#PopUpWindow'+currentTableList.number+' .message', 0.3, {
            'opacity': 1
          })
          TweenMax.to('#PopUpWindow'+currentTableList.number+' .features', 0.3, {
            'opacity': 1
          })
        }, 500);
      })
    },
    closeDetail(tableList){
      this.currentTableLists = this.currentTableLists.filter(function (item) {
        return item != tableList
      })
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
      this.currentTableLists = []
    },
    shuDownScreen(){
      this.$emit('shuDownScreen')
      this.isPanelOpen = !this.isPanelOpen
      this.hideTable()
      this.hideLogin()
      this.currentTableLists = []
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
        // width: 100%
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
      width: 5%
      left: 40%
      top: 90%
      .features
        opacity: 0
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
        opacity: 0
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
    .thumbnailList
      display: flex
      justify-content: start
      align-items: start
      position: absolute
      width: 65%
      height: 5vh
      left: 10vw
      bottom: 1.5vh
      .openedThumbnail
        display: flex
        justify-content: center
        align-items: center
        position: relative
        height: 100%
        width: 2.5vw
        left: 0vw
        margin-right: 0.5vw
        border-bottom: 1.5px solid rgba(30, 100, 100, 0.8)
        &:hover
          cursor: url(~@/assets/pointer.png), pointer
          background-color: rgba(150, 150, 150, 0.6)
        img
          width: 75%
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