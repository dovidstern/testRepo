// jQuery`s document ready function
$(function(){

  // Global variables
  window.win = $(window);
  window.mobile = false;
  window.dropdownSpeed = 300;
  window.psbar = $('.ps-custom-scrollbar');

  var statusContainer = $('#mamis-status');
  var statusDropdown = $('#mamis-status-options-wrapper');
  var statusDropdownOptions = statusDropdown.find('li');
  var statusBtn = statusContainer.find('a');
  var statusInnerLink = $('.mamis-status-link');
  var statusMainLink = $('#mamis-status-main');
  var statusMainLinkTxt = $('#mamis-status-main-txt');
  var mainAvatarAnimation4 = $('#anim-4');
  var mainAvatarAnimation5 = $('#anim-5');

  var avatarMenuWrapper = $('#main-nav-menu');
  var mainAvatarArrow = $('#main-avatar-dropdown-arrows');
  var mainAvatarDropdown = $('#main-avatar-dropdown-menu');
  var mainAvatarAnimation1 = $('#anim-1');
  var mainAvatarAnimation2 = $('#anim-2');
  var mainAvatarAnimation3 = $('#anim-3');
  var mainAvatarContainer = $('#main-avatar');
  var avatarSpeed = 200;

  var headerSearchDropdownWrapper = $('#header-search-dropdown-wrapper');
  var headerSearchCat = $('#header-search-cat');
  var headerSearchMenuHeight = headerSearchDropdownWrapper.outerHeight();
  headerSearchDropdownWrapper.height(0).show();
  var headerMainMenuHeight = $('#lp-dd-menu-wrapper').outerHeight();
  var headerInfoWrapperHeight = $('#info-wrapper').outerHeight();
  var headerMainMenuWidth = $('#lp-dd-menu-wrapper').outerWidth();
  var headerInfoWrapperWidth = $('#info-wrapper').outerWidth();
  var infoWrapperList = $('#saiw-inner');

  win.resize(function() {
    browserResize();
    setUserDropdownHeight();
  });

  browserResize();
  setUserDropdownHeight();
  alignGrid();

  $('body').on('click', function(event) {
    hideCardQuickMenu();
    if ( avatarMenuWrapper.hasClass('open') ) { hideUserDropdown(); }
    hideMenu();
    hideSearchDropdownMenu();
    $('.msg-filter-dropdown').closest('li').removeClass('open');
    $(".doc-content-header").removeClass("open");
    $(".dropdown-wrapper").removeClass("open");    
  });  

// ============================= Main header menu actions =============================

  // When is clicked inside the user dropdown menu what to do ...
  mainAvatarDropdown.on('click', function(event) {
    event.stopPropagation();
    hideStatusDropdown();
    return false;
  });

  statusDropdown.on('click', function(event) {
    event.stopPropagation();
    return false;
  });

  $('#anim-2').css('top', -($('#anim-2').outerHeight()) + 'px');
  $('#anim-3').css('left', -($('#anim-3').outerWidth()) + 'px');

  // When is clicked on user`s image show or hide the dropdown menu
  mainAvatarContainer.on('click', function(event) {
    event.stopPropagation();
    setUserDropdownHeight();
    
    if (avatarMenuWrapper.hasClass('open')) {

      hideUserDropdown();
    }
    else {

      avatarMenuWrapper.addClass('open');

      if ( (!mainAvatarAnimation3.hasClass('velocity-animating')) && (!mainAvatarAnimation2.hasClass('velocity-animating')) && (!mainAvatarAnimation3.hasClass('velocity-animating')) ) {        

        mainAvatarArrow.velocity({
          right: -30,
          rotateZ: "180deg"
        }, {duration: avatarSpeed});

        mainAvatarAnimation1.velocity({
          width: 170,
          height: 170,
          top: -50,
          right: -20,
          rotateZ: "-180deg"
        }, { duration: avatarSpeed })
          
        setTimeout(function(){
          avatarMenuWrapper.css('borderBottomColor', '#008fb2');
          mainAvatarAnimation2.velocity({top: '0px'}, { duration: avatarSpeed });
        }, 150);

        setTimeout(function(){
           mainAvatarAnimation3.velocity({left: '0px'}, { duration: avatarSpeed });
        }, 250);
      }
    }
    return false;
  });

  // Show custom dropdown when user status btn is clicked
  statusBtn.on('click', function(event) {
    event.stopPropagation();
    if (!statusContainer.hasClass('active')) {

      statusContainer.addClass('active');
      statusDropdown.show();

      if ( (!mainAvatarAnimation4.hasClass('velocity-animating')) && (!statusDropdownOptions.hasClass('velocity-animating')) && (!statusMainLink.hasClass('velocity-animating')) && (!mainAvatarAnimation5.hasClass('velocity-animating')) ) {

        mainAvatarAnimation4.velocity({
          width: 200,
          height: 200,
          top: -30,
          left: -30,
          rotateZ: "180deg"
        }, {duration: 300});

        setTimeout(function(){
          statusDropdownOptions.velocity({ opacity: 1 }, {duration: 150});
          statusMainLink.velocity({ width: "100%" }, {duration: 150});
          mainAvatarAnimation5.velocity({ rotateZ: "180deg" }, {duration: 150});
        },150);
      }
    }
    return false;
  });


  // 3-rd sidebar

  var setMarked = $('.add-mark');

  setMarked.on('click', function(event) {
    event.preventDefault();
    if ($(this).closest('li').hasClass('marked')) {
      $('.lp-invite-users').find('li').removeClass('marked');
      $(this).closest('li').removeClass('marked').removeClass('checked').find('.msg-list-checkbox').prop('checked', false);
    }

    else {
      $('.lp-invite-users').find('li').removeClass('marked').removeClass('checked');
      $('.lp-invite-users').find('.msg-list-checkbox').prop('checked', false);
      $(this).closest('li').addClass('marked').addClass('checked').find('.msg-list-checkbox').prop('checked', true); 
    }
    sidebarMarked();
  });

  function sidebarMarked() {
    var listSum = $('.lp-invite-users').find('li');
    var checkedList = [];

    listSum.each(function(index, el) {

      if(($(this).hasClass('marked'))||($(this).hasClass('checked'))){
        checkedList.push(true);
      }
      else {
        checkedList.push(false); 
      }

      if (index != 0) {
        if (!checkedList[index-1]) {
          $(this).addClass('top-border');
        }   
        else {
          $(this).removeClass('top-border');
        }
      }
    });

    if ($('.lp-invite-users').find('.checked').length > 1) {
      var btnText = $('#secondary-header-wrapper').find('.count').attr('data-multiple-text');
    }
    else {
       var btnText = $('#secondary-header-wrapper').find('.count').attr('data-single-text');
    }

     $('#secondary-header-wrapper').find('.count').find('.btn-text').text(btnText);
  }

  // End 3-rd sidebar

  // Change the state of user status dropdown menu
  statusInnerLink.on('click', function(event) {

    var statusText = $(this).text();
    var statusClass = $(this).closest('li').attr('class');
    var mainText = statusMainLinkTxt.text();
    var mainClass = statusContainer.attr('class');

    statusContainer.attr('class','active').addClass(statusClass);
    statusMainLinkTxt.text(statusText);
    $(this).find('.mamis-status-link-txt').text(mainText);
    $(this).closest('li').attr('class','').addClass(mainClass);

    hideStatusDropdown();

    return false;
  });

  headerSearchCat.on('click', function(){
    if (!headerSearchDropdownWrapper.hasClass('velocity-animating')) {

      if (headerSearchCat.hasClass('active')) {
        headerSearchCat.velocity({width:187});
        $.Velocity.animate(headerSearchDropdownWrapper, {height: 0, width: 187})
        .then(function() { 
          headerSearchCat.removeClass('active');
        });
      }
      else {
        headerSearchCat.addClass('active');
        headerSearchCat.velocity({width:220});
        headerSearchDropdownWrapper.velocity('stop').velocity({
          height:headerSearchMenuHeight,
          width: 220
        });
      }
    }
    return false;
  });

  $('#header-search-dropdown').on('click', function(event){
    event.stopPropagation();
  });

  $('#header-search-dropdown').on('click', 'a',function(event){
    event.stopPropagation();

    $('#header-search-cat').find('span').text($(this).find('span').text());
    $('#header-search-dropdown').find('li').removeClass('active');
    $(this).closest('li').addClass('active');
    hideSearchDropdownMenu();
    $.Velocity.animate(headerSearchDropdownWrapper, {height: 0});
  });
// ============================= End Main header menu actions =============================

// Global events
  if (psbar.length) {
    psbar.each(function(){
      $(this).perfectScrollbar();
    });
  }

  // Custom placeholder
  $('input, textarea').placeholder();

  // Check whether to put border on input or not
  $('input').focus(function(){
    if (!$(this).hasClass('no-focus') && !$(this).hasClass('error')) {
      if ( $(this).attr('id') == 'rm-receivers' ) {
        $(this).closest('ul').addClass('input-focus');
      } else {
        $(this).addClass('input-focus');
      }
    }
  }).blur(function(){
    if ( $(this).attr('id') == 'rm-receivers' ) {
      $(this).closest('ul').removeClass('input-focus');
    } else {
      $(this).removeClass('input-focus');
    }
  });

  // Custom select menu
  if ($('select').length) { $('select').selectmenu(); }

  // Add CKEditor to textarea
  if ($('.textarea-editor').length) {
    $('.textarea-editor').each(function(){
      var thisEditor = $(this).attr('id');
      CKEDITOR.replace(thisEditor, {
        customConfig: 'customConfig.js'
      });
   });    
  }

  // Function when browser is resized
  function browserResize() {
    // Code that is executed on window resize
  }

  //Tootip Bootstrap
    $('[data-toggle="tooltip"]').tooltip({
      template: '<div class="tooltip tooltip-style"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    });
  //End Tootip Bootstrap

  // Datepicker
    $( '.datepicker' ).datepicker({
      dateFormat: 'dd/mm/yy',
      onClose: function() {
        $(this).closest('.datepicker-wrapper').removeClass('open');
      },
      beforeShow: function() {
        $(this).closest('.datepicker-wrapper').addClass('open');
      }
    });

    $('#ui-datepicker-div').addClass('shw-datepicker');
  // End Datepicker
// End global

// Cards
  $('.quick-menu-btn').closest('.quick-menu-wrapper').on('click', 'ul', function(e){
    e.stopPropagation();
  });

  $('.quick-menu-btn').on('click', function(){

    var clickedEl = $(this);
    var closestEl = clickedEl.closest('.quick-menu-wrapper');

    if (!closestEl.find('.quick-menu-holder').hasClass('velocity-animating')) {

      if (!closestEl.hasClass('open')) {        

        // if ( $('.quick-menu-wrapper').hasClass('open') ) {
        //   hideCardQuickMenu();
        // }

        hideCardQuickMenu();

        closestEl.find('.nav-btn-x').addClass('open');
        closestEl.addClass('open');

        $.Velocity.animate( closestEl.find('.quick-menu-holder'), {
          width: closestEl.find('.quick-menu').outerWidth() + 2, // + 2px for box shadow
          height: closestEl.find('.quick-menu').outerHeight() + 2 // + 2px for box shadow
        }, {duration: 400})
          .then(function() {
            closestEl.find('.nav-btn-x').addClass('open');
            closestEl.addClass('open');
          });  
      }
      else {

        $.Velocity.animate( closestEl.find('.quick-menu-holder'), {
          width: 0,
          height: 0
        }, { duration: 400 })
          .then(function() {
            closestEl.removeClass('open');
            closestEl.find('.nav-btn-x').removeClass('open');
          });
      }
    }

    return false;
  });

  $(".card-holder").find('.short-3-line-description').dotdotdot({
    height: 60,
    watch: true
  });

  $(".card-holder").find('.shareme-type-txt1').dotdotdot({
    height: 25,
    watch: true,
  });

  $(".card-holder").find('.event-name').dotdotdot({
    height: 65,
    watch: true
  });

  $(".card-holder").find('.session-name').dotdotdot({
    height: 65,
    watch: true
  });

  if ( $('.card-wrapper').length ) {
    $('.card-wrapper').each(function() {
      elWrapper = $(this);
      if ( elWrapper.hasClass('disabled') ) {
        elWrapper.find('.cap-btns-list').find('li').removeClass('active');
      }
    });
  }
// End Cards

// Dot dot dot
  $(".page-preview").dotdotdot({
    height: 165,
    watch: true,
    after: 'a.card-rIcon-btn',
    callback: dotdotdotCallback
  });

  $(".link-preview").dotdotdot({
    height: 70,
    watch: true,
    after: 'a.show-more-txt',
    callback: dotdotdotCallback
  });

  function dotdotdotCallback(isTruncated, originalContent) {
    if (!isTruncated) {
     $(".card-rIcon-btn", this).remove();   
    }
  }
// End dot dot dot

//===================== Dropdown filter =====================

  setWidthColumn();

  $('.dropdown-btn-wrapper').on('click', function(e){
    e.stopPropagation();
    var elWrapper = $('.dropdown-btn-wrapper').closest('li');

    if (!$(this).closest('li').hasClass('open')) {
      elWrapper.removeClass('open');
      $(this).closest('li').addClass('open');
    }
    else {
      elWrapper.removeClass('open');
    }

    return false;
  });

  $('.dropdown-btn-wrapper').closest('li').on('click', 'ul', function(e){
    e.stopPropagation();
  });

  // Mark dropdown checkbox
  $('.dropdown-chkbox').change(function(){

    $(this).closest('li').toggleClass('selected');
    return false;
  });

  // Mark dropdown radio
  $('.dropdown-radio').change(function(){

    $('.dropdown-radio').closest('li').removeClass('selected');

    $(this).closest('li').addClass('selected');
    return false;
  });

  function setWidthColumn() {

    $('.dropdown-wrapper.checkbox').each(function() {
      var liItems = $(this).find('.dropdown-item-wrapper');
    
      for(var i = 0; i < liItems.length; i+=12) {
        liItems.slice(i, i+12).wrapAll("<div class='dropdown-column-wrapper pull-left'></div>");
      }

      var sum = 0;
      $(this).find('.dropdown-column-wrapper').each(function() {
        sum += $(this).outerWidth();
        $('.dropdown-wrapper.checkbox .dropdown-list-wrapper').outerWidth(sum + 4);
      });
    });
  }

  //Checkbox inside button can bi clicked
  $('.checkbox-inside-btn').on('click', function(event){
    event.stopPropagation();
  });
//===================== End Dropdown filter =====================  

// Hide show second sidebar
  var mainContentSidebar = $('#main-content-sidebar');
  var mainContentSidebarInner = $('#main-content-sidebar > div');
  var showHideSecondMenu = $("#hide-show-menu-btn");
  var showHideText = showHideSecondMenu.find('.btn-text');
  var showHideIcon = showHideSecondMenu.find('.flaticon');
  var innerSidebarWidth = mainContentSidebar.find('.menu').outerWidth();

  showHideSecondMenu.on('click', function() {
    if (mainContentSidebar.css('opacity') == 1) {
      mainContentSidebar.velocity({opacity:0});

      $('#sidebars-wrapper').removeClass('open');
      showHideIcon.removeClass('slide-out-right-1').addClass('slide-in-left-1');

      showHideText.text(showHideText.attr('data-show-text'));
      
      $.Velocity.animate(mainContentSidebarInner, {
        width: 0
      }, { duration: 400 }).then(function() {
        alignGrid();
      });
    }
    else {
      mainContentSidebar.velocity({opacity:1});

      $('#sidebars-wrapper').addClass('open');
      showHideIcon.removeClass('slide-in-left-1').addClass('slide-out-right-1');
      showHideText.text(showHideText.attr('data-hide-text'));

      $.Velocity.animate(mainContentSidebarInner, {
        width: innerSidebarWidth
      }, { duration: 400 }).then(function() {
        alignGrid();
      });
    }
  });
// End hide show second sidebar

// Sort switch action
  var sortSwitch = $('#sort-switch');

  sortSwitch.on('click', 'li', function(){
    if ($(this).hasClass('inc')) {
      if (!$(this).hasClass('active')) { 
        $(this).addClass('active');
        sortSwitch.find('.desc').removeClass('active');
        sortSwitch.find('.switch').removeClass('des').addClass('incr');
      }
    }
    else if ($(this).hasClass('desc')) {
      if (!$(this).hasClass('active')) { 
        $(this).addClass('active');
        sortSwitch.find('.inc').removeClass('active');
        sortSwitch.find('.switch').removeClass('incr').addClass('des');
      }    
    }
    else {
      if (sortSwitch.find('.inc').hasClass('active')) {
        sortSwitch.find('.inc').removeClass('active');
        sortSwitch.find('.desc').addClass('active');
        $(this).removeClass('incr').addClass('des');
      }
      else {
        sortSwitch.find('.desc').removeClass('active');
        sortSwitch.find('.inc').addClass('active');
        $(this).removeClass('des').addClass('incr');
      }
    }

    return false;
  });
// End sort swith action

// Upload files on drag & drop
  $('.drop-box').on(
      'dragover',
      function(e) {
          e.preventDefault();
          e.stopPropagation();
          $(this).addClass('drag-over');
      }
  );

  $('.drop-box').on(
      'dragenter',
      function(e) {
          e.preventDefault();
          e.stopPropagation();
          $(this).addClass('drag-over');
      }
  );

  $('.drop-box').on(
      'dragleave',
      function(e) {
          e.preventDefault();
          e.stopPropagation();
          $(this).removeClass('drag-over');
      }
  );

  $('.drop-box').on(
      'drop',
      function(e){
          if(e.originalEvent.dataTransfer){
              if(e.originalEvent.dataTransfer.files.length) {
                  e.preventDefault();
                  e.stopPropagation();
                  /*UPLOAD FILES HERE*/
                  $(this).removeClass('drag-over');
                  upload(e.originalEvent.dataTransfer.files);
              }   
          }
      }
  );

  // This function uploads dropped files
  function upload(files){
      alert('This function will upload '+files.length+' File(s).');
  }
// End upload files on drag & drop  

//switch between favourite message and not
  $('.favorite-icon').on('click', function(){
    var thisEl = $(this);
    if (thisEl.hasClass('on')) {
      thisEl.removeClass('on');
    }
    else {
      thisEl.addClass('on');
    }

    return false;
  });

// Card administrator buttons toggle
  $('.cap-btns-list').on('click', 'li', function(){
    var wrapperEl = $(this).closest('.card-wrapper');
    
    if ( (!wrapperEl.hasClass('disabled')) && (!wrapperEl.hasClass('non-admin')) ) {
      $(this).toggleClass('active');
    };
  });

  if (viewportSize.getWidth() >= 1200) {
    if ($('#main-content-sidebar').length) {
      $('#sidebars-wrapper').addClass('open');
    }
  }

  if ($('#sidebars-wrapper').hasClass('open')) {
    $('#hide-show-menu-btn').find('.btn-text').text($('#hide-show-menu-btn').find('.btn-text').attr('data-hide-text'));
    $('#hide-show-menu-btn').find('.flaticon').removeClass('slide-in-left-1').addClass('slide-out-right-1');
  }

  $(".link-preview").on('click','a',function() {

    if ($(this).hasClass('show-more-txt')) {
      var div = $(this).closest('.link-preview');
      div.trigger('destroy').find('a.show-more-txt').hide();
      div.css('max-height', 'none');
      $("a.show-less-txt", div).show();
    }
    else {
      $(this).hide();
      $(this).closest('.link-preview').css("max-height", "104px").dotdotdot({
        height: 70,
        watch: true,
        after: "a.show-more-txt", 
        callback: dotdotdotCallback 
      });
    }
  });

  infoWrapperList.on('click', function(event) {
    event.stopPropagation();
    
    if (infoWrapperList.hasClass('active')) {
      hideMenu();
    }

    else {
      showMenu();
    }

    return false;
  });

  $('#info-wrapper-list').on('click', 'ul', function(event) {
    event.stopPropagation();
  });  

// switch with one side text
  $('.switch-one-side-txt').on('click', 'li', function(){

    var clickedEl = $(this);

    if ( clickedEl.closest('.switch-one-side-txt').hasClass('card-switch') ) {

      if ( clickedEl.hasClass('state-on') || clickedEl.hasClass('on') ) {
        clickedEl.closest('.card-wrapper').addClass('disabled');
        clickedEl.closest('.card-wrapper').find('.cap-btns-list li').removeClass('active');
      } else {
        clickedEl.closest('.card-wrapper').removeClass('disabled');
      }
    }

    if (clickedEl.hasClass('state-on')) {
        clickedEl.removeClass('state-on').addClass('state-off');
        clickedEl.find('.switch-state-txt').text('off');
        clickedEl.closest('.switch-one-side-txt').find('.switch').removeClass('on').addClass('off');
        clickedEl.closest('.quick-menu-toggle').addClass('off');
    }
    else if (clickedEl.hasClass('state-off')) {
        clickedEl.removeClass('state-off').addClass('state-on');
        clickedEl.find('.switch-state-txt').text('on');
        clickedEl.closest('.switch-one-side-txt').find('.switch').removeClass('off').addClass('on');
        clickedEl.closest('.quick-menu-toggle').removeClass('off');
    }
    else {
      if (clickedEl.hasClass('on')) {
        clickedEl.closest('.switch-one-side-txt').find('.state-on').removeClass('state-on').addClass('state-off');
        clickedEl.closest('.switch-one-side-txt').find('.switch-state-txt').text('off');
        clickedEl.removeClass('on').addClass('off');
        clickedEl.closest('.quick-menu-toggle').addClass('off');
      }
      else {
        clickedEl.closest('.switch-one-side-txt').find('.state-off').removeClass('state-off').addClass('state-on');
        clickedEl.closest('.switch-one-side-txt').find('.switch-state-txt').text('on');
        clickedEl.removeClass('off').addClass('on');
        clickedEl.closest('.quick-menu-toggle').removeClass('off');
      }
    }

    return false;
  });

// Left menu - menu title click
  $('.menu-title').on('click', function(event) {
    if ($(this).hasClass('submenu')) {
      $(this).toggleClass('active');
    }

    /* Act on the event */
    return false;
  });

  $('.menu-title-submenu').on('click', function(event) {
    event.stopPropagation();
    /* Act on the event */
    return false;
  });
// End left menu - menu title click

// Inner left menu checkbox click
  $('.lp-invite-users').on('change', '.msg-list-checkbox', function(){
    var thisCheckbox = $(this);

    if (thisCheckbox.is(':checked')) {
      thisCheckbox.closest('li').addClass('checked');
    }
    else {
      thisCheckbox.closest('li').removeClass('checked');
    } 

    sidebarMarked();
  });
// End inner left menu checkbox click

// Functions
  // Hide user dropdown menu if it`s shown
  function hideUserDropdown() {

    if ( (!mainAvatarAnimation3.hasClass('velocity-animating')) && (!mainAvatarAnimation2.hasClass('velocity-animating')) && (!mainAvatarAnimation3.hasClass('velocity-animating')) ) {

      mainAvatarAnimation3.velocity({left: -(mainAvatarAnimation3.outerWidth()) + 'px'}, { duration: avatarSpeed });

      setTimeout(function(){
        mainAvatarAnimation2.velocity({ top: -(mainAvatarAnimation2.outerHeight()) + 'px' }, { duration: avatarSpeed });
      }, 150);        
        
      setTimeout(function(){
        mainAvatarArrow.velocity({
          right: -22,
          rotateZ: "0deg"
        }, {duration: avatarSpeed});

        mainAvatarAnimation1.velocity({
          width: 26,
          height: 26,
          top: 25,
          right: 17,
          rotateZ: "0deg"
        }, { duration: avatarSpeed });
        avatarMenuWrapper.css('borderBottomColor', '#e3e6ec');
        avatarMenuWrapper.removeClass('open');
      }, 250);

    }
    hideStatusDropdown();
  }

  // Hide status dropdown menu in user profile settings
  function hideStatusDropdown() {
    
    if (statusContainer.hasClass('active')) {
      if ( (!mainAvatarAnimation4.hasClass('velocity-animating')) && (!statusDropdownOptions.hasClass('velocity-animating')) && (!statusMainLink.hasClass('velocity-animating')) && (!mainAvatarAnimation5.hasClass('velocity-animating')) ) {
        $.Velocity.animate(mainAvatarAnimation4, {
          width: 16,
          height: 16,
          top: 11,
          left: 11,
          rotateZ: "0deg"
        }, {duration: 300})
          .then(function() {
            statusContainer.removeClass('active');
            statusDropdown.hide();
          });

          var statusWidth = statusMainLinkTxt.width() + parseInt(statusMainLink.css('paddingLeft')) + parseInt(statusMainLink.css('paddingRight'));

          statusDropdownOptions.velocity({ opacity: 0 }, {duration: 150});
          statusMainLink.velocity({ width: statusWidth }, {duration: 150});
          mainAvatarAnimation5.velocity({ rotateZ: "0deg" }, {duration: 150});
      }    
    }
  }

  function setUserDropdownHeight() {
    var winH = $('body').outerHeight();
    var headerH = $('#main-header-wrapper').outerHeight();
    var anim2H = mainAvatarAnimation2.outerHeight();
    var anim3NotifH = $('#main-avatar-menu-notifications').outerHeight();
    var containerPaddingB = parseInt(mainAvatarAnimation3.css('paddingBottom'));
    var maxH = (winH) - (headerH) - (anim2H) - (anim3NotifH) - (containerPaddingB);

    $('#main-avatar-menu-list-wrapper').css('maxHeight', maxH + 'px');
  }

  function showMenu() {
  
    if (!$('#lp-dd-menu-wrapper').hasClass('velocity-animating')) {

      infoWrapperList.addClass('active');
      var bottomPosition = (headerMainMenuHeight - headerInfoWrapperHeight)*-1;
      var leftPosition = (headerMainMenuWidth - headerInfoWrapperWidth)*-1;

      $('#lp-dd-menu-wrapper').velocity({
        bottom: bottomPosition,
        left: leftPosition  
      }, {duration: 500});

      infoWrapperList.velocity({
        width: headerMainMenuWidth,
        left: -12,
        backgroundColor: '#00b8e5'
      }, {duration: 500});

      $('.saiw-inner-circle').velocity({
        width: 500,
        height: 500,
        marginTop: - 250,
        right: -20,
        // backgroundColor: '#00b8e5',
        rotateZ: "-180deg"
      }, {duration: 500});

      $('.saiw-inner-arrow').velocity({
        right: 7,
        rotateZ: "-180deg"
      }, {duration: 500});

      setTimeout(function(){
        $('#lp-dd-menu').velocity({
          opacity: 1  
        }, {duration: 300});
      },200);
    }
  }

  function hideMenu() {
  
    if ((!$('#lp-dd-menu-wrapper').hasClass('velocity-animating'))&&infoWrapperList.hasClass('active')) {
      
      infoWrapperList.removeClass('active');
      $('#lp-dd-menu-wrapper').velocity({
        bottom: 0,
        left: 0  
      }, {duration: 500});

      infoWrapperList.velocity({
        width: headerInfoWrapperWidth,
        left: 0,
         backgroundColor: '#00b8e5'
      }, {duration: 500});

      $('.saiw-inner-circle').velocity({
        width: 26,
        height: 26,
        marginTop: - 13,
        right: 15,
        backgroundColor: '#00a5ce',
        rotateZ: "0deg"
      }, {duration: 500});

       $('.saiw-inner-arrow').velocity({
        right: 15,
        rotateZ: "0deg"
      }, {duration: 500});

      setTimeout(function(){
        $('#lp-dd-menu').velocity({
          opacity: 0  
        }, {duration: 300});
      },200);
    }
  }
// End functions
});

// Global functions
  function hideCardQuickMenu() {
    if ( $('.quick-menu-wrapper').hasClass('open') ) {
      $.Velocity.animate($('.quick-menu-wrapper.open').find('.quick-menu-holder'), {
        width: 0,
        height: 0
      }, { duration: 400 })
        .then(function() {
          $('.quick-menu-wrapper').removeClass('open');
          $('.nav-btn-x').removeClass('open');
        });
    }
  }

  function setTableHeight() {
    if (browser() == 'IE') {

      // Update perfect scrollbar
      if (psbar.length) {
        psbar.each(function(){
          $(this).perfectScrollbar('update');
        });
        var ieCellFix = $('.ie-height-fix');
        ieCellFix.each(function() {
          var thisCell = $(this);

          var parents = thisCell.parentsUntil('body');
          var headerHeight = 0;

          parents.each(function(index, el) {
              if ($(this).siblings('.ie-header').outerHeight() != null) {
                headerHeight += $(this).siblings('.ie-header').outerHeight();
              }
          });

          thisCell.outerHeight(viewportSize.getHeight()-headerHeight);
        });
      }
    }
  }

  function browser() {
    if (document.all) {
      return 'IE';
    }  
  }

  function resizeEnd() {
    var psbar = $('.ps-custom-scrollbar');

    if ((viewportSize.getWidth() > 0) && (viewportSize.getWidth() < 992)) { mobile = true; }
    else { mobile = false; }

    // Update perfect scrollbar
    if (psbar.length) {
      psbar.each(function(){
        $(this).perfectScrollbar('update');
      });
    }

    setTableHeight();
  }

  // Resize ck_editor height
  function ck_resize(container, height) {
    var myContainer = $('#cke_'+container);

    if ((!myContainer.length) || (!$('.cke_contents').length)) { 
      setTimeout(function(){
        ck_resize(container, height)
      }, 300); 
    }
    else {
      myContainer.outerHeight(height);
      var innerHeight = height-36;
      myContainer.find('.cke_contents').css('cssText','height: '+innerHeight+'px !important');
    }
  }

  function hideSearchDropdownMenu() {
    if (!$('#header-search-dropdown-wrapper').hasClass('velocity-animating')) {

      if ($('#header-search-cat').hasClass('active')) {
        $('#header-search-cat').velocity({width:187});
        $.Velocity.animate($('#header-search-dropdown-wrapper'), {height: 0, width: 187})
        .then(function() { 
          $('#header-search-cat').removeClass('active');
        });
      }
    }
  }
// End global functions