$(function(){

  // Browser resize function
  win.resize(function() {
    currentResize();
  });

  // Start this function on page open
  currentResize();

  $('#welcome-modal').modal('show');

  $('.add-invite-email').on('click', function(event) {
    $('.invite-emails-wrapper').append('<input class="suf-input-style" type="email" name="invite-email" placeholder="Email address">');
    $('input').placeholder();
    return false;
  });

  var inputFields = $('.signup-form').find('input[type="text"]');

  inputFields.keyup(function(){
    var typed = true;

    inputFields.each(function(){
      if ($(this).val() == '') { typed = false; }
    });

    if (typed) { 
      $('.signup-form').find('.btn-style').removeClass('disabled');
    }
    else {
      $('.signup-form').find('.btn-style').addClass('disabled');
    }
  });

  function currentResize(){

    if ($('.pie_progress').length) {
      // Initialize percentage chart
      $('.pie_progress').asPieProgress({
            'namespace': 'pie_progress',
            size: 73,
            barcolor: '#92d569',
        barsize: '4',
        trackcolor: '#e5ecf0',
        fillcolor: 'none'
        });
      $('.pie_progress').asPieProgress('start');    
    }
  }
});