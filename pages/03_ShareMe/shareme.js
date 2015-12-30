$(function(){
  var chatVideoScale = 1.8;

  // Browser resize function
  win.resize(function() {
    currentResize();
  });

  // Start this function on page open
  currentResize();

  function currentResize(){
  }

});

function showHideDropdown() {
  var thisBtn = $('#testBtn');

  if (thisBtn.find('i').hasClass('up-2')) {
    thisBtn.find('i').removeClass('up-2').addClass('down-2').closest('.autocomplete-wrapper').find('.autocomplete').stop().fadeOut();
  }
  else {
    thisBtn.find('i').removeClass('down-2').addClass('up-2').closest('.autocomplete-wrapper').find('.autocomplete').stop().fadeIn();
  }

  return false;
}