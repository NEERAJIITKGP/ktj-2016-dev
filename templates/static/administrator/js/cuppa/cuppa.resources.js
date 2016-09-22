/* Fullscreen toggle */
    cuppa.fullScreen = function(value) {
        if(value == undefined) value = true;
        if (value) {
            if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
            else if (document.documentElement.msRequestFullscreen) document.documentElement.msRequestFullscreen();
            else if (document.documentElement.mozRequestFullScreen) document.documentElement.mozRequestFullScreen();
            else if (document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            jQuery(document).trigger("fullscreen");
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            jQuery(document).trigger("normalscreen");
        }
    };
/* columns
    Example: new cuppa.columns('container','column elment');
    params: 
        height = parent, max, min;
        autoUpdate = true;
        desface = 0.5;
*/
    cuppa.columns = function(container, columns, params){
        if(!params) params = {};
        if(params.autoUpdate == undefined) params.autoUpdate = true;
        if(params.desface == undefined) params.desface = 0.5;
        this.params = params;
        this.params.containers = $(container).get();
        this.params.columns = "> "+columns;
        this.ajust = function(e){
            var params = this.params; if(e) params = e.data;
            for(var i = 0; i < params.containers.length; i++){
                var container = params.containers[i];
                var columns = $(container).find(params.columns);
                $(columns).css("box-sizing", "border-box");
                $(columns).css("float","left");
                var container_dim = cuppa.dimentions(container);
                var total_width = container_dim.width2 - params.desface;
                var width = 0;
                var items = jQuery(columns).filter("[width]");
                for(var j = 0; j < items.length; j++){
                    var attr_width = $(items[j]).attr("width");
                    $(items[j]).css("width", attr_width);
                    width += cuppa.dimentions(items[j]).width;
                }
                var items = jQuery(columns).not("[width]");
                for(var j = 0; j < items.length; j++){
                   $(items[j]).css("width", (total_width-width)/items.length);
                }
                //++ height                
                    if(params.height == "parent"){
                        $(columns).outerHeight( container_dim.height );
                    }else if(params.height == "max"){
                        $(columns).height("auto");
                        $(columns).outerHeight( cuppa.getCSSValues(columns, "height", "max", true) );
                                                                        
                    }else if(params.height == "min"){
                        $(columns).height("auto");
                        $(columns).outerHeight( cuppa.getCSSValues(columns, "height", "min", true) );
                    }
                //--
            }
        }
        this.ajust();
        if(params.autoUpdate) jQuery(window).unbind("resize", this.ajust).bind("resize", this.params, this.ajust);    
    }
/* Iteration, this function configure a iteration callback passing params
    elements = elements to slide
    params.callback
    params.duration = 4;
    params.index = 0; // This contain the current iteration index
    params.nextButton = reference of the element, example: '.slider .btnNext';
    params.backButton = reference of the element, example: '.slider .btnBack';
    params.points = reference of the points, example: '.slider .points .point'
    // excecute the CallBack[params]
    Example: 
    new cuppa.slider(".slider .element", {callback:Function, nextButton:'.slider .btnNext', backButton:'.slider .btnBack', points:".slider .points .point"});
*/
    cuppa.slider = function(elements, params){ return cuppa.iteration(elements, params) };
    cuppa.iteration = function(elements, params){
        if(params == undefined) params = {}
        if(params.duration == undefined) params.duration = 4;
        if(params.index == undefined) params.index = 0;
        var obj = params;
            obj.elements = $(elements).get();
            obj.parent = $(elements).parent();
            obj.direction = 1;
            obj.element = obj.elements[obj.index];
            if(!obj.elements.length) return;
            obj.points = $(obj.points).get();
            obj.point = $(obj.points).get(obj.index);
            $(obj.points).removeClass("selected");
            $(obj.point).addClass("selected");
            obj.callback(obj);
            obj["function"] = function(object, index){
                object.index++;
                if(index != undefined) object.index = index;
                if( object.index  >=  object.elements.length ){ object.index = 0; }
                object.direction = 1;
                object.element = object.elements[object.index];
                object.point = $(obj.points).get(object.index);
                $(object.points).removeClass("selected");
                $(object.point).addClass("selected");
                object.callback(object);
                TweenMax.killTweensOf(object["function"]);
                object.tweenMax = new TweenMax.delayedCall(object.duration, object["function"], [object]);
            };
            if(obj.elements.length > 1) obj.tweenMax = new TweenMax.delayedCall(obj.duration, obj["function"], [obj]);
            // next back
                obj.nextBack = function(e){
                    var object = e.data[0]; var direction =  e.data[1];
                        object.index += direction;
                        object.direction = direction;
                        if(object.index < 0) object.index = object.elements.length - 1;
                        else if( object.index  >= object.elements.length ) object.index = 0;  
                        object.element = object.elements[object.index];
                        object.point = $(obj.points).get(object.index);
                        $(object.points).removeClass("selected");
                        $(object.point).addClass("selected");
                        object.callback(obj);
                    TweenMax.killTweensOf( object["function"]);
                    object.tweenMax = new TweenMax.delayedCall(object.duration, object["function"], [object]);
                }
                if(obj.elements.length > 1 && params.nextButton){ 
                    $(params.nextButton).unbind("click", obj.nextBack).bind("click", [obj, 1], obj.nextBack);
                }else{
                    $(params.nextButton).css("display", "none");
                }
                if(obj.elements.length > 1 && params.backButton){
                    $(params.backButton).unbind("click", obj.nextBack).bind("click", [obj, -1], obj.nextBack);
                }else{
                    $(params.backButton).css("display", "none");
                }
            // points
                obj.pointClick = function(e){
                    var object = e.data[0];
                    object["function"](object, $(this).index());
                }
                $(obj.points).unbind("click", obj.pointClick).bind("click", [obj], obj.pointClick);
        return obj;   
    };
// Change page, this is used by Cuppa php class
     cuppa.changePage = function(page, submit_form, limit){
		jQuery(submit_form+" #page").val(page);
        jQuery(submit_form+" #page_item_start").val(parseInt(page)*parseInt(limit));
        jQuery(submit_form).submit();
	};
/* Tooltip, add class
        Add class .tooltip and ATTR title
 */
    cuppa.tooltip = function(){
        jQuery(".tooltip").tooltip({
                tooltipClass:"tooltip_style", 
                content:function(){ return jQuery(this).attr("title") }, show:false, hide:false, track: true, 
                position:{ my:"left bottom-10", at:"left top" },
                open:function(e, ui){ 
                    jQuery(".ui-tooltip").css("z-index", cuppa.maxZIndex()+1); 
                }
            });
    };
// Configure Alias
    cuppa.alias = function(item, alias_from, invalid_alias){
        invalid_alias = invalid_alias.split(',');
        alias_from += "_field"; 
        jQuery("#"+alias_from).bind("change", onChange).bind("input", onChange);
            function onChange(){
                jQuery("#"+item).val( cuppa.urlFriendly(cuppa.trim(jQuery("#"+alias_from).val())) );
            };
            function validateAlias(){
                jQuery("#"+item).removeClass("error");
                for(var i = 0; i < invalid_alias.length; i++){
                    if(jQuery("#"+item).val() == invalid_alias[i]){
                        jQuery("#"+item).addClass("error");
                        return false;
                    }
                }
                return true;
            }; jQuery.validator.addMethod("unique_alias", validateAlias, "");
        if(!jQuery("#"+item).val()){ jQuery("#"+alias_from).trigger("change"); }
        jQuery("#"+item).addClass("unique_alias").bind("change", validateAlias).bind("input", validateAlias);
    };
/* Config range date */
    cuppa.rangeDate = function(nameFrom, nameTo){
        jQuery(nameFrom).datepicker({ 
            dateFormat: 'yy-mm-dd', numberOfMonths: 1, changeYear:true, showButtonPanel: true,
            onClose: function( selectedDate ) {
                jQuery(nameTo).datepicker( "option", "minDate", selectedDate );
            }
        });
        jQuery(nameTo).datepicker({ dateFormat: 'yy-mm-dd', numberOfMonths: 1, changeYear:true });
    }
/* Google tracking data={path:String, title:String}
    This method track on google Analytics
*/
    cuppa.googleTrack = function(data){
       var params = {}
            if(cuppa.managerURL.path){ params.page = cuppa.managerURL.path; }
            if(data){
                if(data.path) params.page = data.path;
                if(data.title) params.title = data.title;
            }
        try{ ga('send', 'pageview', params); }catch(err){ }
     };
    cuppa.googleTrakingHandler = function(e, data){
        cuppa.googleTrack(data);
    };
// Share
    cuppa.share = function(social, url, title, description, image){
        if(!url) url = window.location.href;
        if(social == "facebook"){
            var url_share = "https://www.facebook.com/sharer/sharer.php?u="+url;
            var width = 500; var height = 500;
            var left = (screen.width/2)-(width/2); var top = 50;
            window.open(url_share, '', 'width='+width+',height='+height+',top='+top+',left='+left+'');
        }else if(social == "facebook_app"){
            FB.ui({ method: 'feed', link: url, name: title, description: description, picture: image });
        }else if(social == "twitter"){
            var url_share = "http://twitter.com/home?&status=";
                if(title) url_share += title + ", ";
                url_share += url;
            var width = 500; var height = 500;
            var left = (screen.width/2)-(width/2); var top = 50;
            window.open(url_share, '', 'width='+width+',height='+height+',top='+top+',left='+left+'');
        }else if(social == "pinterest"){
            var url_share = "http://pinterest.com/pin/create/button/?";
                if(url) url_share += "&url=" + url;
                if(description) url_share += "&description=" + description;
                if(image) url_share += "&media=" + image;
            var width = 500; var height = 500;
            var left = (screen.width/2)-(width/2); var top = 50;
            window.open(url_share, '', 'width='+width+',height='+height+',top='+top+',left='+left+'');
        }else if(social == "google"){
            var url_share = "https://plus.google.com/share?";
                if(url) url_share += "&url=" + url;
            var width = 600; var height = 600;
            var left = (screen.width/2)-(width/2); var top = 50;
            window.open(url_share, '', 'width='+width+',height='+height+',top='+top+',left='+left+'');
        }else if(social == "linkedin" || social == "linkedIn" ){
            var url_share = "https://www.linkedin.com/shareArticle?mini=true";
                if(url) url_share += "&url=" + url;
                if(title) url_share += "&title=" + title;
                if(description) url_share += "&summary=" + description;
                var width = 600; var height = 500;
                var left = (screen.width/2)-(width/2); var top = 50;
                window.open(url_share, '', 'width='+width+',height='+height+',top='+top+',left='+left+'');
        }
    };
// Shake
    cuppa.shake = function(element){
        TweenMax.to(element, 0.1, {left:10});
        TweenMax.to(element, 0.1, {delay:0.1, left:-10});
        TweenMax.to(element, 0.1, {delay:0.2, left:0});
    }
// Button, change background color, text color
    cuppa.button = function(element, bg_color1, bg_color2, text_color1, text_color2, border_color1, border_color2 ){
        if(!bg_color1) bg_color1 = "#0DB3C7";
        if(!bg_color2) bg_color2 = "#097682";
        TweenMax.to(element, 0, { backgroundColor:bg_color1 });
        jQuery(element).bind("mouseenter", function(){ TweenMax.to(this, 0.3, { backgroundColor:bg_color2, ease:Cubic.easeInOut } ) } );
        jQuery(element).bind("mouseleave", function(){ TweenMax.to(this, 0.2, { backgroundColor:bg_color1, ease:Cubic.easeInOut } ) } );
        if(text_color1 && text_color2){
            TweenMax.to(element, 0, { color:text_color1 });
            jQuery(element).bind("mouseenter", function(){ TweenMax.to(this, 0.3, { color:text_color2, ease:Cubic.easeInOut } ) } );
            jQuery(element).bind("mouseleave", function(){ TweenMax.to(this, 0.2, { color:text_color1, ease:Cubic.easeInOut } ) } );
        }
        if(border_color1 && border_color2){
            TweenMax.to(element, 0, { borderColor:border_color1 });
            jQuery(element).bind("mouseenter", function(){ TweenMax.to(this, 0.3, { borderColor:border_color2, ease:Cubic.easeInOut } ) } );
            jQuery(element).bind("mouseleave", function(){ TweenMax.to(this, 0.2, { borderColor:border_color1, ease:Cubic.easeInOut } ) } );
        }
    };
// Button BackgroundMove, move the background image
    cuppa.buttonBackgroundMove = function(element, state1, state2){
        if(state1 == undefined) state1 = "center top"
        if(state2 == undefined) state1 = "center bottom"
        TweenMax.to(element, 0, { backgroundPosition:state1 });
        jQuery(element).bind("mouseenter", function(){ TweenMax.to(this, 0.2, { backgroundPosition:state2 } ) } );
        jQuery(element).bind("mouseleave", function(){ TweenMax.to(this, 0.2, { backgroundPosition:state1 } ) } );
    };
/* Button divs change, this acept a array with many divs, and change the state of all these
    element = {element:".element", duration1:0.3, duration2:0.2, state1:{ }, state2:{ } }
    inner_element = [   {element:".element", duration1:0.3, duration2:0.2, state1:{ }, state2:{ } },
                        {element:".element", duration1:0.3, duration2:0.2, state1:{ }, state2:{ } },
                        {element:".element", duration1:0.3, duration2:0.2, state1:{ }, state2:{ } }
                    ]
*/
    cuppa.buttonChangeDivsState = function(principal_element, inner_elements){
        if(principal_element.duration1 == undefined) principal_element.duration1 = 0.3;
        if(principal_element.duration2 == undefined) principal_element.duration2 = 0.2;
        if(principal_element.state1 == undefined) principal_element.state1 = {}
        if(principal_element.state2 == undefined) principal_element.state2 = {}
        if(principal_element.state1.ease == undefined) principal_element.state1.ease = Cubic.easeInOut;
        if(principal_element.state2.ease == undefined) principal_element.state2.ease = Cubic.easeInOut;
        TweenMax.to(principal_element.element, 0, principal_element.state1);
        
        if(inner_elements == undefined) inner_elements = [];
        for(i = 0; i < inner_elements.length; i++){
            var element = inner_elements[i];
            if(element.duration1 == undefined) element.duration1 = 0.3;
            if(element.duration2 == undefined) element.duration2 = 0.2;
            if(element.state1 == undefined) element.state1 = {}
            if(element.state2 == undefined) element.state2 = {}
            if(element.state1.ease == undefined) element.state1.ease = Cubic.easeInOut;
            if(element.state2.ease == undefined) element.state2.ease = Cubic.easeInOut;
            TweenMax.to(jQuery(this).find(element.element), 0, element.state1);
        }
        jQuery(principal_element.element).bind("mouseenter", function(){ 
            TweenMax.to(this, principal_element.duration1, principal_element.state2 )
            for(i = 0; i < inner_elements.length; i++){
                var element = inner_elements[i];
                TweenMax.to(jQuery(this).find(element.element), element.duration1, element.state2);
            }
        } );
        jQuery(principal_element.element).bind("mouseleave", function(){ 
            TweenMax.to(this, principal_element.duration2, principal_element.state1 ) 
            for(i = 0; i < inner_elements.length; i++){
                var element = inner_elements[i];
                TweenMax.to(jQuery(this).find(element.element), element.duration2, element.state1);
            }
        } );
    };
/*  Button 3D, effect 3d cube between 2 elements 
        Orientation: horizontal, vertical
*/
    cuppa.button3D = function(element, element_state1, element_state2, duration, orientation){
        if(!orientation) orientation = "horizontal";
        if(duration == undefined) duration = 0.2;
        if(orientation == "horizontal"){
            TweenMax.to(jQuery(element).find(element_state1), 0, {rotationY:0, transformPerspective:600, transformOrigin:"right center" } );
            TweenMax.to(jQuery(element).find(element_state2), 0, {rotationY:90, transformPerspective:600, transformOrigin:"left center" } );
            jQuery(element).bind("mouseenter", function(){
                if(jQuery(this).hasClass("selected")) return;
                var element1 = jQuery(this).find(element_state1);
                var element2 = jQuery(this).find(element_state2);
                TweenMax.to(element1, duration, {rotationY:-90, x:-jQuery(element1).width(),  ease:Cubic.easeInOut } )
                TweenMax.to(element2, duration, {rotationY:0, x:-jQuery(element2).width(), ease:Cubic.easeInOut } )
            });
            jQuery(element).bind("mouseleave", function(){
                var element1 = jQuery(this).find(element_state1);
                var element2 = jQuery(this).find(element_state2);
                TweenMax.to(element1, duration, {rotationY:0, x:0,  ease:Cubic.easeInOut } )
                TweenMax.to(element2, duration, {rotationY:90, x:0, ease:Cubic.easeInOut } )
            });
        }else{
            TweenMax.to(jQuery(element).find(element_state1), 0, {rotationX:0, transformPerspective:600, transformOrigin:"center bottom" } );
            TweenMax.to(jQuery(element).find(element_state2), 0, {rotationX:-90, transformPerspective:600, transformOrigin:"top center" } );
            
            jQuery(element).bind("mouseenter", function(){
                if(jQuery(this).hasClass("selected")) return;
                var element1 = jQuery(this).find(element_state1);
                var element2 = jQuery(this).find(element_state2);
                TweenMax.to(element1, duration, {rotationX:90, y:-jQuery(element1).height(),  ease:Cubic.easeInOut } )
                TweenMax.to(element2, duration, {rotationX:0, y:-jQuery(element2).height(), ease:Cubic.easeInOut } )
            });
            jQuery(element).bind("mouseleave", function(){
                var element1 = jQuery(this).find(element_state1);
                var element2 = jQuery(this).find(element_state2);
                TweenMax.to(element1, duration, {rotationX:0, y:0,  ease:Cubic.easeInOut } )
                TweenMax.to(element2, duration, {rotationX:-90, y:0, ease:Cubic.easeInOut } )
            });
        }
    };
// Initial text on inputText inside  
    (function($){
        $.fn.extend({
            preTextCuppa:function(value){
                if(value == undefined) return;   
                return this.each(function(){
                    if(!cuppa.trim($(this).val()) || $(this).val() == value ) $(this).addClass("preText").val(value);
                    $(this).focus(function(){
                        if(value == $(this).val()) $(this).removeClass("preText").val("");
                    })
                    $(this).blur(function(){
                        if( cuppa.trim($(this).val()) == '') $(this).addClass("preText").val(value);
                    });
                });
            }
        });
    })(jQuery);
/*  Limit the input text to some value, Version - 1.3.0
 *  Website - http://www.thimbleopensource.com/tutorials-snippets/jquery-plugin-filter-text-input
 *  Example:    $('#text_input').filter_input_cuppa({regex:'[a-z]'}); 
 *              $('#text_input').filter_input_cuppa({regex:'[A-Z0-9]'});
 *              $('#text_input').filter_input_cuppa({regex:'[A-Z0-9@_*]'});
 */
    (function($){    
        $.fn.extend({   
            filter_input_cuppa: function(options) {  
                  var defaults = {  
                      regex:".",
                      negkey: false, // use "-" if you want to allow minus sign at the beginning of the string
                      live:false,
                      events:'keypress paste'
                  }  
                  var options =  $.extend(defaults, options);  
                  function filter_input_function(event) {
                    var input = (event.input) ? event.input : $(this);
                    if (event.ctrlKey || event.altKey) return;
                    if (event.type=='keypress') {
                      var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                      // 8 = backspace, 9 = tab, 13 = enter, 35 = end, 36 = home, 37 = left, 39 = right, 46 = delete
                      if (key == 8 || key == 9 || key == 13 || key == 35 || key == 36|| key == 37 || key == 39 || key == 46) {
                        // if charCode = key & keyCode = 0
                        // 35 = #, 36 = $, 37 = %, 39 = ', 46 = .
                        if (event.charCode == 0 && event.keyCode == key) {
                          return true;                                             
                        }
                      }
                      var string = String.fromCharCode(key);
                      // if they pressed the defined negative key
                      if (options.negkey && string == options.negkey) {
                        // if there is already one at the beginning, remove it
                        if (input.val().substr(0, 1) == string) {
                          input.val(input.val().substring(1, input.val().length)).change();
                        } else {
                          // it isn't there so add it to the beginning of the string
                          input.val(string + input.val()).change();
                        }
                        return false;
                      }
                      var regex = new RegExp(options.regex);
                    } else if (event.type=='paste') {
                      input.data('value_before_paste', event.target.value);
                      setTimeout(function(){
                        filter_input_function({type:'after_paste', input:input});
                      }, 1);
                      return true;
                    } else if (event.type=='after_paste') {
                      var string = input.val();
                      var regex = new RegExp('^('+options.regex+')+$');
                    } else {
                      return false;
                    }
        
                    if (regex.test(string)) {
                      return true;
                    } else if (typeof(options.feedback) == 'function') {
                      options.feedback.call(this, string);
                    }
                    if (event.type=='after_paste') input.val(input.data('value_before_paste'));
                    return false;
                  }
                  var jquery_version = $.fn.jquery.split('.');
                  if (options.live) {
                    if (parseInt(jquery_version[0]) >= 1 && parseInt(jquery_version[1]) >= 7) {
                      $(this).on(options.events, filter_input_function); 
                    } else {
                      $(this).live(options.events, filter_input_function); 
                    }
                  } else {
                    return this.each(function() {  
                      var input = $(this);
                      if (parseInt(jquery_version[0]) >= 1 && parseInt(jquery_version[1]) >= 7) {
                        input.off(options.events).on(options.events, filter_input_function);
                      } else {
                        input.unbind(options.events).bind(options.events, filter_input_function);
                      }
                    });  
                  }
            }  
        });  
    })(jQuery);

/* Upload file
    Require jquery_file_upload
    <link href="js/jquery_file_upload/css/jquery_file_upload.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery_file_upload/vendor/jquery.ui.widget.js"></script>
    <script src="js/jquery_file_upload/jquery.iframe-transport.js"></script>
    <script src="js/jquery_file_upload/jquery.fileupload.js"></script>
    
    Example: cuppa.fileUpload('.input_field');
    Example: cuppa.fileUpload(".input_field", "media/folder", "administrator/js/jquery_file_upload/server/php/", true, 600, 600);
            
*/
    cuppa.fileUpload = function(name, folder, php_path, unique_name, resize_width, resize_height, crop){
        jQuery(function () {
            if(!php_path) php_path = 'js/jquery_file_upload/server/php/';
            if(!folder) folder = "media/upload_files";
            var items = jQuery(name).get();
            for(var i = 0; i < items.length; i++){
                var item = items[i];
                //++ Create File Type
                    var uniqueName = "file_"+new Date().getTime();
                    var btn_tmp = '<div class="button_upload">';
                            btn_tmp += '<span class="text_button">Select file</span>';
                            btn_tmp += '<div class="progress_bar"></div>';
                            btn_tmp += '<input class="file_type" type="file" />';
                        btn_tmp += '</div>';
                    var file = jQuery(btn_tmp);
                    var info = jQuery(".assets .info_upload").clone();
                    jQuery(item).after(file);
                    jQuery(item).trigger("created");
                //--
                //++ Config
                    var params = {}
                        params.jqXHR;
                        params.item_reference = item;
                        params.file_reference = file;
                        params.file_input = jQuery(file).find(".file_type").get(0);
                        params.url = php_path;
                        params.formData = {path:folder, unique_name:unique_name, resize_width:resize_width, resize_height:resize_height, crop:crop};
                        params.dataType = 'json';
                        params.dropZone = file;
                        params.add = function (e, data) {
                            var options = jQuery(this).data().blueimpFileupload.options;
                                options.jqXHR = data.submit()
                        },
                        params.send = function(e,  data){
                            var name = data.files[0].name;
                            var options = jQuery(this).data().blueimpFileupload.options;
                                options.file_name = name;
                            jQuery(options.item_reference).val("")
                            jQuery(options.file_reference).find(".progress_bar").width(0);
                            jQuery(options.file_reference).removeClass("info_upload_error");  
                            jQuery(options.item_reference).removeClass("error");    
                            jQuery(options.item_reference).removeAttr("placeholder");            
                            jQuery(options.item_reference).trigger("send", options);
                            jQuery(options.item_reference).trigger("init", options);
                        }
                        params.progressall = function(e, data){
                            var options = jQuery(this).data().blueimpFileupload.options;
                            var progress = Math.round((data.loaded / data.total)*100);
                            jQuery(options.file_reference).find(".progress_bar").width(progress+"%");
                            jQuery(options.item_reference).trigger("progress", [{options:options, progress:progress}]);
                        }
                        params.done = function(e,data){
                            var options = jQuery(this).data().blueimpFileupload.options;
                            if(data.result.files[0].error){
                                var error = data.result.files[0].error;
                                jQuery(options.file_reference).find(".progress_bar").width(0);
                                jQuery(options.file_reference).addClass("info_upload_error");
                                jQuery(options.item_reference).addClass("error"); 
                                jQuery(options.item_reference).attr("placeholder", data.result.files[0].error);
                            }else{
                                jQuery(options.file_reference).find(".progress_bar").width("100%");
                                var url = folder+"/"+data.result.files[0].name;
                                jQuery(options.item_reference).val(url);
                                jQuery(options.item_reference).trigger("change", options);
                                jQuery(options.item_reference).trigger("complete", options);
                            }
                        }
                        params.fail = function(e,data){
                            var options = jQuery(this).data().blueimpFileupload.options;
                            jQuery(options.info_reference).find(".progress").css("display", "none");
                            jQuery(options.info_reference).find(".message").css("display","block").html("Server error, show console message");
                            jQuery(options.info_reference).addClass("info_upload_error");
                            try{ console.log(data.messages); }catch(err){}
                        }
                    jQuery(jQuery(file).find(".file_type")).fileupload(params);
                //--
            }
        });
    };
/* Tiny MCE
    name: textArea ID
*/
    cuppa.tinyMCE = function(name, width, height, styles_path, document_base_url, template_list, folder_path){
        var textArea = jQuery(name).get(0); 
        var config = {}
            config.folder_path = folder_path;
            config.document_base_url = document_base_url;
            config.elements = jQuery(textArea).attr("name");
			config.mode = "exact";
			config.theme = "advanced";
            config.schema = "html5";            
            config.paste_text_sticky = true;
            config.paste_text_sticky_default = true;
			config.width = parseInt(width) + 11;
			config.height = height;
            config.plugins = "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,visualblocks, imgmap,imgupload,richeditor";            
            config.theme_advanced_buttons1 = "newdocument,undo,redo,search,replace,|,pastetext,pasteword,visualblocks,selectall,removeformat,|,richeditor,fullscreen,preview,|,template,attribs,styleprops,spellchecker,iespell,styleselect,|,sub,sup,charmap,|,help";
			config.theme_advanced_buttons2 = "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,fontsizeselect,fontselect,forecolor,backcolor,|,bullist,numlist,|,outdent,indent";
			config.theme_advanced_buttons3 = "tablecontrols,|,hr,visualaid,|,insertlayer,moveforward,movebackward,absolute,|,link,unlink,anchor,imgupload,image,imgmap,imagemap";
			config.theme_advanced_toolbar_location = "top";
			config.theme_advanced_toolbar_align = "left";
			config.theme_advanced_statusbar_location = "bottom";
			config.theme_advanced_resizing_use_cookie = false;
            config.theme_advanced_resizing = true;
            config.content_css = styles_path;
            config.theme_advanced_font_sizes = "";
            config.theme_advanced_fonts = "Arial,Verdana,sans-serif,Bryant-Bold,Bryant-Medium,merriweather_bold_italic,merriweather_italic";
            config.font_size_style_values = "";         
            for(var i = 6; i <= 100; i++){ 
                if(i > 6 ){
                    config.theme_advanced_font_sizes += ",";
                    config.font_size_style_values += ",";
                }
                config.theme_advanced_font_sizes += i+"px";
                config.font_size_style_values += i+"px";
            }
            config.object_resizing = true;                       
            config.selector = "p";
            config.force_br_newlines = false;
            config.force_p_newlines = true;
            config.forced_root_block = '';
            config.theme_advanced_source_editor_wrap = false;
			config.verify_html = false;
            config.convert_urls = false;
            config.gecko_spellcheck = true;
            config.inline_styles = true;
            config.valid_elements = "*[*]";
            config.valid_children = "+body[style]";                        
            config.dialog_type = "window";
            config.template_external_list_url = template_list;
            config.file_browser_callback = "cuppa.fileManagerCallBack";
            config.visualblocks_default_state = true;
            config.oninit = function (e) { try{ tinyMCE.activeEditor.controlManager.setActive('spellchecker', true); tinymce.execCommand('mceSpellCheck', true); }catch(err){} };
            config.theme_advanced_link_targets = "lightbox=lightbox;iframe=iframe;youtube=youtube";
            config.setup = function(editor) {
                editor.onChange.add(function(editor) {
                    var content = editor.getContent();
                        content = cuppa.replace(content, '<br data-mce-bogus="1">', "");
                        jQuery("textarea#"+editor.id).val(content);
                });
                editor.onEnd = function(){
                    cuppa.removeEventListener("#"+editor.id, editor.onEnd);
                    jQuery(".mceListBoxMenu").remove();
                }; cuppa.addRemoveListener("#"+editor.id, editor.onEnd);
            };
            tinyMCE.init(config);
            textArea.tiny_config = config;
	};
    cuppa.tinyMCEUpdate = function(){
        var editors  = tinyMCE.editors;
        for(var i = 0; i < editors.length; i++){
            try{ editors[i].onChange.listeners[0].cb(editors[i]); }catch(err){}
        }
    }
    //++ TinyMCE Filemanager CallBack
        cuppa.fileManagerCallBack = function(field_name, url, type, win) {
            var url = tinyMCE.documentBaseURL + "js/filemanager/dialog.php?type=2&popup=1&field_id="+field_name;
            tinyMCE.activeEditor.windowManager.open({
                file : url,
                width : 1000,
                height : 600,
                resizable : "yes",
                inline : "yes",
                close_previous : "no",
                popup_css : false
            }, {window : win });
            return false;
        };
    //--
// Ace editor
    cuppa.aceEditor = function(element, width, height, mode){
        if(width == undefined) width = 800;
        if(height == undefined) height = 300;
        if(mode == undefined) mode = "html";
        var textArea = jQuery(element).get(0);
        jQuery(textArea).css("display","none"); 
        var div = jQuery("<div></div>");
            jQuery(div).css({width:width,height:height,border:"1px solid #C6C6C6", overflow:"hidden"});
            jQuery(div).attr("id", cuppa.unique());
        jQuery(textArea).after(div);
        ace.require("ace/ext/language_tools");
        var editor = ace.edit( jQuery(div).attr("id") );
            editor.getSession().setMode("ace/mode/"+mode);
            editor.setOptions({enableBasicAutocompletion: true, enableSnippets: true, enableLiveAutocompletion: true});
            editor.getSession().setUseWorker(false);
            editor.setTheme("ace/theme/twilight");
            editor.addEventListener('change', function(e){
                jQuery(textArea).val( editor.getSession().getValue() ); 
            });
        editor.getSession().setValue( jQuery(textArea).val() );
    }
// JSON Editor
    cuppa.jsonEditor = function(name, base64_encode){ 
         jQuery(function(){
            var textArea = jQuery(name).get(0); 
            var div = jQuery("<div></div>");
                div.attr("id", name.replace("#","").replace(".","")+"_json");
                div.width(jQuery(textArea).width()).height(jQuery(textArea).height());
                jQuery(textArea).before(div);
                jQuery(textArea).css("display", "none")
            var options = {};
                options.name =  name.replace("#","").replace(".","");
                options.base64_encode = base64_encode;
                options.div_reference = div;
                options.text_area = textArea;
                options.search = false;
                options.history = true;
                options.mode = 'tree';
                options.modes = ['form', 'text', 'tree', 'view'];
                options.change = function(){
                    var editor = cuppa.getData(this.text_area, "editor");
                    if(this.base64_encode == "1")  jQuery(this.text_area).val( cuppa.jsonEncode(editor.get(), true) );
                    else jQuery(this.text_area).val( cuppa.jsonEncode(editor.get(), false)  );
                };
           var json = cuppa.jsonDecode(jQuery(textArea).val(), false);
           if(base64_encode == "1") json = cuppa.jsonDecode(jQuery(textArea).val(), true); 
           var editor = new jsoneditor.JSONEditor(div[0], options, json );
           cuppa.setData(options.text_area, "editor", editor);
        });     
    };
/**
 * Browser properties:
    -fullName (Opera, Google Chrome, Mozilla Firefox...)
    -name (opera, chrome, firefox...)
    -code (op, ch, ff...)
    -fullVersion (5.0.3.12...)
    -version (5)
    -mobile (true, false)
    -platform (windows 7, Linux, Machintosh...)
    @author Rbrt
    @version 2.1.5
    @returns Browser object
    Example: var browser_data = new cuppa.browserData();
                 browser_data.name;
 */
    cuppa.browserData = function(){	
        // ---- public properties -----
        this.fullName = 'unknown'; // getName(false);
        this.name = 'unknown'; // getName(true);
        this.code = 'unknown'; // getCodeName(this.name);
        this.fullVersion = 'unknown'; // getVersion(this.name);
        this.version = 'unknown'; // getBasicVersion(this.fullVersion);
        this.mobile = false; // isMobile(navigator.userAgent);
        this.width = screen.width;
        this.height = screen.height;
        this.platform =  'unknown'; //getPlatform(navigator.userAgent);
        
        // ------- init -------    
        this.init = function() { //operative system, is an auxiliary var, for special-cases
            //the first var is the string that will be found in userAgent. the Second var is the common name
            // IMPORTANT NOTE: define new navigators BEFORE firefox, chrome and safari
            var navs = [
                { name:'Opera Mobi', fullName:'Opera Mobile', pre:'Version/' },
                { name:'Opera Mini', fullName:'Opera Mini', pre:'Version/' },
                { name:'Opera', fullName:'Opera', pre:'Version/' },
                { name:'MSIE', fullName:'Microsoft Internet Explorer', pre:'MSIE ' },  
                { name:'BlackBerry', fullName:'BlackBerry Navigator', pre:'/' }, 
                { name:'BrowserNG', fullName:'Nokia Navigator', pre:'BrowserNG/' }, 
                { name:'Midori', fullName:'Midori', pre:'Midori/' }, 
                { name:'Kazehakase', fullName:'Kazehakase', pre:'Kazehakase/' }, 
                { name:'Chromium', fullName:'Chromium', pre:'Chromium/' }, 
                { name:'Flock', fullName:'Flock', pre:'Flock/' }, 
                { name:'Galeon', fullName:'Galeon', pre:'Galeon/' }, 
                { name:'RockMelt', fullName:'RockMelt', pre:'RockMelt/' }, 
                { name:'Fennec', fullName:'Fennec', pre:'Fennec/' }, 
                { name:'Konqueror', fullName:'Konqueror', pre:'Konqueror/' }, 
                { name:'Arora', fullName:'Arora', pre:'Arora/' }, 
                { name:'Swiftfox', fullName:'Swiftfox', pre:'Firefox/' }, 
                { name:'Maxthon', fullName:'Maxthon', pre:'Maxthon/' },
                // { name:'', fullName:'', pre:'' } //add new broswers
                // { name:'', fullName:'', pre:'' }
                { name:'Firefox',fullName:'Mozilla Firefox', pre:'Firefox/' },
                { name:'Chrome', fullName:'Google Chrome', pre:'Chrome/' },
                { name:'Safari', fullName:'Apple Safari', pre:'Version/' }
            ];
        
            var agent = navigator.userAgent, pre;
            //set names
            for (i in navs) {
            	if (agent.indexOf(navs[i].name)>-1) {
            	    pre = navs[i].pre;
            	    this.name = navs[i].name.toLowerCase(); //the code name is always lowercase
            	    this.fullName = navs[i].fullName; 
                    if (this.name=='msie') this.name = 'iexplorer';
                    if (this.name=='opera mobi') this.name = 'opera';
                    if (this.name=='opera mini') this.name = 'opera';
                    break; //when found it, stops reading
                }
            }//for
            
          //set version
            if ((idx=agent.indexOf(pre))>-1) {
                this.fullVersion = '';
                this.version = '';
                var nDots = 0;
                var len = agent.length;
                var indexVersion = idx + pre.length;
                for (j=indexVersion; j<len; j++) {
                    var n = agent.charCodeAt(j); 
                    if ((n>=48 && n<=57) || n==46) { //looking for numbers and dots
                        if (n==46) nDots++;
                        if (nDots<2) this.version += agent.charAt(j);
                        this.fullVersion += agent.charAt(j);
                    }else j=len; //finish sub-cycle
                }//for
                this.version = parseInt(this.version);
            }
            
            // set Mobile
            var mobiles = ['mobi', 'mobile', 'mini', 'iphone', 'ipod', 'ipad', 'android', 'blackberry'];
            for (var i in mobiles) {
                if (agent.toLowerCase().indexOf(mobiles[i])>-1) this.mobile = true;
            }
            if (this.width<700 || this.height<600) this.mobile = true;
            
            // set Platform        
            var plat = navigator.platform;
            if (plat=='Win32' || plat=='Win64') this.platform = 'Windows';
            if (agent.indexOf('NT 5.1') !=-1) this.platform = 'Windows XP';        
            if (agent.indexOf('NT 6') !=-1)  this.platform = 'Windows Vista';
            if (agent.indexOf('NT 6.1') !=-1) this.platform = 'Windows 7';
            if (agent.indexOf('Mac') !=-1) this.platform = 'Macintosh';
            if (agent.indexOf('Linux') !=-1) this.platform = 'Linux';
            if (agent.indexOf('iPhone') !=-1) this.platform = 'iOS iPhone';
            if (agent.indexOf('iPod') !=-1) this.platform = 'iOS iPod';
            if (agent.indexOf('iPad') !=-1) this.platform = 'iOS iPad';
            if (agent.indexOf('Android') !=-1) this.platform = 'Android';
            
            if (this.name!='unknown') {
                this.code = this.name+'';
                if (this.name=='opera') this.code = 'op';
                if (this.name=='firefox') this.code = 'ff';
                if (this.name=='chrome') this.code = 'ch';
                if (this.name=='safari') this.code = 'sf';
                if (this.name=='iexplorer') this.code = 'ie';
                if (this.name=='maxthon') this.code = 'mx';
            }
            
            //manual filter, when is so hard to define the navigator type
            if (this.name=='safari' && (this.platform=='Linux' || this.platform=='Android')) {
                this.name = 'unknown';
                this.fullName = 'unknown';
                this.code = 'unknown';
            }
            
            if (this.name=='unknown') {
                if (agent.toLowerCase().indexOf('webkit')) this.fullName = 'unknown webkit navigator';
            }
            
        };//function
        this.init();
    }; cuppa.browser = new cuppa.browserData();

/* jquery.smoothwheel.js */
(function ($) {
    var self = this, container, running=false, currentY = 0, targetY = 0, oldY = 0, maxScrollTop= 0, minScrollTop, direction, onRenderCallback=null,
            fricton = 0.91, // higher value for slower deceleration
            vy = 0,
            stepAmt = 2.5,
            minMovement= 0.1,
            ts=0.1;
    var updateScrollTarget = function (amt) {
        targetY += amt;
        vy += (targetY - oldY) * stepAmt;
        oldY = targetY;
    }
    var render = function () {
        if (vy < -(minMovement) || vy > minMovement) {
            currentY = (currentY + vy);
            if (currentY > maxScrollTop) {
                currentY = vy = 0;
            } else if (currentY < minScrollTop) {
                vy = 0;
                currentY = minScrollTop;
            }
            container.scrollTop(-currentY);
            vy *= fricton;
            if(onRenderCallback){ onRenderCallback(); }
        }
    }
    var animateLoop = function () {
        if(! running)return;
        requestAnimFrame(animateLoop);
        render();
    }
    var onWheel = function (e) {
        e.preventDefault();
        var evt = e.originalEvent;
        
        var delta = 0;
            if(e.originalEvent.detail) delta = -1*e.originalEvent.detail;
            if(e.originalEvent.deltaY) delta = 1*e.originalEvent.deltaY/40;
            if(e.originalEvent.wheelDelta) delta = 1*e.originalEvent.wheelDelta/40;
        
        //var delta = evt.detail ? evt.detail * -1 : -1*evt.deltaY / 40;
        var dir = delta < 0 ? -1 : 1;
        if (dir != direction) { 
            vy = 0;
            direction = dir;
        }
        currentY = -container.scrollTop();
        updateScrollTarget(delta);
    }
    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                }; 
    })();
    var normalizeWheelDelta = function () {
        var distribution = [], done = null, scale = 30;
        return function (n) {
            if (n == 0) return n;
            if (done != null) return n * done;
            var abs = Math.abs(n);
            outer: do { 
                for (var i = 0; i < distribution.length; ++i) {
                    if (abs <= distribution[i]) {
                        distribution.splice(i, 0, abs);
                        break outer;
                    }
                }
                distribution.push(abs);
            } while (false);
            var factor = scale / distribution[Math.floor(distribution.length / 3)];
            if (distribution.length == 500) done = factor;
            return n * factor;
        };
    }();
    $.fn.smoothWheel = function () {
        var options = jQuery.extend({}, arguments[0]);
        return this.each(function (index, elm) {
            if(!('ontouchstart' in window)){
                container = $(this);
                container.unbind("mousewheel").bind("mousewheel", onWheel);
                container.unbind("DOMMouseScroll").bind("DOMMouseScroll", onWheel);
                targetY = oldY = container.get(0).scrollTop;
                currentY = -targetY;
                
                minScrollTop = container.get(0).clientHeight - container.get(0).scrollHeight;
                if(options.onRender){
                    onRenderCallback = options.onRender;
                }
                if(options.remove){
                    log("122","smoothWheel","remove", "");
                    running=false;
                    container.unbind("mousewheel", onWheel);
                    container.unbind("DOMMouseScroll", onWheel);
                }else if(!running){
                    running=true;
                    animateLoop();
                }
            }
        });
    };
    $.fn.smoothWheelRemove = function () {
        container = $(this);
        container.unbind("mousewheel");
        container.unbind("DOMMouseScroll");
    };
})(jQuery);
/**
 * Gibberish-AES v1.0.0 - 2013-04-15
 * A lightweight Javascript Libray for OpenSSL compatible AES CBC encryption.
 *
 * Author: Mark Percival <mark@mpercival.com>
 * Copyright: Mark Percival - http://mpercival.com 2008
 *
 * With thanks to:
 * Josh Davis - http://www.josh-davis.org/ecmaScrypt
 * Chris Veness - http://www.movable-type.co.uk/scripts/aes.html
 * Michel I. Gallant - http://www.jensign.com/
 * Jean-Luc Cooke <jlcooke@certainkey.com> 2012-07-12: added strhex + invertArr to compress G2X/G3X/G9X/GBX/GEX/SBox/SBoxInv/Rcon saving over 7KB, and added encString, decString, also made the MD5 routine more easlier compressible using yuicompressor.
 *
 * License: MIT
 *
 * Usage: GibberishAES.enc("secret", "password")
 * Outputs: AES Encrypted text encoded in Base64
 */
