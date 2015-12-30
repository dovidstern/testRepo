$(function(){

  // Mark single message
  $('.msg-list-checkbox').change(function(){
    checkCheckBoxes();
    return false;
  });

  // Resize ck editor
  ck_resize('reply-message',154);

});

function messageActions(action, state) {

  if (state == 'disabled') { return false; }

  var allMessages = $('.messages-container').find('.inbox-message-item');
  var allCheckboxes = $('.message-title').find('.msg-list-checkbox');

  if (action == 'all') {
    allMessages.addClass('marked');
    allCheckboxes.prop('checked', true);
    $('#mark-group-msg').prop('checked', true);
    $('#secondary-header-wrapper').find('.btn-style').removeClass('disabled');
  }
  else if (action == 'none') {
    allMessages.removeClass('marked');
    allCheckboxes.prop('checked', false);
    $('#mark-group-msg').prop('checked', false);
    $('#secondary-header-wrapper').find('.btn-style').addClass('disabled');
  }
  else if (action == 'read') {
    allMessages.each(function(){
      if ($(this).hasClass('marked')) {
        console.log('remove class new');
        $(this).removeClass('new');
      }
      else {
        console.log('add class new');
      }
    });
  }
  else if (action == 'unread') {
    allMessages.each(function(){
      console.log('test');
      if ($(this).hasClass('marked')) {
        $(this).addClass('new');
      }
    });
  }
  else if (action == 'starred') {
    allMessages.each(function(){
      if ($(this).hasClass('marked')) {
        $(this).find('.favorite-icon').addClass('on');
      }
    });
  }
  else if (action == 'unstarred') {
    allMessages.each(function(){
      if ($(this).hasClass('marked')) {
        $(this).find('.favorite-icon').removeClass('on');
      }
    });
  }
  else if (action == 'delete') {
    alert('Cannot delete messages in the static website!');
  }

  $(".dropdown-wrapper").removeClass("open");

  return false;
}

function checkCheckBoxes() {
  var allCheckboxes = $('.message-title').find('.msg-list-checkbox');
  var checked = false;

  allCheckboxes.each(function(){
    if ($(this).is(':checked')) {
      checked = true;
      $(this).closest('.inbox-message-item').addClass('marked');
    }
    else {
      $(this).closest('.inbox-message-item').removeClass('marked');
    }
  });
}
