$(function(){
  //Align the grid on document ready
  alignGrid();

  $(window).resize(function(){
    // Add class 'resizing' to body
    if (!$('body').hasClass('resizing')) { $('body').addClass('resizing'); }

    // Remove class 'resizing' from body when window is not resizing anymore
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('alignGrid');
    }, 400);
  });

  $(window).bind('alignGrid', function() {
    //do something, window hasn't changed size in 500ms
    alignGrid();
    $('body').removeClass('resizing');
  });
});

function alignGrid() {
  cardOneTwoRows();

  // Write down all grid lists here
  alignGridList('#sessions-grid-list',35,28,362,true);
  alignGridList('#shareme-doc',37,30,309,true);
  alignGridList('#cards-wrapper',30,30,425,true);

  alignGridList('#search-results-items',27,27,325,false);
  alignGridList('#pending-requests-list',27,27,327,false);
  alignGridList('#learning-paths-list',27,27,429,false);

  //Calls a function 'resizeEnd()' if it exists when resize finish. This is needed just if we want to do some other stuff when resize finish.
  if ($.isFunction(window.resizeEnd)) { resizeEnd(); }
}

function alignGridList(listContainerName, listItemRight, listItemBottom, minWidth, fitToScreen) {

  // listContainer = UL`s ID for example '#session-list'
  // listItemRight - spacing on right between li`s
  // listItemBottom - spacing on bottom between li`s
  // minWidth - min width of list item
  // fitToScreen - wether to resize list item to fit screen or not (true and false values)

  var listContainer = $(listContainerName);

  if (listContainer.length) {
    
    var listItem = listContainer.children();
    var listItemPrev, listContainerHeight = 0, maxContainerHeight = 0, timeout = 0, timeoutInterval = 90, topArray = [];

    if (!listItem.hasClass('velocity-animating')) {

      // Maximum columns for current size
      var maxCol = 1;

      // Determine maximum columns for current size
      while (((maxCol*minWidth)+((maxCol-1)*listItemRight)) < listContainer.outerWidth()) {
        maxCol++;
      }

      maxCol--;

      if(listItem.length<maxCol) {
        maxCol = listItem.length;
      }

      // Custom space between cells depending on container and max cols
      var currMargin = parseInt((listContainer.outerWidth()-(maxCol*minWidth))/(maxCol-1));

      if (fitToScreen == true) {
        var extraWidth = parseInt(((maxCol-1)*currMargin-(maxCol-1)*listItemRight)/maxCol);
        minWidth = minWidth+extraWidth;
        currMargin = listItemRight;
      }

      listItem.width(minWidth);
     
      var tmpCol = 0, tmpRow = 0, posTop = 0, posLeft = 0, items=0;

      // Sets cells position
      listItem.each(function(index, el) {

        var currentItem = $(this);

        if (tmpCol >= maxCol) { tmpCol = 0; tmpRow++; }

        if (tmpRow != 0) {
          listItemPrev = index-maxCol;          
          posTop = topArray[listItemPrev].height+topArray[listItemPrev].top+listItemBottom;
        }
        else {
          posTop = 0;
        }

        var thisMax = parseInt(currentItem.outerHeight()) + parseInt(posTop);
        if(thisMax>maxContainerHeight) {
          maxContainerHeight = thisMax;
        }

        posLeft = tmpCol*(minWidth+currMargin);
        topArray.push({top:posTop, height:currentItem.outerHeight()});

        if (!currentItem.hasClass('animate')) {
          currentItem.css({
            top: posTop, 
            left: posLeft
          });

          if (document.all) { 
            currentItem.velocity('stop').velocity({
              opacity: 1
            });          
          }
          else {
            setTimeout(function(){
              currentItem.addClass('animate');
            }, timeout);
          }

        }
        else {
          currentItem.velocity('stop').velocity({
            top: posTop, 
            left: posLeft
          });          
        }

        timeout = timeout + timeoutInterval;
        tmpCol++;
      });
      

      if (maxCol == 1) { listItem.outerWidth('100%'); }
      else { listItem.outerWidth(minWidth); }
      
      listContainerHeight = maxContainerHeight;
      listContainer.outerHeight(listContainerHeight);
    }
    else {
      // Do it only when resize is finished
      if(this.resizeAfter) clearTimeout(this.resizeAfter);
      this.resizeAfter = setTimeout(function() {
          alignGridList(listContainer, listItemRight, listItemBottom, minWidth, fitToScreen);
      }, 300);
    }
  }
}

function cardOneTwoRows() {

  if ( $('.two-row-wrapper').length ) {
    $('.two-row-wrapper').each(function() {
      elWrapper = $(this);
      if ( elWrapper.outerWidth() > 800 ) {
        elWrapper.find('.two-row-item').css('width', '50%');
        elWrapper.find('.top-item').css({
          marginTop: '14px',
          paddingRight: '50px'
        });
        elWrapper.find('.bottom-item').css('paddingLeft', '40px');
        elWrapper.find('.ver-line').show();
        elWrapper.find('.hide-hor-line-wrapper').show();
        elWrapper.find('.hide-hor-line').hide();
      } else {
        elWrapper.find('.two-row-item').css('width', '100%');
        elWrapper.find('.top-item').css({
          marginTop: '0px',
          paddingRight: '0px'
        });
        elWrapper.find('.bottom-item').css('paddingLeft', '0px');
        elWrapper.find('.ver-line').hide();
        elWrapper.find('.hide-hor-line-wrapper').hide();
        elWrapper.find('.hide-hor-line').show();
      } 
    });
  }
}

