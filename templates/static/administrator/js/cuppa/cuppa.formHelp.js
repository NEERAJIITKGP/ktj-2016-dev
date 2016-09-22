// auto get data inside the <form> and return a object
// This method use the jQuery.serialize
    cuppa.getFormData = function(form, remove_clear_values){
        if(remove_clear_values == undefined) remove_clear_values = false;
        var data = {};
        var info = jQuery(form).serialize();
            info = cuppa.urlDecode(info);
            info = cuppa.urlToObject(info);
       if(remove_clear_values){
            for (var i in info) {
                if(info[i] == ""){ delete info[i]; }
           } 
       }
       return info;
    };
/* Serialize forms 
    Cuppa serialize, return the input values on a Object, name:value 
*/
    cuppa.serialize = function(element){
        var formItems = $(element).find("input[type!='button'], textarea, select");
        var object = {}
        for(var i = 0; i < formItems.length; i++){
            var name = jQuery(formItems[i]).attr("name");
            if(name){
                if(jQuery(formItems[i]).attr("type") == "checkbox" ){
                    object[name] = (jQuery(formItems[i]).prop("checked")) ? 1 : 0;
                }else if(jQuery(formItems[i]).attr("type") == "radio"){
                    object[name] =  $('input[name='+name+']:checked').val()
                }else{
                    object[name] = jQuery(formItems[i]).val();
                }
                if(typeof object[name] === "string") object[name] = cuppa.trim(object[name]);
            }
        }
        return object;
    }
/* Input preText.
    Example: cuppa.preText(element, 'Name_')
             cuppa.preText(element); This example use the "alt" attr to find the preText string
*/
    cuppa.preText = function(element, string){
        if(!string){
            var elements = jQuery(element).get();
            for(var i = 0; i < elements.length; i++){
                var element = jQuery(elements[i]);
                if($(element).attr("type") == undefined || $(element).attr("type") == "text" || $(element).attr("type") == "password"){
                    if($(element).attr("alt")) jQuery(element).preTextCuppa( $(element).attr("alt") );
                 }
            }
        }else{
            jQuery(element).preTextCuppa(string);
        }
    };
/* Max maxlength */
    cuppa.maxlength = function(element, maxlength){
        jQuery(element).bind("input keyup", function(e){
            if(maxlength == undefined) maxlength = jQuery(this).attr("maxlength");
            if (!!maxlength) {
                var text =  $(this).val();
                if (text.length > maxlength) {
                     $(this).val(text.substring(0,maxlength));
                    e.preventDefault();
                }
            }
        });
    }
/* Input filter.
    Example: cuppa.inputFilter(element, '0-9')
*/
    cuppa.inputFilter = function(element, values){
        values = "["+values+"]";
        jQuery(element).filter_input_cuppa({regex:values}); 
    };
    cuppa.inputFilterRemove = function(element){
        jQuery(element).unbind("keypress paste");
    }
// Money Input
    cuppa.moneyInput = function(field){
        var items = jQuery(field).get();        
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            var maskName = "mask_"+item.id+i;
            jQuery("."+maskName).remove();
            var mask_field = jQuery(item).clone().get(0);
                mask_field.item = item;
                jQuery(mask_field).removeAttr("name").removeAttr("id").removeAttr("class");
                jQuery(mask_field).addClass(maskName);
                jQuery(mask_field).insertBefore(item);
                jQuery(mask_field).attr("type", "input");
                jQuery(mask_field).val( cuppa.numberToMoney( jQuery(item).val() ) );
            jQuery(item).attr("type", "hidden");
            function updateValue(e, mask_field){
                if(e) mask_field = this;
                var valuePoint = jQuery(mask_field).val().split(".");
                var value = cuppa.moneyToNumber( jQuery(mask_field).val() );
                if(valuePoint.length > 1 && valuePoint[ valuePoint.length-1 ] == "" ){ 
                    jQuery(mask_field.item).val( value ); return;
                }else if( valuePoint.length > 1 && parseFloat(valuePoint[ valuePoint.length-1 ]) == 0 ){
                    jQuery(mask_field.item).val( value ); return;
                }
                jQuery(mask_field.item).val( value ).trigger("change");
                jQuery(mask_field).val( cuppa.numberToMoney(value) );
            }; jQuery(mask_field).bind("input", updateValue); updateValue(null, mask_field);            
        }
    };
