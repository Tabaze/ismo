$('.floor-screen.screen').ready(function(){
	
	//floor
	var $floor_selector = $.floor_screen.find('.floor-selector');
	var $floor_map = $.floor_screen.find('.floor-map');
	var $empty_floor = $floor_map.find('.empty-floor');
	//bar
	var $edit_button = $.floor_screen.find('.edit-button.editing');
	var $edit_bar = $.floor_screen.find('.edit-bar');
	//tables
	var $tables = $floor_map.find('.tables');
	var $new_table = $edit_bar.find('.edit-button.new-table');
	var $Renametable = $edit_bar.find('.edit-button.rename.needs-selection');
	var $Seatstable = $edit_bar.find('.edit-button.seats.needs-selection');
	var $Deletetable = $edit_bar.find('.edit-button.trash.needs-selection');
	var $popup_textinput = $('.popups').find('.popup.popup-textinput');
	var $popup_number = $('.popups').find('.popup.popup-number');
	var $numpad = $popup_number.find('.popup-numpad');
	var $popup_deletetable = $('.popups').find('.popup.popup-deletetable');
	var defaultcss_table={'width':'75px','height':'75px','line-height':'75px','margin-left':'-37.5px','margin-top':'-37.5px','top':'137.5px','left':'137.5px','order-radius':'3px'}
	var numberSeats = '';
	var $order_selector = $('.order-selector');
	var $btnfavorite = $.product_screen.find('.btnfavorite');
	var $popup_messager = $('.popups').find('.popup.popup-messager');
	var $btnserveur = $.product_screen.find('.input-button.number-serveur');
	var $popup_serveur = $('.popups').find('.popup.popup-serveur');
    //load .floor-screen.screen
	var observer = new MutationObserver(function (mutations) {
	    if ($.floor_screen.is(":visible")) {
	        if ($.floor_screen.hasClass('transferer')) {
	            //if ($tables.find('[data-id="' + $.touch_scrollable.find('.order-button.floor-button').attr('data-id') + '"]').find('.order-count').length) {
	            //    $tables.find('[data-id="' + $.touch_scrollable.find('.order-button.floor-button').attr('data-id') + '"]').find('.order-count').remove();
	            //}
	        }
	        $('.client-info').addClass('oe_hidden');
	    } else {
	    }
	});
	var target = document.querySelector('.floor-screen.screen');
	
	observer.observe(target, {
	    attributes: true
	});

	$floor_selector.on('click', '.button.button-floor', function () {
	    selectfloor($(this));
	    var Id_Plan = $(this).attr('data-id');
	    tablebyidPlan(Id_Plan);
	});//don
	//$.touch_scrollable.on('click', '.order-button.floor-button', function () {
	//    var IDV_POSTables = $.touch_scrollable.find('.order-button.floor-button').attr('data-id');
	//    count_CommandeOrdre(IDV_POSTables);
	//});//not done
	$new_table.on('click',this,function(){
		$empty_floor.addClass('oe_hidden');
		$tables.append(newtable());
		selecttable($tables.find('.table').last());	
	});
	$Renametable.on('click',this,function(){
		if($tables.find('.table.selected').length){
			$popup_textinput.parent().removeClass('oe_hidden');
			$popup_textinput.find('input').val($tables.find('.table.selected .label').text());
		}
		
	});
	$Seatstable.on('click',this,function(){
		if($tables.find('.table.selected').length){
			$popup_number.parent().removeClass('oe_hidden');
			$popup_number.find('.popup-input.value.active').text($tables.find('.table.selected .table-seats').text());
		}
	});
	$Deletetable.on('click',this,function(){
	    if ($tables.find('.table.selected').length) {
	        $popup_deletetable.parent().removeClass('oe_hidden');		
		}
	});
	$numpad.on('click','.input-button.number-char',function(){       
        numberSeats = numberSeats + $(this).text();
        $popup_number.find('.popup-input.value.active').text(numberSeats);         
    });
    $numpad.on('click','.input-button.numpad-backspace',function(){       
        numberSeats = numberSeats.substring(0,numberSeats.length - 1);
        $popup_number.find('.popup-input.value.active').text(numberSeats);         
    });
    $numpad.on('click','.input-button.numpad-char',function(){       
        numberSeats = '';
        $popup_number.find('.popup-input.value.active').text(numberSeats);         
    });
    $popup_number.on('click','.button.confirm',function(){
    	numberSeats='';
    	$popup_number.parent().addClass('oe_hidden');
    	$tables.find('.table.selected .table-seats').text($popup_number.find('.popup-input.value.active').text());
    	var POSNbrChair = $popup_number.find('.popup-input.value.active').text();
    	var IDV_POSTables = $tables.find('.table.selected').attr('data-id');
    	$.ajax
                ({
                    type: 'POST',
                    url: 'PlanRestaurant.aspx/updatePOSNbrChair',
                    async: false,
                    data: "{'IDV_POSTables':'" + IDV_POSTables + "','POSNbrChair':'" + POSNbrChair + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                    },
                    error: function (result) {
                        alert("Error Occured, Try Again");
                    }
                });
    
    });
    $popup_number.on('click','.button.cancel',function(){
    	numberSeats='';
		$popup_number.parent().addClass('oe_hidden');
    });
    $popup_deletetable.on('click', '.button.confirm', function () {
        var IDV_POSTables = $tables.find('.table.selected').attr('data-id');
        $.ajax
            ({
                type: 'POST',
                url: 'PlanRestaurant.aspx/daletetable',
                async: false,
                data: "{'IDV_POSTables':'" + IDV_POSTables + "'}",
                contentType: 'application/json; charset =utf-8',
                success: function (data) {
                    $tables.find('.table.selected').remove();
                },
                error: function (result) {
                    alert("Error Occured, Try Again");
                }
            });
        $popup_deletetable.parent().addClass('oe_hidden');
    });
    $popup_deletetable.on('click', '.button.cancel', function () {
        $popup_deletetable.parent().addClass('oe_hidden');
    });
	$popup_textinput.on('click','.button.confirm',function(){
		$popup_textinput.parent().addClass('oe_hidden');
		$tables.find('.table.selected .label').text($popup_textinput.find('input').val());
		var POSTableName = $popup_textinput.find('input').val();
		var IDV_POSTables = $tables.find('.table.selected').attr('data-id');
		$.ajax
                ({
                    type: 'POST',
                    url: 'PlanRestaurant.aspx/updatePOSTableName',
                    async: false,
                    data: "{'IDV_POSTables':'" + IDV_POSTables + "','POSTableName':'" + POSTableName + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                    },
                    error: function (result) {
                        alert("Error Occured, Try Again");
                    }
                });
	});
	$popup_textinput.on('click','.button.cancel',function(){
		$popup_textinput.parent().addClass('oe_hidden');
	});
	$tables.on('click',this,function(event){
		if($(event.target).hasClass('tables')){
			removeselectedtable();
		}
		//
	});
	$popup_messager.on('click', '.button.confirm', function () {
	    if ($popup_messager.hasClass('verify_IDV_CAISSIER')) {
	        $popup_messager.parent().addClass('oe_hidden');
	        $popup_messager.removeClass('verify_IDV_CAISSIER');
	    }
	});
	$tables.on('mousedown','.table',function(event){
		if($edit_button.hasClass('active')){
			selecttable($(this));
			if(!$(event.target).hasClass('table-handle')){
				$(this).attr('id', 'newID');
				this.prevClientX = event.clientX;
  				this.prevClientY = event.clientY;
  				this.prevLeft = parseInt(this.style.left) || 0;
  				this.prevTop = parseInt(this.style.top) || 0;
  				this.addEventListener('mousemove', onMouseMove);
  				document.addEventListener('mouseup', onMouseUp);
			}
			else{
				$(this).attr('id', 'newID');
				this.prevClientX = event.clientX;
  				this.prevClientY = event.clientY;
  				this.prevwidth = parseInt(this.style.width) || 0;
  				this.prevheight = parseInt(this.style.height) || 0;
  				this.addEventListener('mousemove', startResizing);
  				document.addEventListener('mouseup', stopResizing);
			}
		}
		else {
		    var Id_Table = $(this).attr('data-id');
		    var Id_Caissier = $('.username').attr('id_cai');
		    var Name_Table =  $(this).find('.label').text();
		    var verify = verify_Id_Table_Id_Caissier(Id_Table, Id_Caissier);
		        if (verify) {
		            var order_count = $(this).find('.order-count').length;
		            var checktransfer = false;
		            if ($.floor_screen.hasClass('transferer')) {    
		                transferer_Commande(IDV_POSTables, order_count);
		                checktransfer = true;
		            }//not done
		            if (checktransfer == false && order_count == 0) {
		                $popup_serveur.parent().removeClass('oe_hidden');
		                $.Id_Table = Id_Table;
		                $.Name_Table = Name_Table;
		            }
		            else {
		                $.touch_scrollable.find('.order-button.floor-button').attr('data-id', Id_Table);
		                var tabletext = $(this).find('.label').text();
		                var floortext = $floor_selector.find('.button.button-floor.active').text();
		                $.touch_scrollable.find('.order-button.floor-button .table-name').html(floortext + " ( " + tabletext + " )()");
		                $.floor_screen.addClass('oe_hidden');
		                $.product_screen.removeClass('oe_hidden');
		                $.touch_scrollable.removeClass('oe_hidden');
		                List_Favoris_Article();
		                $.Id_Table = Id_Table;
		                $.Name_Table = Name_Table;
		            }
		        } else {
		            $popup_messager.parent().removeClass('oe_hidden');
		            $popup_messager.addClass('verify_IDV_CAISSIER');
		            var callback = new fcallback();
		            $popup_messager.find('.message').text(callback.sys_message(807));
		        }
		        }
	});//not done
	function startResizing(event){
		this.style.width =  (this.prevwidth + event.clientX - this.prevClientX) + 'px';
  		this.style.height =  (this.prevheight + event.clientY - this.prevClientY) + 'px';
	}
	function stopResizing(event){
		var draggable = document.getElementById('newID');
  		draggable.removeEventListener("mousemove", startResizing);
  		document.removeEventListener('mouseup', stopResizing);
  		var POSCSS = draggable.getAttribute("style");
  		var IDV_POSTables = draggable.getAttribute("data-id");
  		updateCSStable(IDV_POSTables, POSCSS);
  		$('.table').removeAttr('id');
	}
	function onMouseUp(event) {
  		var draggable = document.getElementById('newID');
  		draggable.removeEventListener("mousemove", onMouseMove);
  		document.removeEventListener('mouseup', onMouseUp);
  		var POSCSS = draggable.getAttribute("style");
  		var IDV_POSTables = draggable.getAttribute("data-id");
  		updateCSStable(IDV_POSTables, POSCSS);	
  		$('.table').removeAttr('id');
	}
	function onMouseMove(event) {
  		this.style.left = this.prevLeft + (event.clientX - this.prevClientX) + 'px';
  		this.style.top 	= this.prevTop + (event.clientY - this.prevClientY) + 'px';
		}
	function newtable(){
		var count = $tables.find('.table').length || 0;
		var $table;
		var POSNbrChair = 1;
		var POSCSS = 'width:75px;height:75px;line-height:75px;margin-left:-37.5px;margin-top:-37.5px;top:137.5px;left:137.5px;order-radius:3px';
		var POSTableName = 'T' + (count + 1);
		var IDV_POSPlan = $floor_selector.find('.button.button-floor.active').attr('data-id');
		//insertnewtable(POSNbrChair, POSCSS, POSTableName, IDV_POSPlan);
		    $.ajax
                ({  
                    type: 'POST',  
                    url: 'PlanRestaurant.aspx/insertnewtable',
                    async: false,  
                    data: "{'POSNbrChair':'" + POSNbrChair + "','POSCSS':'" + POSCSS + "','POSTableName':'" + POSTableName + "','IDV_POSPlan':'" + IDV_POSPlan + "'}",
                    contentType: 'application/json; charset =utf-8',  
                    success: function(data)  
                    {
                        $table = $('<div class="table" data-id="' + data.d + '"><span class="label">T' + (count + 1) + '</span><span class="table-seats">1</span><span class="table-handle top right"></span><span class="table-handle top left"></span><span class="table-handle bottom right"></span><span class="table-handle bottom left"></span></div>');
                        $table.css(defaultcss_table);
                       
                    },  
  
                    error: function(result)   
                    {  
                        alert("Error Occured, Try Again");  
                    }  
                });  
		
		    return $table;
	}
	function selecttable($el){
		$tables.find('.table').removeClass('selected');
		$el.addClass('selected');
		$edit_bar.find('.needs-selection').removeClass('disabled');
	}
	function selectfloor($el){
        $('.button.button-floor').removeClass('active');
        $el.addClass('active');
    }
    function removeselectedtable(){
    	$tables.find('.table').removeClass('selected');
    	$edit_bar.find('.needs-selection').addClass('disabled');
    }
    function updateCSStable(IDV_POSTables, POSCSS) {
        $.ajax
                ({
                    type: 'POST',
                    url: 'PlanRestaurant.aspx/updateCSStable',
                    async: false,
                    data: "{'IDV_POSTables':'" + IDV_POSTables + "','POSCSS':'" + POSCSS + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                    },
                    error: function (result) {
                        alert("Error Occured, Try Again");
                    }
                });
    }
    function count_CommandeOrdre(Id_Table) {
        $.ajax
             ({
                 type: 'POST',
                 url: 'Default.aspx/count_CommandeOrdre',
                 async: false,
                 data: "{'Id_Table':'" + Id_Table + "'}",
                 contentType: 'application/json; charset =utf-8',
                 success: function (data) {
                     var count = data.d;
                     //$tables.find('[data-id="' + IDV_POSTables + '"]').prepend('<span class="order-count ">' + count + '</span>');
                     if ($tables.find('[data-id="' + Id_Table + '"]').find('.order-count').length) {
                         if (count > 0) {
                             $tables.find('[data-id="' + Id_Table + '"]').find('.order-count').text(count);
                         } else {
                             $tables.find('[data-id="' + Id_Table + '"]').find('.order-count').remove();
                         }
                     }
                     else {
                         if (count > 0) {
                             $tables.find('[data-id="' + Id_Table + '"]').prepend('<span class="order-count ">' + count + '</span>');
                         }
                     }
                 },
                 error: function (xhr, status, error) {
                     var err = eval("(" + xhr.responseText + ")");
                     alert(err.Message);
                 }
             });
    }
    function V_ECMD_IDV_POSTables(IDV_POSTables) {
        $.ajax
            ({
                type: 'POST',
                url: 'Sys_Pos.aspx/V_ECMD_IDV_POSTables',
                async: false,
                data: "{'IDV_POSTables':'" + IDV_POSTables + "'}",
                contentType: 'application/json; charset =utf-8',
                success: function (data) {
                   
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                }
            });
    }
    function transferer_Commande(IDV_POSTables, order_count) {
        if (order_count==0) {
            V_ECMD_IDV_POSTables(IDV_POSTables);
            $.floor_screen.removeClass('transferer');
        }
    }   
    $popup_serveur.on('click', '.button.cancel', function () {
        $popup_serveur.parent().addClass('oe_hidden');
    });
    $popup_serveur.on('click', '.serveur', function () {
        $.P_Serveur = $(this).attr('data-id');
        var name= $(this).find('.serveur-name').text();
        $popup_serveur.parent().addClass('oe_hidden');
        $.touch_scrollable.find('.order-button.floor-button').attr('data-id', $.Id_Table);
        var floortext = $floor_selector.find('.button.button-floor.active').text();
        $.touch_scrollable.find('.order-button.floor-button .table-name').html(floortext + " ( " + $.Name_Table + " )(" + name + ")");
        $('.client-info').text('ClientDivers');
        $('.client-info').attr('data-cpt-fac', $.P_Pos.ClientDivers);
        $.floor_screen.addClass('oe_hidden');
        $.product_screen.removeClass('oe_hidden');
        $.touch_scrollable.removeClass('oe_hidden');
    });
    //update
    function tablebyidPlan(Id_Plan) {
        $.ajax
                ({
                    type: 'POST',
                    url: 'Default.aspx/tablebyidPlan',
                    async: false,
                    data: "{'Id_Plan':'" + Id_Plan + "'}",
                    contentType: 'application/json; charset =utf-8',
                    success: function (data) {
                        //console.log(data.d);
                        var tables = data.d;
                        $tables.html('');
                        if (tables.length) {
                            $empty_floor.addClass('oe_hidden');
                            for (i in tables) {
                                if (tables[i].Count_CommandeOrdre > 0) {
                                    var $table = $('<div class="table" data-id="' + tables[i].Id_Table + '"'
                                        + 'style="' + tables[i].Css_Table + '"><span class="order-count ">' + tables[i].Count_CommandeOrdre
                                        + '</span><span class="label">' + tables[i].Name_Table
                                        + '</span><span class="table-seats">' + tables[i].Num_Chair
                                        + '</span><span class="table-handle top right"></span><span class="table-handle top left">'
                                        +'</span><span class="table-handle bottom right"></span><span class="table-handle bottom left">'
                                        +'</span></div>');
                                } else {
                                    var $table = $('<div class="table" data-id="' + tables[i].Id_Table
                                        + '" style="' + tables[i].Css_Table
                                        + '"><span class="label">' + tables[i].Name_Table
                                        + '</span><span class="table-seats">' + tables[i].Num_Chair
                                        + '</span><span class="table-handle top right"></span><span class="table-handle top left">'
                                        +'</span><span class="table-handle bottom right"></span><span class="table-handle bottom left">'
                                        +'</span></div>');
                                }
                                $tables.append($table);
                            }
                        }
                        else {
                            $empty_floor.removeClass('oe_hidden');

                        }

                    },

                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.Message);
                    }
                });
    }
    function verify_Id_Table_Id_Caissier(Id_Table, Id_Caissier) {
        var verify = false;
        console.log(Id_Table, Id_Caissier);
        $.ajax
        ({
            type: 'POST',
            url: 'Default.aspx/verify_Id_Table_Id_Caissier',
            async: false,
            data: "{'Id_Table':'" + Id_Table + "','Id_Caissier':'" + Id_Caissier + "'}",
            contentType: 'application/json; charset =utf-8',
            success: function (data) {
                verify = data.d;
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err.Message);
            }
        });
        return verify;
    }
//done
});

