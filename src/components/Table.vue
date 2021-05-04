<template lang="pug">
  #table
    .menu(v-show="isMenuOpen")
      img(src="../assets/entry/inside_Screen/menu_show.png")
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
      img.warningSign(src="../assets/entry/inside_Screen/warning.png" v-show="currentTableList.isWarning")
      img.errorSign(src="../assets/entry/inside_Screen/error.png" v-show="currentTableList.isError")
      .checkArea(v-show="currentTableList.isNeedCheck")
        .checkButton.checkYes(@click="checkYesOrNo(currentTableList, true); playAudio(sound.click)")
          img(src="../assets/entry/inside_Screen/checkButton.png")
          .text 是(Y)
        .checkButton.checkNo(@click="checkYesOrNo(currentTableList, false); playAudio(sound.click)")
          img(src="../assets/entry/inside_Screen/checkButton.png")
          .text 否(N)
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
          detail: '<h4><b>理念誕生</b></h4><br>在數位科技高速發展的時代，數位科技的協助讓我們的生活更便捷，卻也帶給我們過多的刺激和娛樂。在數位產品的影響下，使得我們的日常漸漸失控，衍生出各式各樣的社會問題。我們也因為便捷的數位產品漸漸失去人生控制權。時間在走，社會在變，我們的生活不可能回到過往，因此學會在數位與現實的平衡，是當今人類必學的一門學問。',
          show: false,
          isFullWindow: false,
        },
        {
          number: '2',
          name: '檔案總管',
          img: require('@/assets/entry/inside_Screen/folder.png'),
          window: require('@/assets/entry/inside_Screen/window_question.png'),
          thumbnail: require('@/assets/entry/inside_Screen/folder.png'),
          detail: '這裡是檔案總管，你確定你要擅闖這個禁區嗎？',
          show: false,
          isFullWindow: false,
          isNeedCheck: true,
        },
        {
          number: '3',
          name: '資源回收桶',
          img: require('@/assets/entry/inside_Screen/RecycleBin.png'),
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/RecycleBin.png'),
          detail: '好棒哦！這裡什麼都沒有耶~~',
          show: false,
          isFullWindow: false,
        },
        {
          number: '4',
          name: '身心健康',
          img: require('@/assets/entry/inside_Screen/health.png'),
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/health.png'),
          detail: '<h4><b>繼續沉迷的風險是…?</b></h4><br>使用數位產品本身不是壞事，善加利用反而能透過數位產品獲得更多學習資源。但是，倘若出現以下三種情況可能要小心有成癮的可能：<br><br>一、不受控制：<br>無意識強迫自己使用無意識的去使用數位產品，或使用的時間比自己預期的多出很多，簡單地說就是「停不下來」的情況，就應該注意自己的行為了。<br><br>二、心理不滿足：<br>糟糕的使用習慣會漸漸地造成自己的健康負擔。因為隨著數位成癮的程度越高，就必需要更多的使用時間，才能達到一樣的爽快的效果。<br><br>三、戒斷症狀：<br>當被強硬規定不許使用網路時，身體會出現一些劇烈的反應。例如：煩躁、容易發怒、注意力不集中、四肢無力、憂鬱、焦慮等，這些生理和心理反應，被稱之為戒斷症狀。',
          show: false,
          isFullWindow: false,
        },
        {
          number: '5',
          name: '生活失能',
          img: require('@/assets/entry/inside_Screen/disability.png'),
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/disability.png'),
          detail: '<h4><b>成癮之後可能出現的問題…?</b></h4><br>對於數位成癮較嚴謹的判斷標準是「失控造成的生活失能」，而非「花太多時間在使用數位產品」。意旨，個人因對於使用數位產品不可自拔(失控)，使其日常活動優先順序產生變化，比如：漠視周圍的人事物，開始無法正常交際，以及個人的時間管理出了問題，無形中開始造成日常生活的困擾，且在明知有負面影響的情況下，仍無法控制該失控行為。',
          show: false,
          isFullWindow: false,
        },
        {
          number: '6',
          name: '社交障礙',
          img: require('@/assets/entry/inside_Screen/society.png'),
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/society.png'),
          detail: '<h4><b>社交邊緣化的危機……？</b></h4><br>過度沉溺在數位產品的世界裡，而導致漠視周圍人事物，漸漸淡忘人與人之間的相處技巧，久而久之對於任何社交或公開場合感到強烈恐懼或憂慮的情況。漸漸成為孤立無援的社會邊緣人，將自己暴露在高風險的情況下。',
          show: false,
          isFullWindow: false,
        },
        {
          number: '9',
          name: '改善方法',
          img: require('@/assets/entry/inside_Screen/improve.png'),
          window: require('@/assets/entry/inside_Screen/window_simple.png'),
          thumbnail: require('@/assets/entry/inside_Screen/improve.png'),
          detail: '<h4><b>想要改變好困難，人生好絕望？</b></h4><br><b>那麼你可以試試看以下幾種方法：</b><br><br>一、番茄工作法：<img src="' + require('@/assets/entry/inside_Screen/tomatoTime.png') + '" style="height: 15%"></img><br>番茄工作法的五步驟：<br>Step01、決定待完成的任務<br>Step02、設定番茄工作法定時器至 n 分鐘（通常為25分鐘）。<br>Step03、持續工作直至定時器提示,記下一個番茄。<br>Step04、短暫休息3-5分鐘。<br>Step05、每四個番茄，休息15-30分鐘。<br><br>你可以嘗試把自己的目標以天為單位的計畫，並套用番茄工作法將一天使用數位產品的時間切割，依據個人規劃需求，每隔一段時間更新任務，以維持不脫序的使用習慣。<br><br>二、數位健康：<img src="' + require('@/assets/entry/inside_Screen/digitalHealth.png') + '" style="height: 15%"></img><br>數位健康是已上市的APP，能查看每日3C產品的使用習慣，並量化自己的使用習慣，有助於追蹤個人習慣，是整理和分析個人使用習慣的好幫手。<br><br>三、門診服務：<img src="' + require('@/assets/entry/inside_Screen/hospital.png') + '" style="height: 15%"></img><br>孤立無援毫無頭緒時，可以嘗試尋求門診服務。當你走進大醫院不確定該卦甚麼科時，可以先去家醫科掛號，問診後將會協助你前往適合的門診。當醫生提供專業建議後，會更清楚自己能如何做出改善。<br><br>四、親友的陪伴：<img src="' + require('@/assets/entry/inside_Screen/accompany.png') + '" style="height: 15%"></img><br>嘗試與家人和朋友聊聊你的難處或是邀請親友監督你執行計畫、相約完成目標，而他們的陪伴與支持將會成為你努力改變的一大動力。',
          show: false,
          isFullWindow: false,
        },
      ],
      warnMessage: {
          number: '7',
          name: '警告',
          img: require('@/assets/entry/inside_Screen/warning.png'),
          window: require('@/assets/entry/inside_Screen/window_question.png'),
          thumbnail: require('@/assets/entry/inside_Screen/warning.png'),
          detail: '我從內碼看到你不是這台電腦的主人，你再不後退，我就要叫了哦！你確定不後退嗎？',
          show: false,
          isFullWindow: false,
          isNeedCheck: true,
          isWarning: true
        },
      errorMessage: {
          number: '8',
          name: '錯誤',
          img: require('@/assets/entry/inside_Screen/error.png'),
          window: require('@/assets/entry/inside_Screen/window_question.png'),
          thumbnail: require('@/assets/entry/inside_Screen/error.png'),
          detail: '這是我最後給你的機會，你真的不考慮先看其他的東西嗎？',
          show: false,
          isFullWindow: false,
          isNeedCheck: true,
          isError: true
        },
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
      isMenuOpen: false,
      zIndexCount: 1,
      warnCount: 1,

      // 藍屏設定
      blueScreen: {
        isBlueScreen: false,
        canShowBlueScreen: true,
        blueScreenShowTime: 300, // 設定藍屏啟動時間
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
    checkYesOrNo(currentTableList, value){
      if(currentTableList.number == 8)
        this.warnCount ++
      if(value && currentTableList.number == 8 && this.warnCount>1){
        this.popUpBlueScreen()
      }
      else if(value && this.warnMessage.show){
        this.showDetail(this.errorMessage)
        this.zoomInDetail(this.errorMessage)
      }
      else if(value){
        this.showDetail(this.warnMessage)
        this.zoomInDetail(this.warnMessage)
      }
      else{
        this.currentTableLists.filter((item)=>{
          if (item === currentTableList)
            this.closeDetail(item)
        })
      }
    },
    altMessagePosition(currentTableList){
      console.log('I am work.')
      this.$nextTick(()=>{
        $('#PopUpWindow'+currentTableList.number+' .message').css({'width': '60%','left': '30%', 'top': '35%'})
      })
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
          top: 95 + '%',
          width: 5 + '%',
          height: 3 + '%',
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
      
      if(currentTableList.isWarning)
        this.altMessagePosition(currentTableList)
      if(currentTableList.isError)
        this.altMessagePosition(currentTableList)

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
      $('#PopUpWindow'+currentTableList.number+' .windowBackground').css({'height':'100%'})
      $('#PopUpWindow'+currentTableList.number+' .title').css({'font-size':'24px'})
      $('#PopUpWindow'+currentTableList.number+' .message').css({'top':'28%', 'height':'52%','font-size':'24px'})
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
          height: 80 + '%',
          opacity: 1,
          ease: Power2.out,
        })
      })
      $('#PopUpWindow'+currentTableList.number+' .windowBackground').css({'height':'100%'})
      $('#PopUpWindow'+currentTableList.number+' .title').css({'top':'2%', 'font-size':'18px'})
      $('#PopUpWindow'+currentTableList.number+' .message').css({'top':'25%', 'height':'54%','font-size':'18px'})
      $('#PopUpWindow'+currentTableList.number+' .message h4').css({'font-size':'24px'})
      $('#PopUpWindow'+currentTableList.number+' .features').css({'width':'12vw', 'right':'0%', 'top':'0%'})
      $('#PopUpWindow'+currentTableList.number+' .features').children().css({'width':'1.5vw', 'height':'1.5vw', 'margin':'0.8vw 0.75vw'})

    },
    closeDetail(tableList){
      this.currentTableLists = this.currentTableLists.filter(function (item) {
        return item != tableList
      })
      tableList.isFullWindow = false
      tableList.show = false
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
    switchMenu(){
      this.isMenuOpen = !this.isMenuOpen
    },
    turnOffScreen(){
      $('#table').hide()
      this.hideLogin()
      this.isMenuOpen = false
    },
    turnOnScreen(){
      $('#table').show()
      this.showLogin()
      this.hideTable()
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
      this.hideTable()
      this.hideLogin()
      this.currentTableLists = []
      this.blueScreen.isBlueScreen = false
      this.blueScreen.canShowBlueScreen = false
      this.warnMessage.show = false
      this.isPanelOpen = false
      this.isMenuOpen = false
      this.zIndexCount = 1
      this.warnCount = 1
    },
    blueScreenTimeCount(){
      setTimeout(() => {
        if(this.blueScreen.canShowBlueScreen){
          this.popUpBlueScreen()
        }
      }, this.blueScreen.blueScreenShowTime*1000);
    },
    popUpBlueScreen(){
      this.blueScreen.isBlueScreen = true
      this.playAudio(this.sound.windowShutdown)
      setTimeout(() => {
        this.shuDownScreen()
      }, this.blueScreen.blueScreenWaitTime*1000);
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
    .menu
      position: absolute
      width: 100%
      height: 100%
      z-index: 10
      img
        width: 80%
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
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
      .windowBackground
        position: relative
        width: 100%
        height: 100%
      .title
        position: absolute
        left: 3%
        top: 3%
        font-size: $font-size
        color: white
        text-shadow: 1px 1px 5px black
      .message
        opacity: 0
        position: absolute
        width: 80%
        height: 54%
        left: 10%
        top: 25%
        font-size: $font-size
        text-align: left
        color: #222
        overflow-y: scroll
      .warningSign
        position: absolute
        left: 10%
        top: 25%
        width: 15%
      .errorSign
        position: absolute
        left: 10%
        top: 25%
        width: 15%
      .checkArea
        position: absolute
        width: 80%
        height: 20%
        bottom: 18%
        left: 50%
        transform: translate(-50%)
        .checkButton
          display: flex
          justify-content: center
          align-items: center
          position: absolute
          opacity: 0.7
          width: 30%
          height: 100%
          &:hover
            cursor: url(~@/assets/pointer.png), pointer
            opacity: 1
          img
            width: 100%
          .text
            font-weight: bold
            z-index: 1000
        .checkYes
          left: 10%
        .checkNo
          right: 10%
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