/* Date input */
    cuppa.date = function(element){
    	jQuery(function() { 
    	   jQuery(element).datepicker({ dateFormat: 'yy-mm-dd', changeYear:true });
    	});
    };
/* Auto complete input (tags inputs)
    data: Array json
*/
    cuppa.autoComplete = function(item, data, multi_values){
        if(!jQuery.isArray(data)) data = jQuery.parseJSON(data);
        if(!multi_values){
            jQuery(item).autocomplete({source: data});
        }else{
            jQuery(item).bind( "keydown", function( event ) {
                    if ( event.keyCode === jQuery.ui.keyCode.TAB &&
                        jQuery( this ).data( "autocomplete" ).menu.active ) {
                        event.preventDefault();
                    }
            });
            jQuery(item).autocomplete({
                minLength: 0,
                source: function( request, response ) {
                    response( jQuery.ui.autocomplete.filter( data, extractLast( request.term ) ) );
                },
                focus: function() { return false; },
                select: function( event, ui ) {
                  var terms = split( this.value );
                  terms.pop();
                  terms.push( ui.item.value );
                  terms.push( "" );
                  this.value = terms.join( ", " );
                  return false;
                }
              });
        }
        function split( val ) { return val.split( /,\s*/ ); }
        function extractLast( term ) { return split( term ).pop(); }
    };
    cuppa.autoComplete2 = function(item, data, multi_values){
        if(!jQuery.isArray(data)) data = jQuery.parseJSON(data);
        if(!multi_values){
            jQuery( "#"+item).autocomplete({source: data});
        }else{
            jQuery( "#"+item).bind( "keydown", function( event ) {
                    if ( event.keyCode === jQuery.ui.keyCode.TAB &&
                        jQuery( this ).data( "autocomplete" ).menu.active ) {
                        event.preventDefault();
                    }
            });
            jQuery( "#"+item).autocomplete({
                minLength: 0,
                source: function( request, response ) {
                    response( jQuery.ui.autocomplete.filter( data, extractLast( request.term ) ) );
                },
                focus: function() { return false; },
                select: function( event, ui ) {
                  var terms = split( this.value );
                  terms.pop();
                  terms.push( ui.item.value );
                  terms.push( "" );
                  this.value = terms.join( ", " );
                  return false;
                }
              });
        }
        function split( val ) { return val.split( /,\s*/ ); }
        function extractLast( term ) { return split( term ).pop(); }
    };
/* Auto Load Select Info
    <select class="select"></select>
    cuppa.autoLoadSelect("default_value", "change_select", ".select" ,"ex_cities", "column_id_on_changed_table", "column_on_changed_table", "", "column_on_target_table", true, "administrator/classes/ajax/Functions.php");
*/
    cuppa.autoLoadSelect = function(value, change_field, target_field, table, table_value, table_label, condition, compare_column, include_clear_value, ajax_path_file){
        value = cuppa.jsonDecode(value, false);
        var ajax = null;
        if(include_clear_value == undefined) include_clear_value = true;
        jQuery(change_field).bind("change", function(e){
            var option = "<option value=''>Loading...</option>";
            jQuery(target_field).html(option).trigger("change");
            var data = {}
                data["function"] = "loadSelectInfo";
                data.table = table;
                data.value = table_value;
                data.label = table_label;
                data.condition = condition;
                data.compare_column = compare_column;
                data.compare_column_value = jQuery(change_field).val();
                if(ajax){ ajax.abort(); }
                if(ajax_path_file){
                    ajax = jQuery.ajax({url:ajax_path_file, type:"POST", data:data, success:Ajax_Result});
                }else{
                    ajax = jQuery.ajax({url:"classes/ajax/Functions.php", type:"POST", data:data, success:Ajax_Result});
                }
                    function Ajax_Result(result){
                        result = cuppa.jsonDecode(result);
                        if(result){
                            jQuery(target_field).html("");
                            for(var i = 0; i < result.length; i++){
                                if(include_clear_value){
                                    var option = "<option value='"+result[i][table_value]+"'>";
                                        option += result[i][table_label];
                                        option += "</option>";
                                        jQuery(target_field).append(option);
                                }else if(!include_clear_value && result[i][table_value]){
                                    var option = "<option value='"+result[i][table_value]+"'>";
                                        option += result[i][table_label];
                                        option += "</option>";
                                        jQuery(target_field).append(option);
                                }
                            }
                        }else{
                            var option = "<option value=''> - - </option>";
                            jQuery(target_field).html(option);
                        }
                        // Select default value
                            jQuery(target_field).val(value).trigger("change");
                    }
        }).trigger("change");
    };
