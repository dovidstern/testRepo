$(function(){

  // Browser resize function
  win.resize(function() {
    currentResize();
  });

  // Start this function on page open
  currentResize();

  function currentResize() {
    notificationAlign();
  }

  notificationAlign();

  // Notification align    
  function notificationAlign() {
    var userTxtBtnWidth = $('.user-btn-wrapper').outerWidth();
    var userTxtWidth = $('.user').outerWidth();
    var btnTxtWidth = $('.btn-list-holder-wrapper').outerWidth();

    if (userTxtBtnWidth < (userTxtWidth + btnTxtWidth)) {
      $('.btn-list-holder-wrapper').css({'float':'left','padding-left':25});
    }
    else {
      $('.btn-list-holder-wrapper').css('float','right');
    }
  }
  //End Notification align

});