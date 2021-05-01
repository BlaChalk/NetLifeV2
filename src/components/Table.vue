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
        img.o(src="../assets/entry/inside_Screen/o.svg" @click="fullDetailWindow(currentTableList)")
        img.x(src="../assets/entry/inside_Screen/x.svg" @click="closeDetail(currentTableList)")
      .message {{ currentTableList.detail }}
    img.toolbox(src="../assets/entry/inside_Screen/toolbox.png")
    .thumbnailList(v-show="isThumbnail")
      .openedThumbnail(:id="'thumbnail'+currentTableList.number" v-for="(currentTableList, key) in currentTableLists")
        img(:src="currentTableList.thumbnail" @click="showDetail(currentTableList); currentTableList.show ? zoomOutDetail(currentTableList) : zoomInDetail(currentTableList)")
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
        {
          number: '4',
          name: '身心健康',
          img: require('@/assets/entry/inside_Screen/health.png'),
          thumbnail: require('@/assets/entry/inside_Screen/health.png'),
          detail: '身心健康',
          show: false
        },
        {
          number: '5',
          name: '生活失能',
          img: require('@/assets/entry/inside_Screen/disability.png'),
          thumbnail: require('@/assets/entry/inside_Screen/disability.png'),
          detail: '生活失能',
          show: false
        },
        {
          number: '6',
          name: '社交障礙',
          img: require('@/assets/entry/inside_Screen/society.png'),
          thumbnail: require('@/assets/entry/inside_Screen/society.png'),
          detail: '社交障礙',
          show: false
        },
      ],
      currentTableLists: [],
      isThumbnail: true,
      tableZoomIn: 150,
      screenOpacityAlt: 0.2,
      isPanelOpen: true,
      zIndexCount: 1
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
      currentTableList.show = false
      $('#thumbnail'+currentTableList.number).css('border-bottom', 'none')
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
      currentTableList.show = true
      this.zIndexCount += 1
      $('#thumbnail'+currentTableList.number).css('border-bottom', '1.5px solid rgba(30, 100, 100, 0.8)')
      $('#PopUpWindow'+currentTableList.number).css('z-index', this.zIndexCount)
      $('#PopUpWindow'+currentTableList.number+' .features').css({'width':'12vw', 'right':'0%', 'top':'0%'})
      $('#PopUpWindow'+currentTableList.number+' .features').children().css({'width':'1.5vw', 'height':'1.5vw', 'margin':'0.8vw 0.75vw'})
      this.$nextTick(()=>{
        TweenMax.to('#PopUpWindow'+currentTableList.number, 0.8, {
          left: 10+Math.random()*10 + '%',
          top: 10+Math.random()*10 + '%',
          width: 70 + '%',
          opacity: 1,
          ease: Power2.out,
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
    fullDetailWindow(currentTableList){
      TweenMax.to('#PopUpWindow'+currentTableList.number, 0.3, {
        width: 100 + '%',
        height: 100 + '%',
        left: 0, 
        top: 0 
      })
      $('#PopUpWindow'+currentTableList.number+' .features').css({'width':'17vw', 'right':'0.4%', 'top':'1%'})
      $('#PopUpWindow'+currentTableList.number+' .features').children().css({'width':'2vw', 'height':'2vw', 'margin':'0.8vw 1.15vw'})
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
    flex-wrap: wrap
    flex-direction: column
    justify-content: start
    align-items: start
    top: 20%
    left: 20%
    width: 60%
    height: 45%
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
        top: 20%
        transform: translateX(-50%)
      .login_button
        display: block
        position: absolute
        width: 20vw
        left: 50%
        top: 65%
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
      margin-top: 4vw
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
      bottom: -11%
      width: 100%
    .thumbnailList
      display: flex
      justify-content: start
      align-items: start
      position: absolute
      width: 65%
      height: 5vh
      left: 10vw
      bottom: -9%
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
        bottom: 0%
        left: 0
      .turnOffButton
        width: 3vw
        left: 3vw
        bottom: 5%
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
      bottom: -8%
      width: 4vw
      height: 1.5vw
      left: 1.5vw
      &:hover
        background-color: #333
        cursor: url(~@/assets/pointer.png), pointer
</style>