/* Range of values
    Example cuppa.range(element, 1, 10);
*/
    cuppa.range = function(element, min, max){
        if(min != undefined) jQuery(element).bind("change", function(){ if(jQuery(this).val() < min ) jQuery(this).val(min); });
        if(max != undefined) jQuery(element).bind("change", function(){ if(jQuery(this).val() > max ) jQuery(this).val(max); });
        jQuery(element).each(function(){
            if( jQuery(this).val() < min ){
                jQuery(this).val(min); 
                jQuery(this).trigger("change");
            }
            if( jQuery(this).val() > max ){
                jQuery(this).val(max);
                jQuery(this).trigger("change");
            }
        });
    }
//++ Select 
    cuppa.select = {};
    /* Select a item with value or label */
        cuppa.select.setValue = function(value, item, is_label) {
    	   item = jQuery(item).find("option");
    	   if(is_label){
                for (i = 0; i < item.length; i++) {
                    if (item[i].text == value) { item[i].selected = true; break; }
                }
    	   }else{
                for (i = 0; i < item.length; i++) {
                    if (item[i].value == value) { item[i].selected = true; break; }
                }
    	   }
    	};
    /* Select item with like value or like label */
        cuppa.select.setLike = function(value, item, is_label){
            item = jQuery(item).find("option");
            value = tu_GetURLFriendly(value);
            value = eval("/"+value+"/i");
            if(is_label){
                for (i = 0; i < item.length; i++) {
        			if(tu_GetURLFriendly(item[i].text).search(value) != -1) { item[i].selected = true; break; }
        		}
            }else{
                for (i = 0; i < item.length; i++) {
        			if(tu_GetURLFriendly(item[i].value).search(value) != -1) { item[i].selected = true; break; }
        		}
            }
        };
//--
//++ Configure inputFields like moneyField
    cuppa.moneyField = function(field){
        var items = jQuery(field).get();        
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            var maskName = "mask_"+item.id+i;
            jQuery("."+maskName).remove();
            var mask_field = jQuery(item).clone().get(0);
                mask_field.item = item;
                jQuery(mask_field).removeAttr("name").removeAttr("id").removeAttr("class");
                jQuery(mask_field).addClass(maskName);
                jQuery(mask_field).insertBefore(item);
                jQuery(mask_field).attr("type", "text");
                jQuery(mask_field).val( cuppa.numberToMoney( jQuery(item).val() ) );
            jQuery(item).attr("type", "hidden").css("visibility", "hidden");
            function updateValue(e, mask_field){
                if(e) mask_field = this;
                var valuePoint = jQuery(mask_field).val().split(".");
                var value = cuppa.moneyToNumber( jQuery(mask_field).val() );
                if(valuePoint.length > 1 && valuePoint[ valuePoint.length-1 ] == "" ){ 
                    jQuery(mask_field.item).val( value ); return;
                }else if( valuePoint.length > 1 && parseFloat(valuePoint[ valuePoint.length-1 ]) == 0 ){
                    jQuery(mask_field.item).val( value ); return;
                }
                jQuery(mask_field.item).val( value ).trigger("change");
                jQuery(mask_field).val( cuppa.numberToMoney(value) );
            }; jQuery(mask_field).bind("change", updateValue).bind("input", updateValue); updateValue(null, mask_field);            
        }
    }
//--
//++ CheckBox 
    cuppa.checkbox = {};
    // Select, Unselect CheckBoxes
    	cuppa.checkbox.selectAll = function(value, items) {
    		if(!items) items = "input[type='checkbox']";
            if(value !== true && value !== false ){
                value = jQuery(value).prop("checked");
            }
            if(value) jQuery("body " + items).prop("checked", true);
            else jQuery("body " + items).prop("checked", false);
    	};
    // Get Selected Items
        cuppa.checkbox.getSelectedItems = function(items, return_only_values){
    		selectedItems = Array();
    		if(!items) items = ".id";
    		var elements = jQuery("body").find(items);
    		for(var i = 0; i < elements.length; i++){
    			if(elements[i].checked){
    			    if(return_only_values){ 
    			         selectedItems.push(jQuery(elements[i]).val());                         
                    }else{
                        selectedItems.push(elements[i]);
                    }
    			};
    		}
    		if(selectedItems.length == 0) return null;
    		return selectedItems;
    	}
     // Toogle Checked Items
        cuppa.checkbox.selectAllToggle = function(item, items_name){
            cuppa.checkbox.selectAll(jQuery(item).prop('checked'), items_name);
        };
