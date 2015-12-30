$(function(){

  // Browser resize function
  win.resize(function() {
    currentResize();
  });

  // Start this function on page open
  currentResize();

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