(function(e,r){"object"==typeof exports?module.exports=r():"function"==typeof define&&define.amd?define(r):e.GibberishAES=r()})(this,function(){"use strict";var e=14,r=8,n=!1,f=function(e){try{return unescape(encodeURIComponent(e))}catch(r){throw"Error on UTF-8 encode"}},c=function(e){try{return decodeURIComponent(escape(e))}catch(r){throw"Bad Key"}},t=function(e){var r,n,f=[];for(16>e.length&&(r=16-e.length,f=[r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r]),n=0;e.length>n;n++)f[n]=e[n];return f},a=function(e,r){var n,f,c="";if(r){if(n=e[15],n>16)throw"Decryption error: Maybe bad key";if(16===n)return"";for(f=0;16-n>f;f++)c+=String.fromCharCode(e[f])}else for(f=0;16>f;f++)c+=String.fromCharCode(e[f]);return c},o=function(e){var r,n="";for(r=0;e.length>r;r++)n+=(16>e[r]?"0":"")+e[r].toString(16);return n},d=function(e){var r=[];return e.replace(/(..)/g,function(e){r.push(parseInt(e,16))}),r},u=function(e,r){var n,c=[];for(r||(e=f(e)),n=0;e.length>n;n++)c[n]=e.charCodeAt(n);return c},i=function(n){switch(n){case 128:e=10,r=4;break;case 192:e=12,r=6;break;case 256:e=14,r=8;break;default:throw"Invalid Key Size Specified:"+n}},b=function(e){var r,n=[];for(r=0;e>r;r++)n=n.concat(Math.floor(256*Math.random()));return n},h=function(n,f){var c,t=e>=12?3:2,a=[],o=[],d=[],u=[],i=n.concat(f);for(d[0]=L(i),u=d[0],c=1;t>c;c++)d[c]=L(d[c-1].concat(i)),u=u.concat(d[c]);return a=u.slice(0,4*r),o=u.slice(4*r,4*r+16),{key:a,iv:o}},l=function(e,r,n){r=S(r);var f,c=Math.ceil(e.length/16),a=[],o=[];for(f=0;c>f;f++)a[f]=t(e.slice(16*f,16*f+16));for(0===e.length%16&&(a.push([16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16]),c++),f=0;a.length>f;f++)a[f]=0===f?x(a[f],n):x(a[f],o[f-1]),o[f]=s(a[f],r);return o},v=function(e,r,n,f){r=S(r);var t,o=e.length/16,d=[],u=[],i="";for(t=0;o>t;t++)d.push(e.slice(16*t,16*(t+1)));for(t=d.length-1;t>=0;t--)u[t]=p(d[t],r),u[t]=0===t?x(u[t],n):x(u[t],d[t-1]);for(t=0;o-1>t;t++)i+=a(u[t]);return i+=a(u[t],!0),f?i:c(i)},s=function(r,f){n=!1;var c,t=M(r,f,0);for(c=1;e+1>c;c++)t=g(t),t=y(t),e>c&&(t=k(t)),t=M(t,f,c);return t},p=function(r,f){n=!0;var c,t=M(r,f,e);for(c=e-1;c>-1;c--)t=y(t),t=g(t),t=M(t,f,c),c>0&&(t=k(t));return t},g=function(e){var r,f=n?D:B,c=[];for(r=0;16>r;r++)c[r]=f[e[r]];return c},y=function(e){var r,f=[],c=n?[0,13,10,7,4,1,14,11,8,5,2,15,12,9,6,3]:[0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11];for(r=0;16>r;r++)f[r]=e[c[r]];return f},k=function(e){var r,f=[];if(n)for(r=0;4>r;r++)f[4*r]=F[e[4*r]]^R[e[1+4*r]]^j[e[2+4*r]]^z[e[3+4*r]],f[1+4*r]=z[e[4*r]]^F[e[1+4*r]]^R[e[2+4*r]]^j[e[3+4*r]],f[2+4*r]=j[e[4*r]]^z[e[1+4*r]]^F[e[2+4*r]]^R[e[3+4*r]],f[3+4*r]=R[e[4*r]]^j[e[1+4*r]]^z[e[2+4*r]]^F[e[3+4*r]];else for(r=0;4>r;r++)f[4*r]=E[e[4*r]]^U[e[1+4*r]]^e[2+4*r]^e[3+4*r],f[1+4*r]=e[4*r]^E[e[1+4*r]]^U[e[2+4*r]]^e[3+4*r],f[2+4*r]=e[4*r]^e[1+4*r]^E[e[2+4*r]]^U[e[3+4*r]],f[3+4*r]=U[e[4*r]]^e[1+4*r]^e[2+4*r]^E[e[3+4*r]];return f},M=function(e,r,n){var f,c=[];for(f=0;16>f;f++)c[f]=e[f]^r[n][f];return c},x=function(e,r){var n,f=[];for(n=0;16>n;n++)f[n]=e[n]^r[n];return f},S=function(n){var f,c,t,a,o=[],d=[],u=[];for(f=0;r>f;f++)c=[n[4*f],n[4*f+1],n[4*f+2],n[4*f+3]],o[f]=c;for(f=r;4*(e+1)>f;f++){for(o[f]=[],t=0;4>t;t++)d[t]=o[f-1][t];for(0===f%r?(d=m(w(d)),d[0]^=K[f/r-1]):r>6&&4===f%r&&(d=m(d)),t=0;4>t;t++)o[f][t]=o[f-r][t]^d[t]}for(f=0;e+1>f;f++)for(u[f]=[],a=0;4>a;a++)u[f].push(o[4*f+a][0],o[4*f+a][1],o[4*f+a][2],o[4*f+a][3]);return u},m=function(e){for(var r=0;4>r;r++)e[r]=B[e[r]];return e},w=function(e){var r,n=e[0];for(r=0;4>r;r++)e[r]=e[r+1];return e[3]=n,e},A=function(e,r){var n,f=[];for(n=0;e.length>n;n+=r)f[n/r]=parseInt(e.substr(n,r),16);return f},C=function(e){var r,n=[];for(r=0;e.length>r;r++)n[e[r]]=r;return n},I=function(e,r){var n,f;for(f=0,n=0;8>n;n++)f=1===(1&r)?f^e:f,e=e>127?283^e<<1:e<<1,r>>>=1;return f},O=function(e){var r,n=[];for(r=0;256>r;r++)n[r]=I(e,r);return n},B=A("637c777bf26b6fc53001672bfed7ab76ca82c97dfa5947f0add4a2af9ca472c0b7fd9326363ff7cc34a5e5f171d8311504c723c31896059a071280e2eb27b27509832c1a1b6e5aa0523bd6b329e32f8453d100ed20fcb15b6acbbe394a4c58cfd0efaafb434d338545f9027f503c9fa851a3408f929d38f5bcb6da2110fff3d2cd0c13ec5f974417c4a77e3d645d197360814fdc222a908846eeb814de5e0bdbe0323a0a4906245cc2d3ac629195e479e7c8376d8dd54ea96c56f4ea657aae08ba78252e1ca6b4c6e8dd741f4bbd8b8a703eb5664803f60e613557b986c11d9ee1f8981169d98e949b1e87e9ce5528df8ca1890dbfe6426841992d0fb054bb16",2),D=C(B),K=A("01020408102040801b366cd8ab4d9a2f5ebc63c697356ad4b37dfaefc591",2),E=O(2),U=O(3),z=O(9),R=O(11),j=O(13),F=O(14),G=function(e,r,n){var f,c=b(8),t=h(u(r,n),c),a=t.key,o=t.iv,d=[[83,97,108,116,101,100,95,95].concat(c)];return e=u(e,n),f=l(e,a,o),f=d.concat(f),T.encode(f)},H=function(e,r,n){var f=T.decode(e),c=f.slice(8,16),t=h(u(r,n),c),a=t.key,o=t.iv;return f=f.slice(16,f.length),e=v(f,a,o,n)},L=function(e){function r(e,r){return e<<r|e>>>32-r}function n(e,r){var n,f,c,t,a;return c=2147483648&e,t=2147483648&r,n=1073741824&e,f=1073741824&r,a=(1073741823&e)+(1073741823&r),n&f?2147483648^a^c^t:n|f?1073741824&a?3221225472^a^c^t:1073741824^a^c^t:a^c^t}function f(e,r,n){return e&r|~e&n}function c(e,r,n){return e&n|r&~n}function t(e,r,n){return e^r^n}function a(e,r,n){return r^(e|~n)}function o(e,c,t,a,o,d,u){return e=n(e,n(n(f(c,t,a),o),u)),n(r(e,d),c)}function d(e,f,t,a,o,d,u){return e=n(e,n(n(c(f,t,a),o),u)),n(r(e,d),f)}function u(e,f,c,a,o,d,u){return e=n(e,n(n(t(f,c,a),o),u)),n(r(e,d),f)}function i(e,f,c,t,o,d,u){return e=n(e,n(n(a(f,c,t),o),u)),n(r(e,d),f)}function b(e){for(var r,n=e.length,f=n+8,c=(f-f%64)/64,t=16*(c+1),a=[],o=0,d=0;n>d;)r=(d-d%4)/4,o=8*(d%4),a[r]=a[r]|e[d]<<o,d++;return r=(d-d%4)/4,o=8*(d%4),a[r]=a[r]|128<<o,a[t-2]=n<<3,a[t-1]=n>>>29,a}function h(e){var r,n,f=[];for(n=0;3>=n;n++)r=255&e>>>8*n,f=f.concat(r);return f}var l,v,s,p,g,y,k,M,x,S=[],m=A("67452301efcdab8998badcfe10325476d76aa478e8c7b756242070dbc1bdceeef57c0faf4787c62aa8304613fd469501698098d88b44f7afffff5bb1895cd7be6b901122fd987193a679438e49b40821f61e2562c040b340265e5a51e9b6c7aad62f105d02441453d8a1e681e7d3fbc821e1cde6c33707d6f4d50d87455a14eda9e3e905fcefa3f8676f02d98d2a4c8afffa39428771f6816d9d6122fde5380ca4beea444bdecfa9f6bb4b60bebfbc70289b7ec6eaa127fad4ef308504881d05d9d4d039e6db99e51fa27cf8c4ac5665f4292244432aff97ab9423a7fc93a039655b59c38f0ccc92ffeff47d85845dd16fa87e4ffe2ce6e0a30143144e0811a1f7537e82bd3af2352ad7d2bbeb86d391",8);for(S=b(e),y=m[0],k=m[1],M=m[2],x=m[3],l=0;S.length>l;l+=16)v=y,s=k,p=M,g=x,y=o(y,k,M,x,S[l+0],7,m[4]),x=o(x,y,k,M,S[l+1],12,m[5]),M=o(M,x,y,k,S[l+2],17,m[6]),k=o(k,M,x,y,S[l+3],22,m[7]),y=o(y,k,M,x,S[l+4],7,m[8]),x=o(x,y,k,M,S[l+5],12,m[9]),M=o(M,x,y,k,S[l+6],17,m[10]),k=o(k,M,x,y,S[l+7],22,m[11]),y=o(y,k,M,x,S[l+8],7,m[12]),x=o(x,y,k,M,S[l+9],12,m[13]),M=o(M,x,y,k,S[l+10],17,m[14]),k=o(k,M,x,y,S[l+11],22,m[15]),y=o(y,k,M,x,S[l+12],7,m[16]),x=o(x,y,k,M,S[l+13],12,m[17]),M=o(M,x,y,k,S[l+14],17,m[18]),k=o(k,M,x,y,S[l+15],22,m[19]),y=d(y,k,M,x,S[l+1],5,m[20]),x=d(x,y,k,M,S[l+6],9,m[21]),M=d(M,x,y,k,S[l+11],14,m[22]),k=d(k,M,x,y,S[l+0],20,m[23]),y=d(y,k,M,x,S[l+5],5,m[24]),x=d(x,y,k,M,S[l+10],9,m[25]),M=d(M,x,y,k,S[l+15],14,m[26]),k=d(k,M,x,y,S[l+4],20,m[27]),y=d(y,k,M,x,S[l+9],5,m[28]),x=d(x,y,k,M,S[l+14],9,m[29]),M=d(M,x,y,k,S[l+3],14,m[30]),k=d(k,M,x,y,S[l+8],20,m[31]),y=d(y,k,M,x,S[l+13],5,m[32]),x=d(x,y,k,M,S[l+2],9,m[33]),M=d(M,x,y,k,S[l+7],14,m[34]),k=d(k,M,x,y,S[l+12],20,m[35]),y=u(y,k,M,x,S[l+5],4,m[36]),x=u(x,y,k,M,S[l+8],11,m[37]),M=u(M,x,y,k,S[l+11],16,m[38]),k=u(k,M,x,y,S[l+14],23,m[39]),y=u(y,k,M,x,S[l+1],4,m[40]),x=u(x,y,k,M,S[l+4],11,m[41]),M=u(M,x,y,k,S[l+7],16,m[42]),k=u(k,M,x,y,S[l+10],23,m[43]),y=u(y,k,M,x,S[l+13],4,m[44]),x=u(x,y,k,M,S[l+0],11,m[45]),M=u(M,x,y,k,S[l+3],16,m[46]),k=u(k,M,x,y,S[l+6],23,m[47]),y=u(y,k,M,x,S[l+9],4,m[48]),x=u(x,y,k,M,S[l+12],11,m[49]),M=u(M,x,y,k,S[l+15],16,m[50]),k=u(k,M,x,y,S[l+2],23,m[51]),y=i(y,k,M,x,S[l+0],6,m[52]),x=i(x,y,k,M,S[l+7],10,m[53]),M=i(M,x,y,k,S[l+14],15,m[54]),k=i(k,M,x,y,S[l+5],21,m[55]),y=i(y,k,M,x,S[l+12],6,m[56]),x=i(x,y,k,M,S[l+3],10,m[57]),M=i(M,x,y,k,S[l+10],15,m[58]),k=i(k,M,x,y,S[l+1],21,m[59]),y=i(y,k,M,x,S[l+8],6,m[60]),x=i(x,y,k,M,S[l+15],10,m[61]),M=i(M,x,y,k,S[l+6],15,m[62]),k=i(k,M,x,y,S[l+13],21,m[63]),y=i(y,k,M,x,S[l+4],6,m[64]),x=i(x,y,k,M,S[l+11],10,m[65]),M=i(M,x,y,k,S[l+2],15,m[66]),k=i(k,M,x,y,S[l+9],21,m[67]),y=n(y,v),k=n(k,s),M=n(M,p),x=n(x,g);return h(y).concat(h(k),h(M),h(x))},T=function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=e.split(""),n=function(e){var n,f,c=[],t="";for(Math.floor(16*e.length/3),n=0;16*e.length>n;n++)c.push(e[Math.floor(n/16)][n%16]);for(n=0;c.length>n;n+=3)t+=r[c[n]>>2],t+=r[(3&c[n])<<4|c[n+1]>>4],t+=void 0!==c[n+1]?r[(15&c[n+1])<<2|c[n+2]>>6]:"=",t+=void 0!==c[n+2]?r[63&c[n+2]]:"=";for(f=t.slice(0,64)+"\n",n=1;Math.ceil(t.length/64)>n;n++)f+=t.slice(64*n,64*n+64)+(Math.ceil(t.length/64)===n+1?"":"\n");return f},f=function(r){r=r.replace(/\n/g,"");var n,f=[],c=[],t=[];for(n=0;r.length>n;n+=4)c[0]=e.indexOf(r.charAt(n)),c[1]=e.indexOf(r.charAt(n+1)),c[2]=e.indexOf(r.charAt(n+2)),c[3]=e.indexOf(r.charAt(n+3)),t[0]=c[0]<<2|c[1]>>4,t[1]=(15&c[1])<<4|c[2]>>2,t[2]=(3&c[2])<<6|c[3],f.push(t[0],t[1],t[2]);return f=f.slice(0,f.length-f.length%16)};return"function"==typeof Array.indexOf&&(e=r),{encode:n,decode:f}}();return{size:i,h2a:d,expandKey:S,encryptBlock:s,decryptBlock:p,Decrypt:n,s2a:u,rawEncrypt:l,rawDecrypt:v,dec:H,openSSLKey:h,a2h:o,enc:G,Hash:{MD5:L},Base64:T}});
