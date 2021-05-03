<template lang="pug">
  #table
    .login
      img.user_sticker(src="../assets/entry/inside_Screen/user_sticker.png")
      img.login_button(src="../assets/entry/inside_Screen/login_button.png" @click="showTable(); hideLogin(); playAudio(sound.window7Boot)")
    .cover(v-for="tableList in tableLists")
      img.icon(:src="tableList.img" @dblclick="showDetail(tableList); zoomInDetail(tableList); playAudio(sound.doubleClick)")
      .name {{ tableList.name }}
    .pop_up_window(:id="'PopUpWindow'+currentTableList.number" v-for="currentTableList in currentTableLists")
      img.windowBackground(:src="currentTableList.window" draggable="true" ondragstart="event.dataTransfer.setData('text/plain', 'This text may be dragged')")
      .features
        img.i(src="../assets/entry/inside_Screen/i.svg" @click="zoomOutDetail(currentTableList); playAudio(sound.click)")
        img.o(src="../assets/entry/inside_Screen/o.svg" @click="currentTableList.isFullWindow ? unFullDetailWindow(currentTableList) : fullDetailWindow(currentTableList); playAudio(sound.click)")
        img.x(src="../assets/entry/inside_Screen/x.svg" @click="closeDetail(currentTableList); playAudio(sound.click)")
      .title(v-html="currentTableList.name")
      .message(v-html="currentTableList.detail")
    img.toolbox(src="../assets/entry/inside_Screen/toolbox.png")
    .thumbnailList(v-show="isThumbnail")
      .openedThumbnail(:id="'thumbnail'+currentTableList.number" v-for="(currentTableList, key) in currentTableLists")
        img(:src="currentTableList.thumbnail" @click="showDetail(currentTableList); currentTableList.show ? zoomOutDetail(currentTableList) : zoomInDetail(currentTableList); playAudio(sound.click)")
    .startFunction(v-show="isPanelOpen")
      img.start_panel(src="../assets/entry/inside_Screen/start_panel.png")
      img.turnOffButton.reStart(src="../assets/entry/inside_Screen/reStart.png" @click="reStartScreen(); playAudio(sound.click)")
      img.turnOffButton.shutDown(src="../assets/entry/inside_Screen/shutDown.png" @click="shuDownScreen(); playAudio(sound.click)")
    .start_button(@click="isPanelOpen=!isPanelOpen; playAudio(sound.click)")
    img.blueScreen(src="../assets/entry/inside_Screen/blueScreen.png" v-show="blueScreen.isBlueScreen")
      
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
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/PC.png'),
          detail: '網路和科技是這時代的趨勢，無痛戒斷的目的是為了<b>『取得生活和科技之間的平衡』</b>，而不是拒絕數位科技，所以當發現生活出了問題時，就需要養成一個新的習慣回歸舒適的生活模式。',
          show: false,
          isFullWindow: false
        },
        {
          number: '2',
          name: '檔案總管',
          img: require('@/assets/entry/inside_Screen/folder.png'),
          window: require('@/assets/entry/inside_Screen/window_question.png'),
          thumbnail: require('@/assets/entry/inside_Screen/folder.png'),
          detail: '這是總管',
          show: false,
          isFullWindow: false
        },
        {
          number: '3',
          name: '資源回收桶',
          img: require('@/assets/entry/inside_Screen/RecycleBin.png'),
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/RecycleBin.png'),
          detail: '這是回收桶',
          show: false,
          isFullWindow: false
        },
        {
          number: '4',
          name: '身心健康',
          img: require('@/assets/entry/inside_Screen/health.png'),
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/health.png'),
          detail: '<h4><b>繼續沉迷的風險是…?</b></h4><br>使用網路本身並非壞事，善加利用反而能透過網路獲得更多學習資源。倘若出現以下三種情況可能要小心有成癮的可能:<br><br>1.無意識強迫自己使用無意識的去使用網路，或使用的時間比自己預期的多出很多，簡單地說就是「停不下來」。<br><br>2.心理不滿足隨著成癮的程度越高，你會需要更多的網路使用時間，才能達到一樣的爽快的效果。<br><br>3.戒斷症狀當別人強迫你不能使用網路時，身體會出現一些劇烈的生理反應，比方說煩躁、容易發怒、注意力不集中、四肢無力、憂鬱、焦慮等等，這些生／心理反應我們就稱之為戒斷症狀。',
          show: false,
          isFullWindow: false
        },
        {
          number: '5',
          name: '生活失能',
          img: require('@/assets/entry/inside_Screen/disability.png'),
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/disability.png'),
          detail: '<h4><b>成癮之後可能出現的問題…?</b></h4><br>長久看著螢幕容易使眼睛近視，而成癮的人有很大的機率因此生活步調混亂，常態性的沒睡好、沒吃好，最終營養不良導致身體出現病痛，久而久之影響心理狀態變得憂鬱，甚至抗拒出門與人接觸，長久下來形成惡性循環，急需改變。',
          show: false,
          isFullWindow: false
        },
        {
          number: '6',
          name: '社交障礙',
          img: require('@/assets/entry/inside_Screen/society.png'),
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/society.png'),
          detail: '社交障礙',
          show: false,
          isFullWindow: false
        },
      ],
      sound: {
        click: require('@/assets/sound/click.mp3'),
        doubleClick: require('@/assets/sound/double_clicks.mp3'),
        windowOriginBoot: require('@/assets/sound/windowsOrigin_boot.wav'),
        windowXPBoot: require('@/assets/sound/windowsXP_boot.wav'),
        window7Boot: require('@/assets/sound/windows7_boot.wav'),
        windowShutdown: require('@/assets/sound/windows_shutdown.mp3')
      },
      currentTableLists: [],
      isThumbnail: true,
      tableZoomIn: 150,
      screenOpacityAlt: 0.2,
      isPanelOpen: false,
      zIndexCount: 1,

      // 藍屏設定
      blueScreen: {
        isBlueScreen: false,
        canShowBlueScreen: true,
        blueScreenShowTime: 60, // 設定藍屏啟動時間
        blueScreenWaitTime: 8 // 藍屏持續時間 
      }
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
      this.blueScreenTimeCount()
      this.blueScreen.canShowBlueScreen = true
      setTimeout(() => {
        $('.cover').show()
        $('.thumbnailList').css('display', 'flex')
      }, 800);
      $('.toolbox').show()
      $('.start_button').show()
      this.$emit('windowZoomIn', this.tableZoomIn)
    },
    hideTable(){
      $('.cover').hide()
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
    playAudio(sound){
      const audio = document.createElement('audio')
      audio.src = sound
      audio.play()
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
        setTimeout(() => {
          $('#PopUpWindow'+currentTableList.number).hide()
        }, 800);
      })
    },
    zoomInDetail(currentTableList){
      currentTableList.show = true
      this.zIndexCount += 1
      $('#thumbnail'+currentTableList.number).css('border-bottom', '1.5px solid rgba(30, 100, 100, 0.8)')
      $('#PopUpWindow'+currentTableList.number).show().css('z-index', this.zIndexCount)
      
      let _this = this
      if(currentTableList.isFullWindow)
        _this.currentTableLists.filter(function (item) {
          if(item == currentTableList)
            _this.fullDetailWindow(item)
        })
      else
        _this.currentTableLists.filter(function (item) {
          if(item == currentTableList)
            _this.unFullDetailWindow(item)
        })

      setTimeout(() => {
        TweenMax.to('#PopUpWindow'+currentTableList.number+' .message', 0.2, {
          'opacity': 1
        })
        TweenMax.to('#PopUpWindow'+currentTableList.number+' .features', 0.2, {
          'opacity': 1
        })
      }, 300);
    },
    fullDetailWindow(currentTableList){
      currentTableList.isFullWindow = true
      TweenMax.to('#PopUpWindow'+currentTableList.number, 0.3, {
        width: 100 + '%',
        height: 100 + '%',
        left: 0, 
        top: 0,
        opacity: 1,
      })
      $('#PopUpWindow'+currentTableList.number+' .title').css({'font-size':'24px'})
      $('#PopUpWindow'+currentTableList.number+' .message').css({'top':'28%', 'height':'60%','font-size':'24px'})
      $('#PopUpWindow'+currentTableList.number+' .message h4').css({'font-size':'42px'})
      $('#PopUpWindow'+currentTableList.number+' .features').css({'width':'17vw', 'right':'0.4%', 'top':'1%'})
      $('#PopUpWindow'+currentTableList.number+' .features').children().css({'width':'2vw', 'height':'2vw', 'margin':'0.8vw 1.15vw'})
    },
    unFullDetailWindow(currentTableList){
      currentTableList.isFullWindow = false
      this.$nextTick(()=>{
        TweenMax.to('#PopUpWindow'+currentTableList.number, 0.3, {
          left: 10+Math.random()*10 + '%',
          top: 10+Math.random()*10 + '%',
          width: 70 + '%',
          opacity: 1,
          ease: Power2.out,
        })
      })
      $('#PopUpWindow'+currentTableList.number+' .message').css({'top':'13vh', 'height':'42%','font-size':'18px'})
      $('#PopUpWindow'+currentTableList.number+' .message h4').css({'font-size':'24px'})
      $('#PopUpWindow'+currentTableList.number+' .features').css({'width':'12vw', 'right':'0%', 'top':'0%'})
      $('#PopUpWindow'+currentTableList.number+' .features').children().css({'width':'1.5vw', 'height':'1.5vw', 'margin':'0.8vw 0.75vw'})

    },
    closeDetail(tableList){
      this.currentTableLists = this.currentTableLists.filter(function (item) {
        return item != tableList
      })
      tableList.isFullWindow = false
    },
    screenOpacityUp(){
      TweenMax.to('#table', 0.5, {
        opacity: '+=' + this.screenOpacityAlt
      })
    },
    screenOpacityDown(){
      let table = document.getElementById('table')
      let nowTableOpacity = window.getComputedStyle(table, null)['opacity']
      if (nowTableOpacity > 0.5) 
      {
        TweenMax.to('#table', 0.5, {
          opacity: '-=' + this.screenOpacityAlt
        })
      }
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
      this.isPanelOpen = false
      this.hideTable()
      this.showLogin()
      this.currentTableLists = []
      this.blueScreen.isBlueScreen = false
      this.blueScreen.canShowBlueScreen =false
    },
    shuDownScreen(){
      this.$emit('shuDownScreen')
      this.isPanelOpen = false
      this.hideTable()
      this.hideLogin()
      this.currentTableLists = []
      this.blueScreen.isBlueScreen = false
      this.blueScreen.canShowBlueScreen = false
    },
    blueScreenTimeCount(){
      setTimeout(() => {
        if(this.blueScreen.canShowBlueScreen){
          this.blueScreen.isBlueScreen = true
          this.playAudio(this.sound.windowShutdown)
          setTimeout(() => {
            this.shuDownScreen()
          }, this.blueScreen.blueScreenWaitTime*1000);
        }
      }, this.blueScreen.blueScreenShowTime*1000);
    }
  }
}
</script>

