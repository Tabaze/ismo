import{uapdateOrdreProgressType} from './../service.js';
import {changeProgressType} from './core.js';
export function sortable(){
  //$.validerOrdre=$('.modal .validerOrdre');
  var wasMovedOut = function(elem) {
    changeAllPositionOrdre($(elem).parent());
    let type=$(elem).parent().attr('data-type');
    let idOrdre=$(elem).attr('data-id');
    changeProgressType(type,oldType,idOrdre);
    return $(elem).parent().hasClass('js-sortable-parent');
  };
  
  function stopHandler(event, obj) {
    var elem = obj.item[0];
    var sampleSortableGroup = $('.js-sortable-group').first().clone().html('');
    
    
   // Wrap an item in a group 
    if (wasMovedOut(elem)) {
      $(elem).wrap(sampleSortableGroup);
      sortableGroup = $(".js-sortable-group").sortable({
        connectWith: ".js-drop-target",
        stop: stopHandler,
      }).disableSelection();
    }
  
    // Remove 
    // if (this.children.length === 0) {
    //   this.remove();
    // }
  }
  
  // Sortable Configuration
  $('.js-sortable-parent').sortable().disableSelection();
  
  var sortableGroup = $(".js-sortable-group").sortable({
    connectWith: ".js-drop-target",
    stop: stopHandler,
    cancel: ".sticky",
    start: function( elem, ui ) {
      oldType=$(elem.currentTarget).attr('data-type');
    }
  }).disableSelection();
}
var oldType='';
// function changeProgressType(progressType,idOrdre){
//   uapdateOrdreProgressType({progressType:progressType,idOrdre:idOrdre});
// }
 function changeAllPositionOrdre(ul){
  $(ul).find('li').each(function(index,li){
      if($(li).attr('data-id'))
          {
              //updatePositionOrdre({positionOrdre:index,idOrdre:$(li).attr('data-id')});
          }
      
  });
}