//--
/* Dropdown
    opt.mouse_action: click, mouseenter
    opt.ajustX = "center"
    opt.ajustY = "bottom"
*/    
    cuppa.dropdown = function(element, button_element, opt){
        if(!opt) opt = {}
        if(!opt.mouse_action_open) opt.mouse_action_open = "click";
        if(!opt.mouse_action_close) opt.mouse_action_close = "click";
        jQuery(element).css({display:"none", opacity:0});
        jQuery(button_element).bind(opt.mouse_action_open, openDropdown);
        function openDropdown(){
            if(opt.alignX || opt.alignY){
                var dim_button = cuppa.dimentions(button_element);
                var dim_element = cuppa.dimentions(element);
                if(opt.alignX == "center"){
                    $(element).css("right", "auto");
                    $(element).css("position","fixed");
                    $(element).css("left", dim_button.x - (dim_element.width-dim_button.width)*0.5);
                }
                if(opt.alignY == "top"){
                    $(element).css("bottom", "auto");
                    $(element).css("position","fixed");
                    $(element).css("top", dim_button.y3 + dim_button.height);
                }
            }
            jQuery(button_element).addClass("dropDownOpen");
            jQuery(element).addClass("dropDownOpen");
            TweenMax.to(element, 0.2, {alpha:1, display:"block"});
            jQuery(window).unbind(opt.mouse_action_close, closeDropDown);
            TweenMax.delayedCall(0.1, function(){
                jQuery(window).bind(opt.mouse_action_close, closeDropDown);
            });
            jQuery(window).unbind("scroll", closeDropDown).bind("scroll", closeDropDown);
        }
        function closeDropDown(){
            jQuery(button_element).removeClass("dropDownOpen");
            jQuery(window).unbind(opt.mouse_action_close, closeDropDown);
            jQuery(window).unbind("scroll", closeDropDown);
            TweenMax.killTweensOf(element);
            TweenMax.to(element, 0.2, {alpha:0, display:"none"});
        }
                
    }