<style lang="sass">
  $font-size: 18px
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
        top: 15%
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
      display: none
      justify-content: center
      align-items: center
      left: 4vw
      width: 12%
      margin-top: 5%
      // cursor: url(~@/assets/pointer.png), pointer
      &:hover
        background-color: rgba(white, 0.3)
      .icon
        position: relative
        height: 80%
      .name
        position: relative
        font-size: 14px
        text-shadow: 1px 1px 5px black
        color: white
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
      .title
        position: absolute
        width: 20%
        left: 3%
        top: 3%
        font-size: $font-size
        // font-weight: bold
        color: white
        text-shadow: 1px 1px 5px black
      .message
        opacity: 0
        position: absolute
        width: 80%
        height: 53%
        left: 10%
        top: 25%
        font-size: $font-size
        text-align: left
        color: #222
        overflow-y: scroll
      ::-webkit-scrollbar
        width: 15px
      ::-webkit-scrollbar-thumb
        background-color: rgba(0, 0, 0, 0.5)
        // border-radius: 10px
    .toolbox
      display: none
      position: absolute
      bottom: -11%
      width: 100%
      z-index: 1000
    .thumbnailList
      display: flex
      justify-content: start
      align-items: start
      position: absolute
      width: 65%
      height: 5vh
      left: 10vw
      bottom: -9%
      z-index: 1001
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
      z-index: 1001
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
      z-index: 1001
      &:hover
        background-color: #333
        cursor: url(~@/assets/pointer.png), pointer
    .blueScreen
      width: 100%
      height: 111%
      z-index: 1002
</style>