//++ Styles
    /* Input Style */
        cuppa.inputStyle = function(field){
            var fields = jQuery(field).get();
            for(var i = 0; i < fields.length; i++){
                if(jQuery(fields[i]).attr("type") == undefined || jQuery(fields[i]).attr("type") == "text" ){
                    var item = '<div class="input_cuppa">';
                            item+= '<div class="input_cuppa_wrapper">';
                                item+= '<div class="input_cuppa_left"></div>'
                                item+= '<div class="input_cuppa_right">&nbsp;</div>';
                            item+= '</div>';
                        item+= '</div>';
                    item = jQuery(item);
                    if(jQuery(fields[i]).attr("id")) jQuery(item).attr("id", "cuppa_"+jQuery(fields[i]).attr("id") );
                    jQuery(item).width( jQuery(fields[i]).width() );
                    jQuery(item).height( jQuery(fields[i]).height() );
                    jQuery(item).find(".input_cuppa_text").html( jQuery(fields[i]).find("option:selected").text() )
                    jQuery(fields[i]).before(item);
                    jQuery(item).append(fields[i]);
                    jQuery(fields[i]).bind("change", function(e){ jQuery(this).parent().find(".input_cuppa_text").html( jQuery(this).find("option:selected").text()  ) })
                }
            }
        };
    /* Checkbox Style */
        cuppa.checkboxStyle = function(field){
            var fields = jQuery(field).get();
            for(var i = 0; i < fields.length; i++){
                if(jQuery(fields[i]).attr("type") == "checkbox" ){
                    var item = '<div class="checkbox_cuppa">';
                            item += '<input type="hidden"  />';
                        item += '</div>';
                    item = jQuery(item);
                    if(jQuery(fields[i]).attr("id")) jQuery(item).attr("id", "cuppa_"+jQuery(fields[i]).attr("id") );
                    jQuery(fields[i]).before(item);
                    jQuery(item).find("input").attr("id", jQuery(fields[i]).attr("id") );
                    jQuery(item).find("input").attr("class", jQuery(fields[i]).attr("class") );
                    jQuery(item).find("input").attr("name", jQuery(fields[i]).attr("name") );
                    if(jQuery(fields[i]).attr("name")) jQuery(item).addClass("cuppa_"+jQuery(fields[i]).attr("name"));
                    
                    if(jQuery(fields[i]).is(":checked")){ 
                        jQuery(item).find("input").val(1);
                        jQuery(item).addClass("checkbox_cuppa_checked");
                    }
                    jQuery(fields[i]).remove();
                    jQuery(item).bind("click", function(e){
                        jQuery(this).removeClass("error");
                        if(jQuery(this).find("input").val() == "1"){
                            jQuery(this).find("input").val(0);
                            jQuery(this).removeClass("checkbox_cuppa_checked");
                        }else{
                            jQuery(this).find("input").val(1);
                            jQuery(this).addClass("checkbox_cuppa_checked");
                        }
                    });
                    
                }
            }
        };
    /* Radio Style */
        cuppa.radioStyle = function(field){
             var fields = jQuery(field).get();
            for(var i = 0; i < fields.length; i++){
                if(jQuery(fields[i]).attr("type") == "radio" ){
                    var item = '<div class="radio_cuppa">';
                        item += '</div>';
                        item = jQuery(item);
                    item = jQuery(item);
                    if(jQuery(fields[i]).attr("id")) jQuery(item).attr("id", "cuppa_"+jQuery(fields[i]).attr("id") );
                    jQuery(item).attr("group",jQuery(fields[i]).attr("name") );
                    if(jQuery(fields[i]).attr("name")) jQuery(item).addClass("cuppa_"+jQuery(fields[i]).attr("name"));
                    jQuery(fields[i]).before(item).css("opacity",0);
                    if(jQuery(fields[i]).is(":checked")){ 
                        jQuery(item).addClass("radio_cuppa_checked");
                    }
                    jQuery(item).append(fields[i]);
                    jQuery(item).bind("click", function(e){
                        jQuery("*[group="+jQuery(this).attr("group")+"]").removeClass("error").removeClass("radio_cuppa_checked");
                        jQuery(this).addClass("radio_cuppa_checked");
                        jQuery(this).find("input").prop("checked","checked");
                    });
                }
            }
        };
    /* Select Style */
        cuppa.selectStyle = function(field){
            var fields = jQuery(field).not("[size]").get();
            for(var i = 0; i < fields.length; i++){
                var parent = $(fields[i]).parent();
                if($(parent).hasClass("select_cuppa")) return;
                var item = '<div class="select_cuppa">';
                        item+= '<div class="select_cuppa_wrapper">';
                            item+= '<div class="select_cuppa_left"></div>'
                            item+= '<div class="select_cuppa_right">&nbsp;</div>';
                        item+= '</div>';
                    item+= '<div class="select_cuppa_text">Text</div>';
                    item+= '</div>';
                item = jQuery(item);
                if(jQuery(fields[i]).attr("id")) jQuery(item).attr("id", "cuppa_"+jQuery(fields[i]).attr("id") );
                if(jQuery(fields[i]).attr("name")) jQuery(item).addClass("cuppa_"+jQuery(fields[i]).attr("name") );
                if(jQuery(fields[i]).width() > 0) jQuery(item).width( jQuery(fields[i]).width() + 5 );
                if(jQuery(fields[i]).attr("width")) jQuery(item).width( jQuery(fields[i]).attr("width") );
                if(jQuery(fields[i]).attr("style")) jQuery(item).attr("style", jQuery(fields[i]).attr("style") );
                jQuery(item).find(".select_cuppa_text").html( jQuery(fields[i]).find("option:selected").text() );
                jQuery(fields[i]).before(item);
                jQuery(item).append(fields[i]);
                jQuery(fields[i]).bind("change", function(e){ if(jQuery(this).find("option:selected").text()) jQuery(this).parent().find(".select_cuppa_text").html( jQuery(this).find("option:selected").text()  ); })
                jQuery(fields[i]).css('opacity', 0);
            }
        };
//--