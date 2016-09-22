/* maxZIndex */
    cuppa.maxZIndex = function(element, all_elements){
        if(element == undefined) element = "body";
        var childs;
        if(all_elements) childs = $("*");
        else childs = jQuery(element).children().get();
        var zIndex = 1;
        for(var i = 0; i <  childs.length; i++){
            var zIndex_temp = parseFloat(jQuery(childs[i]).css("z-index"));
            if(zIndex_temp > zIndex) zIndex = zIndex_temp;
        }
        return zIndex;
    }
/* Clone object */
    cuppa.cloneObject = function(object){
        return jQuery.extend(true, {}, object);
    }
/* Object align 
    Align the content with RELATIVE position, use it to center text content in the middle of the area.
*/
    cuppa.align = function(element, vertical, horizontal){
        if(vertical == undefined) vertical = true;
        if( jQuery(element).css("position") == "static") jQuery(element).css("position","relative");
        
        var parent = jQuery(element).parent();
        if(vertical){
            var top = (jQuery(parent).height()-jQuery(element).outerHeight())*0.5;
            if(top < 0) top = 0; 
            jQuery(element).css("top", top);
        }
        if(horizontal){
            var left = (jQuery(parent).width()-jQuery(element).outerWidth())*0.5;
            if(left < 0) left = 0; 
            jQuery(element).css("left", left);
        }
    }
/* Object align Absolute 
    Align the content with ABSOLUTE position
*/    
    cuppa.alignAbsolute = function(element, align, fixed){
        if(fixed) jQuery(element).css("position", "fixe");
        else jQuery(element).css("position", "absolute");
        var dim = cuppa.dimentions(element);
        if(align == "bottom right" || align == "right bottom"){
            TweenMax.to(element, 0 , {left:"auto", top:"auto", bottom:0, right:0})
        }else if(align == "bottom left" || align == "left bottom"){
            TweenMax.to(element, 0 , {left: 0, top:"auto", bottom:0})
        }else if(align == "bottom center" || align == "center bottom" || align == "bottom"){
            TweenMax.to(element, 0 , {top:"auto", bottom:0, left:"50%", marginLeft:-dim.width2*0.5})
        }else if(align == "top right" || align == "right top"){
            TweenMax.to(element, 0 , {left:"auto", right:0, top:0});
        }else if(align == "top left" || align == "left top"){
            TweenMax.to(element, 0 , {left:0, top:0});
        }else if(align == "top center" || align == "top bottom" || align == "top"){
            TweenMax.to(element, 0 , {top:0, left:"50%", marginLeft:-dim.width2*0.5});
        }else if(align == "left center" || align == "center left" || align == "left"){
            TweenMax.to(element, 0 , {left:0, top:"50%", marginTop:-dim.height2*0.5});
        }else if(align == "right center" || align == "center right" || align == "right"){
            TweenMax.to(element, 0 , {left:"auto", right:0, top:"50%", marginTop:-dim.height2*0.5});
        }else if(align == "center center" || align == "center"){
            TweenMax.to(element, 0 , {left:"50%", marginLeft:-dim.width2*0.5, top:"50%", marginTop:-dim.height2*0.5});
        }
    }
/* responsive Images Width
    property: width, height
 */
    cuppa.responsiveImagesWidth = function(element, property){
        if(property == undefined) property = "width";
        jQuery(element).each(onLoad);
        jQuery(window).load(function(){ jQuery(element).each(onLoad); });
        function onLoad(e){
            if(property == "width"){
                var width = parseFloat(jQuery(this).attr("width"));
                if(!width) width = jQuery(this)[0].naturalWidth;
                if(width){
                    jQuery(this).css({"width":"100%","max-width":width,"height":"auto"});
                }else{
                    jQuery(this).load(function(e){
                        var clone = jQuery(this).clone();
                            jQuery(clone).css({"position":"fixed","top":"0px","left":"0px", "visibility":"hidden"});
                        jQuery("body").append(clone);
                        width = jQuery(clone).width();
                        jQuery(clone).remove();
                        if(width) jQuery(this).css({"width":"100%","max-width":width,"height":"auto"});
                    });
                    if( jQuery(this).height() ) jQuery(this).trigger("load");
                }
            }
            else if(property == "height"){
                var height = jQuery(this)[0].naturalHeight;
                if(height){
                    jQuery(this).css({"height":"100%","max-height":height,"width":"auto"});
                }else{
                    jQuery(this).load(function(e){
                        var clone = jQuery(this).clone();
                            jQuery(clone).css({"position":"fixed","top":"0px","left":"0px", "visibility":"hidden"});
                        jQuery("body").append(clone);
                        height = jQuery(clone).height();
                        jQuery(clone).remove();
                        if(height) jQuery(this).css({"height":"100%","max-height":height,"width":"auto"});
                    });
                    if( jQuery(this).height() ) jQuery(this).trigger("load");
                }         
            }
        }
    }
/* responsive Block with defined width, height, <iframe>, <object>, <div>, etc
    property: width, height, auto
 */
    cuppa.responsiveBlock = function(element, scale, property){
        if(property == undefined) property = "width";        
        function resize(e){
            if(property == "width"){
                jQuery(element).each(function(e){
                    if(scale){
                        var width = parseFloat(jQuery(this).attr("width"));
                        if(!width) width = parseFloat(jQuery(this).css("width"));
                        var parent_width =  parseFloat(jQuery(this).parent().css("width"));
                        if(width && width > parent_width){
                            var percent = parent_width/width;
                            TweenMax.to(this, 0, {scale:percent, transformOrigin:"left top"});
                        }else{
                            TweenMax.to(this, 0, {scale:1});
                        }
                    }else{
                        var width = parseFloat(jQuery(this).attr("width"));
                        var height = parseFloat(jQuery(this).attr("height"));
                        if(!width) jQuery(this).attr("width", jQuery(this).css("width"));
                        if(!height) jQuery(this).attr("height", jQuery(this).css("height"));
                        width = parseFloat(jQuery(this).attr("width"));
                        height = parseFloat(jQuery(this).attr("height"));
                        
                        if(width && height){
                            jQuery(this).css({"width":"100%","max-width":width});
                            var percent = jQuery(this).width()/width;
                            if(percent < 1){ jQuery(this).height(height*percent); }
                        }
                    }
                });
            }
        };
        jQuery(window).resize(resize); resize();
    }
/* Canvas, requiere createjs 
    Create a canvas stage, auto updated and return the stage object
*/
    cuppa.canvas = function(reference, fps){
        if(fps == undefined) fps = 60;
        var ref = $(reference)[0];
        if(!ref) return;
        var stage = new createjs.Stage(ref);
            ref.stage = stage;
        // Update
            createjs.Ticker.setFPS(fps);
            createjs.Ticker.addEventListener("tick", autoUpdate);
            function autoUpdate(){ 
                stage.update();
            }
        //--
        return stage;
    }
/* load flash animation (createJS)
    simbolName: Personal param expecify from Flash.
    canvas: Canvas where will be inserted the animation after to load.
    callback: method that will be executed when animation is loaded.
    
    Example: cuppa.loadFlashAnimation("animation1", "#btn_social");
*/
    cuppa.loadFlashAnimation = function(simbolName, canvas, callback, play, loop){
        images = images||{};
        var canvas = $(canvas).get(0);
        if(canvas.stage) canvas = canvas.stage; 
        else canvas = cuppa.canvas($(canvas).get(0));
        if(!canvas) return null;
        if(play == undefined) play = false;
        if(loop == undefined) loop = false; 
        var simbol = eval(simbolName);
        var loader = new createjs.LoadQueue(false);
        	loader.addEventListener("fileload", handleFileLoad);
        	loader.addEventListener("complete", handleComplete);
        	loader.loadManifest(simbol.properties.manifest);
            function handleFileLoad(evt){
                loader.removeEventListener("fileload", handleFileLoad);
                if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
            }
            function handleComplete(evt){
                loader.removeEventListener("complete", handleComplete);
                var animation = new simbol[simbolName]();
                if(!play) animation.stop();
                if(!loop) animation.loop = false;
                canvas.addChild(animation);
                if(callback) callback(animation, canvas.canvas);
            }
    }
/* Tween Flash animation 
    animation: createJS Movieclip.
    frame: gotoFrame
    duration
    onEnd: Seek frame after the Tween has finished
    ease
    Example: cuppa.tweenFlashAnimation(animation, 21, 0.33);
*/
    cuppa.tweenFlashAnimation = function(animation, frame, duration, onEnd, ease){
        if(duration == undefined) duration = 1;
        if(ease == undefined) ease = Linear.easeNone;
        if(animation.tweenMaxFrames) TweenMax.killTweensOf(animation.tweenMaxFrames);
        animation.tweenMaxFrames = {frame:animation.currentFrame};
        TweenMax.to(animation.tweenMaxFrames, duration, {frame:frame, onUpdate:onUpdate, onComplete:onComplete, ease:ease});
        function onUpdate(){
            var frame = Math.round(animation.tweenMaxFrames.frame);
            animation.gotoAndStop(frame);
        }
        function onComplete(){
            if(onEnd != undefined) animation.gotoAndStop(onEnd);
        }
    }
/* Set canvas size, Change the canvas size without deform the inside elements */
    cuppa.canvasSize = function(reference, width, height){
        if(width != undefined && height != undefined){
            var ctx = jQuery(reference)[0].getContext('2d');
                ctx.canvas.width = width;
                ctx.canvas.height = height;
        }   
    }
/* Fixed BG, displace the background, creating the effect of static backgroun.
    created to fix the effect background-attachment: fixed;
*/
    cuppa.backgroundAttachment = function(element){
        cuppa.addEventListener("scroll", onScroll, window, "backgroundAttachment");
        cuppa.addEventListener("progress_content", onScroll, "body", "backgroundAttachment");
        function onScroll(){
            jQuery(element).each(function(){
                var dimentions = cuppa.dimentions(jQuery(this).parent());
                var scroll = cuppa.statusScrollPixel();
                TweenMax.to(this, 0, {y:scroll.y - dimentions.y} );
            });
        };
    }
/* Set or Get css value */
    cuppa.css = function(element, property, value){
        if(value){
            jQuery(element).css(property, value);
            return null;
        }else{
            var value = cuppa.getCSSValue(element, property);
            return value;
        }
    };
/* get CSS value list, return an array with all values in diferents elements
    return_type = (string)
                    all: (default) return array with all elements
                    max: return maximun value
                    min: return minimum value
                    sum: return sub of all values
*/
    cuppa.getCSSValues = function(elements, css, return_type, convert_to_number){
        if(return_type == undefined) return_type = "all";
        if(convert_to_number == undefined) convert_to_number = true;
        var values = [];
        for(var i = 0; i < jQuery(elements).length; i++){
            if(css == "height"){
                var dimentions = cuppa.dimentions( jQuery(elements)[i] );
                var value = dimentions.height3;
            }else if(css == "width"){
                var dimentions = cuppa.dimentions( jQuery(elements)[i] );
                var value = dimentions.width3;
            }else{
                var value = jQuery(jQuery(elements)[i]).css(css);
            }
            if(convert_to_number) value = parseFloat(value);
            values.push(value);
        }
        if(return_type == "all"){
            return values;
        }else if(return_type == "sum"){
            var sum = 0;
            for(var j=0; j < values.length; j++){ sum+=values[j]; }
            return sum;
        }else if(return_type == "max"){
            return Math.max.apply(Math, values);
        }else if(return_type == "min"){
            return Math.min.apply(Math, values);
        }
    }
    cuppa.getCSSValue = function(elements, css, convert_to_number){
        if(convert_to_number == undefined) convert_to_number = true;
        var value = $(elements).css(css);
        if(convert_to_number) value = parseFloat(value);
        return value;
    }
// Clone Element of element lists and return it
// Example: tu_NewElement('.class_of_element', 'name', 'display:block');  
    cuppa.newElement = function(element, name, display, string_return){
        if(!element) return;
        var element = jQuery(element).clone();
            if(name) element.addClass(name);
            if(display) jQuery(element).css("display", display);
        if(!string_return){ 
            return element[0];
        }else{
            var tmpNode = document.createElement("div"); 
                tmpNode.appendChild(element[0]);
            var str = tmpNode.innerHTML;
                tmpNode = null;
            return str;
        }
    };
/* Add Responsive range class */
    cuppa.responsiveClasses = new Array();
    cuppa.addResponsiveClass = function(className, minimum, maximum, order, target){
        if(!target) target = "body";
        if(order == undefined) order = 0;
        var element = {}
            element.className = className;
            element.minimum = minimum;
            element.maximum = maximum;
            element.target = target;
            element.order = order;
        cuppa.responsiveClasses.push(element);
        cuppa.shortArrayObject(cuppa.responsiveClasses, "order");
        jQuery(window).unbind("resize", cuppa.responsiveResize).bind("resize", cuppa.responsiveResize);
        cuppa.responsiveResize();
    };
        cuppa.responsiveResize = function(){
            var width = jQuery(window).width();
            for(var i = 0; i < cuppa.responsiveClasses.length; i++){
                jQuery(cuppa.responsiveClasses[i].target).removeClass(cuppa.responsiveClasses[i].className);
            }
            for(var i = 0; i < cuppa.responsiveClasses.length; i++){
                if( width >= cuppa.responsiveClasses[i].minimum && width <= cuppa.responsiveClasses[i].maximum)
                jQuery(cuppa.responsiveClasses[i].target).addClass(cuppa.responsiveClasses[i].className);
            }
        };
    cuppa.removeResponsiveClass = function(className, target){
        for(var i = 0; i < cuppa.responsiveClasses.length; i++){
             if( className == cuppa.responsiveClasses[i].className && target == cuppa.responsiveClasses[i].target){
                jQuery(cuppa.responsiveClasses[i].target).removeClass(cuppa.responsiveClasses[i].className);
                cuppa.responsiveClasses.splice(i, 1);
             }
        }
    };
/* Short Array Object ASC OR DESC */
    cuppa.shortArrayObject = function(array, column, reverse) {
        function sortBy(key, reverse) {
            return function(a, b) {
                if (a[key] < b[key]) { return -1; }
                if (a[key] > b[key]) { return 1; }
                return 0;
            };
        }
        array.sort(sortBy(column));
        if(reverse) array.reverse();
        return array;
    };
/* Short Object ASC or DESC */
    cuppa.shortObject = function(object, reverse){
        var keys = Object.keys(object);
        keys.sort();
        if(reverse) keys.reverse();
        var tmpObject = {}
            for(i = 0; i < keys.length; i++){
                tmpObject[keys[i]] = object[keys[i]];
            }
       return tmpObject;
    };
/* Asing data to element or string
        element: string or div
        name: variable name reference
        value: variable value
*/
    cuppa.dataAssigned = new Array();
    cuppa.setData = function(element, name, value){
        var current_data = cuppa.getData(element, name, true);
        if(current_data){
            current_data.value = value;
        }else{
            
            var item = {}
                item.element = element.toString();
                item.name = name;
                item.value = value;
            cuppa.dataAssigned.push(item);
        }
    };
    cuppa.getData = function(element, name, return_all_object){
        for(var i = 0; i < cuppa.dataAssigned.length; i++){
            if(cuppa.dataAssigned[i].element == element){
                if( cuppa.dataAssigned[i].name == name ){
                    if(return_all_object){
                        return cuppa.dataAssigned[i];
                    }else{
                        return cuppa.dataAssigned[i].value;
                    }
                }
            }
        }
        return null;
    };
// inLine, force to elements to inline
    cuppa.inLine = function(elements, area){
        jQuery(area).css("overflow","hidden");
        jQuery(elements).css("position","relative");
        jQuery(elements).css("float","left");
        var wrapper = jQuery("<div class='inline-wrapper'></div>");
            jQuery(wrapper).css("overflow","hidden").css("position","relative");
        jQuery(area).append(wrapper);
        jQuery(wrapper).append(jQuery(elements));
        function onSize(){
            jQuery(elements).width(jQuery(area).width()-1);
            jQuery(wrapper).width(jQuery(area).outerWidth()*jQuery(elements).length);
        }; jQuery(window).resize(onSize); onSize();
    };
//++ control the position of a object, if it is between the screen trigger true, and false if is not between aviable screen
// Dispache vars: element, showed, direction: 1 (down) or -1 (up)
// If invert = true, desface apply when hidden element
    cuppa.visualitationElementHandler = function(element, area, functionResponce, propagationPersisting, desface, invert){
        if(!area || area == "body") area = window;
        this.onScroll = function(){
            jQuery(element).each(function(){
                cuppa.visualitationElementCore(this, functionResponce, propagationPersisting, desface, invert);
            });
        }
        jQuery(element).each(function(){ this.showed = false; this.prev_position_y = 0; });
        jQuery(area).bind("scroll", this.onScroll); this.onScroll(); 
        // First validation
            jQuery(element).each(function(){
                jQuery(this)[0].showed = true;
                cuppa.visualitationElementCore(this, functionResponce, propagationPersisting, desface, invert);
            });
    };
//--
//++ Visualization element
    cuppa.visualitationElement = function(element, functionResponce, propagationPersisting, desface, invert){
        var element = $(element).get();
        for(var i =0; i < element.length; i++){
            element.showed = false; element.prev_position_y = 0;
            cuppa.visualitationElementCore(element, functionResponce, propagationPersisting, desface, invert);
            element.showed = true;
            cuppa.visualitationElementCore(element, functionResponce, propagationPersisting, desface, invert);
        }
    }
//--
//++ Visualization element core
    cuppa.visualitationElementCore = function(element, functionResponce, propagationPersisting, desface, invert){
        if(desface == undefined) desface = 0;
        desface = -1*desface;
        var dimention = cuppa.dimentions(element);
        var position_y = cuppa.statusScrollPixel(window).y + jQuery(window).height() - 1;
        if(invert){
            if(position_y > dimention.y && position_y - desface  < dimention.y + dimention.height + jQuery(window).height() ){
                if(!jQuery(element)[0].showed || propagationPersisting){
                    //++ Direction scroll
                        var direction = 1;
                        if(element.prev_position_y > position_y) direction = -1;
                    //--
                    jQuery(element).trigger("showed", [element, true, direction]);
                    if(functionResponce) functionResponce(element, true, direction);
                }
                jQuery(element)[0].showed = true;
            }else if( position_y + desface < dimention.y || position_y  - desface > dimention.y + dimention.height + jQuery(window).height() ){
                if(jQuery(element)[0].showed ){
                     //++ Direction scroll
                        var direction = 1;
                        if(element.prev_position_y < position_y) direction = -1;
                    //--
                    jQuery(element).trigger("hidden", [element, false, direction]);
                    if(functionResponce) functionResponce(element, false, direction);
                }
                jQuery(element)[0].showed = false;
            }
        }else{
            if(position_y + desface > dimention.y && position_y - desface < dimention.y + dimention.height + jQuery(window).height() ){
                if(!jQuery(element)[0].showed || propagationPersisting){
                    //++ Direction scroll
                        var direction = 1;
                        if(element.prev_position_y > position_y) direction = -1;
                    //--
                    jQuery(element).trigger("showed", [element, true, direction]);
                    if(functionResponce) functionResponce(element, true, direction);
                }
                jQuery(element)[0].showed = true;
            }else if( position_y < dimention.y || position_y > dimention.y + dimention.height + jQuery(window).height() ){
                if(jQuery(element)[0].showed ){
                     //++ Direction scroll
                        var direction = 1;
                        if(element.prev_position_y < position_y) direction = -1;
                    //--
                    jQuery(element).trigger("hidden", [element, false, direction]);
                    if(functionResponce) functionResponce(element, false, direction);
                }
                jQuery(element)[0].showed = false;
            }
        }
        element.prev_position_y = position_y;
    }
//--
/* Tile Columns, auto ajust tile columns and rows
    *** Required: jquery.packery.js ***
    cuppa.tiles(".works", ".work_item", works.columns);
    square_height = if(square == true) %,  if(square == false) px 
    Tile examples HTML, id:columns,rows
        <div id="2,1" class="work_item"></div>
        <div id="2,2" class="work_item"></div>
        <div id="1,1" class="work_item"></div>
        <div id="1,3" class="work_item"></div>
*/
    cuppa.tiles = function(container, tile, columns, duration, square, square_height, scale_reference_attr){
        if(columns == undefined) columns = 4;
        if(duration == undefined) duration = 0;
        if(square == undefined) square = true;
        if(scale_reference_attr == undefined) scale_reference_attr = "id";
        if(square && square_height == undefined) square_height = 1; // = 1%
        if(!square && square_height == undefined) square_height = 0; // = 0px
        this.columns =  columns;
        this.container = container;
        this.tile = tile;
        this.duration = duration;
        this.square = square;
        this.square_height = square_height;
        this.scale_reference_attr = scale_reference_attr;
        this.add_width_value = 0;
        this.update = function(){
            var width = Math.floor(jQuery(container).width()/this.columns)+this.add_width_value;
            var tiles = jQuery(tile);
            for(var i = 0; i < tiles.length; i++){
                //++ replaced
                    var height = jQuery(tiles[i]).height();
                //--
                if(square) height = width*square_height;
                else if(!square && square_height) height = square_height;
                var reference = (jQuery(tiles[i]).attr(this.scale_reference_attr)) ? jQuery(tiles[i]).attr(this.scale_reference_attr).split(",") : ["1"];
                if(!reference[1]) reference[1] = 1;
                var tile_width = parseFloat(reference[0])*width;
                var tile_height = parseFloat(reference[1])*height;
                jQuery(tiles[i]).width(tile_width);
                 if(square) jQuery(tiles[i]).height(tile_height);
                 else if(!square && square_height){ 
                     tile_height = parseFloat(reference[1])*this.square_height;
                    jQuery(tiles[i]).height(tile_height);
                 }
            }
            jQuery(this.container).packery({ columnWidth:0,  gutter: 0, itemSelector: this.tile, transitionDuration:this.duration+"s" });
            jQuery(this.container).packery('reloadItems');
            /* Reload all to fix */
            jQuery(this.container).packery({ columnWidth:0,  gutter: 0, itemSelector: this.tile, transitionDuration:this.duration+"s" });
            jQuery(this.container).packery('reloadItems');
        }; this.update();
    };
/* Create circle, element = canvas element */
    cuppa.knob = function(element, params){
        if(params == undefined) params = {};
        if(params.porcent == undefined) params.porcent = 1;
        if(params.duration == undefined) params.duration = 0;
        if(params.delay == undefined) params.delay = 0;
        if(params.initial == undefined) params.initial = -0.5;
        if(params.color == undefined) params.color = "#FFF";
        if(params.width == undefined) params.width = 6; 
        if(!jQuery(element).length) return;
        var canvas = jQuery(element)[0];
            canvas.porcent = (canvas.current_porcent) ? canvas.current_porcent : 0;
            canvas.initial = params.initial* Math.PI;
        var ctx = canvas.getContext('2d');
            ctx.canvas.width  = jQuery(canvas).width();
            ctx.canvas.height = jQuery(canvas).height();
            UpdateCircle();
            TweenMax.to(canvas, params.duration,{ delay:params.delay, porcent:params.porcent, ease:Cubic.easeInOut, onComplete:UpdateCircle, onUpdate:UpdateCircle })
                function UpdateCircle(){
                    ctx.clearRect ( 0 , 0 , jQuery(canvas).width(), jQuery(canvas).height() ); 
                    ctx.beginPath();                                        
                    ctx.arc(jQuery(canvas).width()*0.5, jQuery(canvas).height()*0.5, jQuery(canvas).width()*0.5-(params.width*0.5), canvas.initial, canvas.initial + canvas.porcent*2* Math.PI, false);
                    ctx.lineWidth = params.width;
                    ctx.strokeStyle = params.color;
                    ctx.stroke();
                    canvas.current_porcent = canvas.porcent;
                }
    };
// Apply mask to image
    cuppa.setMaskImage = function(image, mask_src, generate_image_data){
        if(generate_image_data == undefined) generate_image_data = false;
        var preload_cound = 0;
        var image = jQuery(image)[0];
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        // Preload image
            var preload_image = document.createElement('img');
                jQuery(preload_image).load(ImageComplete);
                jQuery(preload_image).attr("src", jQuery(image).attr("src"));
        // Preload Mask
            var mask = document.createElement('img');
                mask.src = mask_src;
                jQuery(mask).load(ImageComplete);
        // Preload Handler
            function ImageComplete(e){
                preload_cound++;
                if(preload_cound == 2) ApplyMask();
            }
        // Apply Mask, when the two images are loaded 
            function ApplyMask(event){
                var width = preload_image.width;
                var height = preload_image.height;
                    canvas.width = width;
                    canvas.height = height;
                    jQuery(canvas).attr("id", jQuery(image).attr("id"));
                    jQuery(canvas).attr("class", jQuery(image).attr("class"));
                    mask.width = width;
                    mask.height = height;
                    ctx.drawImage(mask, 0, 0, canvas.width, canvas.height);
                    ctx.globalCompositeOperation = 'source-atop';
                    ctx.drawImage(image, 0, 0);
                    if(generate_image_data){
                        image.src = canvas.toDataURL();
                    }else{
                        jQuery(image).replaceWith(canvas);
                    }
            };
    };
// Rotate element
    cuppa.rotateElement = function(element, angle, straightenInnerContent, innerContent, autoAjustDimention, addPixelsToInnerContent, duration, ease){
        var data_return = null;
        if(angle == undefined) angle = 45;
        if(addPixelsToInnerContent == undefined) addPixelsToInnerContent = 0;   // Preven show inner content corners  
        if(duration == undefined) duration = 0;
        if(ease == undefined) ease = Linear.easeNone;
        TweenMax.to(element, duration, {rotation:angle, ease:ease});
        // Straight inner content
            if(straightenInnerContent){
                TweenMax.to(innerContent, duration, {rotation:-angle, ease:ease});
                // Auto ajust dimention
                    if(autoAjustDimention){
                        var dimention = cuppa.boundingBox(element, addPixelsToInnerContent, angle);
                            dimention.x = dimention.x - parseFloat(jQuery(innerContent).css("padding-left"));
                            dimention.y = dimention.y - parseFloat(jQuery(innerContent).css("padding-top"));
                            dimention.x = dimention.x - parseFloat(jQuery(innerContent).css("margin-left"));
                            dimention.y = dimention.y - parseFloat(jQuery(innerContent).css("margin-top"));
                        TweenMax.to(innerContent, duration, {position:"absolute", left:dimention.x, top:dimention.y, width:dimention.width, height:dimention.height, ease:ease});
                        data_return = dimention;
                    }
            }
        return data_return;
    };
// Skew a element
    cuppa.skewElement= function(element, skewX, skewY, straightenInnerContent, innerContent, autoAjustDimention, addPixelsToInnerContent, duration, ease){
        if(skewX == undefined) skewX = 45; 
        if(skewY == undefined) skewY = 45;
        if(addPixelsToInnerContent == undefined) addPixelsToInnerContent = 0;   // Preven show inner content corners  
        if(duration == undefined) duration = 0;
        if(ease == undefined) ease = Linear.easeNone;
        jQuery(element).css("transform", "skew("+skewX+"deg, "+skewY+"deg)");
        // Straight inner content
            if(straightenInnerContent){
                jQuery(innerContent).css("transform", "skew("+(-skewX)+"deg, "+(-skewY)+"deg)");
                // Auto ajust dimention
                    if(autoAjustDimention){
                        var dimention = cuppa.boundingSkewBox(element,skewX,skewY,addPixelsToInnerContent);
                            dimention.x = dimention.x - parseFloat(jQuery(innerContent).css("padding-left"));
                            dimention.y = dimention.y - parseFloat(jQuery(innerContent).css("padding-top"));
                            dimention.x = dimention.x - parseFloat(jQuery(innerContent).css("margin-left"));
                            dimention.y = dimention.y - parseFloat(jQuery(innerContent).css("margin-top"));
                        TweenMax.to(innerContent, duration, {position:"absolute", left:dimention.x, top:dimention.y, width:dimention.width, height:dimention.height, ease:ease});
                    }
            }
    };
// Convert Html element to String element
// Example: document.write(tu_GetStringElement(HTML_Element));
    cuppa.getStringElement = function(element){
        if(element[0]) element = tu_NewElement(element);
        var tmpNode = document.createElement("div"); 
            tmpNode.appendChild(element);
        var str = tmpNode.innerHTML;
            tmpNode = null;
        return str;
    };
/* Get key from value */
    cuppa.getKeyFromValue = function(value, data, forced_url_friendy_format, no_found_return_value){
        var tmp_key = "";
        for (var key in data) {
            var value_array = data[key];
            if(value_array == value){
                tmp_key = key;
                break;
            }
            //++ If not found, convert the value to url friendy and compare again
                value_array = cuppa.urlFriendly(value_array);
                if(value == value_array){
                    tmp_key = key;
                    break;
                }
            //--
        }
        if(!tmp_key && no_found_return_value) tmp_key = value;
        if(forced_url_friendy_format) tmp_key = cuppa.urlFriendly(tmp_key);
        return tmp_key;
    };
/* Remove Listener Handler 
    Example:
        function End(){
            console.log("removed div");
        }; cuppa.addRemoveListener("element_reference", End)
*/
    cuppa.addRemoveListener = function(element, response_function){
        jQuery("body").bind("DOMNodeRemoved", function(e){
            if(cuppa.elementRemoved(element)){
                jQuery("body").unbind("DOMNodeRemoved", e.handleObj.handler);
                response_function();
            }
        });
    };
/* Add EnterFrame listener */
    cuppa.enter_frame_list = [];
    cuppa.addEnterFrame = function(callback, fps, groupName){
        if(fps == undefined) fps = 60;
        if(groupName == undefined) groupName = "default";
        var fps = (1000/fps)/1000;
        //++ Crate instance
            var instance = {}
                instance.callback = callback;
                instance.fps = fps;
                instance.groupName = groupName;
                instance["function"] = function(instance){ 
                    callback();
                    TweenMax.delayedCall(instance.fps, instance["function"], [instance] );
                };
               instance["function"](instance);
        //--
        cuppa.enter_frame_list.push(instance);
    };
    cuppa.removeEnterFrame = function(callback){
        var i;
        for(i = 0; i < cuppa.enter_frame_list.length; i++){
            var instance = cuppa.enter_frame_list[i];
            if(instance.callback.toString() == callback.toString()){
                TweenMax.killTweensOf(instance["function"]);
                break;
            }
        }
        cuppa.enter_frame_list.splice(i, 1);
    };
    cuppa.removeEnterFrameGroup = function(groupName){
        if(groupName == undefined) groupName = "default";
        // Write the code
    };
/*  Replace a bit of string in a String
    Example: 
        function End(){
            if(cuppa.elementRemoved(".element")){ jQuery("body").unbind("DOMNodeRemoved", End); }
        }; jQuery("body").bind("DOMNodeRemoved", End);
*/
	cuppa.elementRemoved = function(element) {
	   if(!jQuery("body").find(element).length){
	       return true;
	   }else{
	       return false;
	   }
	};
/* Set Cookie, By default, the cookie is deleted when the browser is closed */
	cuppa.setCookie = function(c_name,value,exdays) {
        var exdate=new Date();
            exdate.setDate(exdate.getDate() + exdays);
        var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
        document.cookie=c_name + "=" + c_value + ";path=/";
	};
/* Get Cookie */
	cuppa.getCookie = function(cookie_name) {
		var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
		if ( results ) return ( unescape ( results[2] ) );
		else return null;
	};
/* Delete Cookie*/ 
	cuppa.deleteCookie = function(cookie_name){
		var cookie_date = new Date ( );  // current date & time
		cookie_date.setTime ( cookie_date.getTime() - 1 );
		document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
	};
// detect if is touch device
    cuppa.isTouch = cuppa.touchSupport = function() {
        if ('ontouchstart' in document.documentElement) { return true; }else{ return false; }
    };
// WheelSmooth
    cuppa.wheelSmooth2 = function(target, distance, duration, ease){
        if(!target || target == undefined) target = "body";
        if(distance == undefined) distance = 100;
        if(duration == undefined) duration = 0.6;
        if(ease == undefined) ease = Cubic.easeOut;
        jQuery(target).unbind("mousewheel").bind("mousewheel", function(e, direction){
            if(cuppa.browser.code == "ff" || cuppa.browser.code == "unknown") return;
            e.preventDefault();
            direction = direction*-1;
            var position = cuppa.statusScrollPixel(target);
            TweenMax.killTweensOf(target);
            TweenMax.killTweensOf(window);
            cuppa.moveContent(target, target, false, true, 0, position.y+distance*direction, duration, ease);
        });
    }
    cuppa.wheelSmooth2Disable = function(target){
        if(!target || target == "body") target = "html, body";
        jQuery(target).unbind("mousewheel");
    }
/* WheelSmooth
    cuppa.wheelSmooth(target);
    cuppa.wheelSmoothDisable(target);
*/
    cuppa.wheelSmoothDisable = function(target){
        $(target).smoothWheelRemove();   
    }
    cuppa.wheelSmooth = function(target, options){
        $(target).smoothWheel();   
    }
/* MouseWheel */
    cuppa.mousewheel = function(target, callback, data, remove){
        if(!target) target = window;
        if(remove){
            $(target).unbind("mousewheel", callback).unbind("DOMMouseScroll",callback);
        }else{
            $(target).unbind("mousewheel", callback).unbind("DOMMouseScroll",callback);
            $(target).bind("mousewheel", data, callback).bind("DOMMouseScroll", data, callback);
        }
    }

// statusScroll, handler and return the position status in porcent and pixel
    cuppa.scrollStatus = function(area, callback){ cuppa.statusScroll(area, callback); };
    cuppa.statusScroll = function(area, callback){
        if(!area || area == "body" || area == "html, body") area = window;
         function onScroll () {
            var percent = cuppa.statusScrollPercent(area);
            var position = cuppa.statusScrollPixel(area);
            callback(percent, position);
        };
        jQuery(area).scroll(onScroll);
    };
// detect the status scroll in porcent
    cuppa.scrollPercentStatus = function(area){ return cuppa.statusScrollPercent(area); };
    cuppa.statusScrollPercent = function(area){
        if(!area || area == "body" || area == "html, body") area = window;
        var percent = {x:0, y:0};
        var position =  {x:jQuery(area).scrollLeft(), y:jQuery(area).scrollTop()};
        var areaParams = { width:jQuery(area).width(), height:jQuery(area).height() };
            if(area == "html, body"){ areaParams.width = jQuery(window).width(); areaParams.height = jQuery(window).height(); }
        var contentParams = {width:jQuery(area).prop("scrollWidth"), height:jQuery(area).prop("scrollHeight")};
            if(!contentParams.width) contentParams.width = jQuery(document).width();
            if(!contentParams.height) contentParams.height = jQuery(document).height();
        // Scroll X
            var s = position.x, d = contentParams.width, c = areaParams.width;
                scrollPercent = (s / (d-c)); //if(!scrollPercent) scrollPercent = 0;
                percent.x = scrollPercent;
        // Scroll Y
            var s = position.y, d = contentParams.height, c = areaParams.height;
                scrollPercent = (s / (d-c)); //if(!scrollPercent) scrollPercent = 0;
                percent.y = scrollPercent;
        return percent;
    }
// detect the status scroll in pixels
    cuppa.scrollPixelStatus = function(area){ return cuppa.statusScrollPixel(area); };
    cuppa.statusScrollPixel = function(area){
        if(!area || area == "body" || area == "html, body") area = window;
        var position =  {x:jQuery(area).scrollLeft(), y:jQuery(area).scrollTop()};
        return position;
    };
// Sheet, var anim1 = new cuppa.spriteSheetAnimation( {target:".div", fps:30, frames:50, columns:8} )
    cuppa.spriteSheetAnimation = function(options){
        //++ Default options
            if(options.fps == undefined) options.fps = 30;
            if(options.play == undefined) options.play = true;
            if(options.columns == undefined) options.columns = 1;
            if(options.loop == undefined) options.loop  = true;
            if(options.reverse == undefined) options.reverse = false;
            if(options.currentFrame == undefined && options.reverse == false) options.currentFrame  = 1;
            if(options.currentFrame == undefined && options.reverse == true) options.currentFrame  = options.frames;
            options.tiles_by_column  = Math.ceil(options.frames/options.columns); // calculate tiles_by_column
            options.width = jQuery(options.target).width(); options.height = jQuery(options.target).height(); // Get with and height
            options.object = jQuery(options.target); // Get object DIV
            if(options.object == undefined) return;
            options.rows = options.frames/options.columns;
            this.options = options;
        //--
        //++
            this.Animate = function(reference){
                var positionX = 0;
                if(!reference.options.reverse){
                    // Normar
                    var real_frame = reference.options.currentFrame-1;
                    var row = Math.floor((real_frame)/(options.columns) );
                    var column = (real_frame/options.columns) - Math.floor(real_frame/options.columns) ;
                        column = Math.round(column*options.columns);
                    positionX = column*reference.options.width*-1;
                    positionY = row*reference.options.height*-1;
                    TweenMax.to(reference.options.object, 0, {backgroundPosition:positionX+"px "+positionY+"px"});
                    if(reference.options.currentFrame == reference.options.frames){
                        jQuery(reference).trigger("complete");
                        jQuery(this).trigger("complete");
                        if(!options.loop){ return; }
                        reference.options.currentFrame = 0;
                    }
                    options.currentFrame++;
                }else{ 
                    // Reverse
                    var real_frame = reference.options.currentFrame-1;
                    var row = Math.floor((real_frame)/(options.columns) );
                    var column = (real_frame/options.columns) - Math.floor(real_frame/options.columns) ;
                        column = Math.round(column*options.columns);
                    positionX = column*reference.options.width*-1;
                    positionY = row*reference.options.height*-1;
                    TweenMax.to(reference.options.object, 0, {backgroundPosition:positionX+"px "+positionY+"px"});
                    if(reference.options.currentFrame == 1){
                        jQuery(reference).trigger("complete");
                        jQuery(this).trigger("complete");
                        if(!options.loop){ return; }
                        reference.options.currentFrame = reference.options.frames;
                    }
                    options.currentFrame--;
                }
                TweenMax.delayedCall(1/options.fps, reference.Animate,[reference]);
            }
            if(this.options.play) this.Animate(this);
        //--
        //++ GotoAndPlay
            this.gotoAndPlay = function(value, loop){
                TweenMax.killTweensOf(this.Animate);
                if(!value) value = 1; 
                this.options.currentFrame = value; 
                if(loop != undefined) this.options.loop = loop;
                this.Animate(this);
            }
        //--
        //++ GotoAndPlay
            this.gotoAndStop = function(value){
                TweenMax.killTweensOf(this.Animate);
                if(!value) value = 1;
                this.options.currentFrame = value;
                this.Animate(this);
                this.stop();
            }
        //--
        //++ Stop
            this.stop = function(){
                TweenMax.killTweensOf(this.Animate);
            }
        //--
        return this;
    };
// Animation sequence, options = {target:".animation1", path:"animation/", fps:30, frames:77, zerosToLeft:4, imageName:""};
    cuppa.animationSequence = function(options){
        //++ Default options
            if(options.fps == undefined) options.fps = 30;
            if(options.play == undefined) options.play = true;
            if(options.loop == undefined) options.loop  = true;
            if(options.reverse == undefined) options.reverse = false;
            if(options.currentFrame == undefined && options.reverse == false) options.currentFrame  = 1;
            if(options.currentFrame == undefined && options.reverse == true) options.currentFrame  = options.frames;
            options.width = jQuery(options.target).width(); options.height = jQuery(options.target).height(); // Get with and height
            options.object = jQuery(options.target); // Get object DIV
            if(options.object == undefined) return;
            this.options = options;
        //--

            for(var  i = 1; i <= options.frames; i++){
                var zeros = "";
                if(options.zerosToLeft){
                    var left_zero = options.zerosToLeft - i.toString().length;
                    if(left_zero > 0) zeros = (0).toFixed(left_zero).toString().replace("0.","");
                }
                var image_name = zeros+i+".png";
                if(options.imageName) image_name = options.imageName+image_name;
                var url = options.path+image_name;
                var image = jQuery("<img />");
                    jQuery(image).attr("src", url);
                    jQuery(image).css("position","absolute").css({left:0,top:0});
                    if(i > 1) jQuery(image).css("display", "none");
                    jQuery(options.target).append(image);
            }
        //++
            this.Animate = function(reference){
                if(!reference.options.reverse){
                    var element = jQuery(reference.options.target).find("img").get(reference.options.currentFrame-1);
                    TweenMax.to(jQuery(reference.options.target).find("img"), 0, {display:"none"});
                    TweenMax.to(element, 0, {display:"block"});
                    if(reference.options.currentFrame == reference.options.frames){
                        jQuery(reference).trigger("complete");
                        jQuery(this).trigger("complete");
                        if(!options.loop){ return; }
                        reference.options.currentFrame = 0;
                    }
                    options.currentFrame++;
                }else{ 
                    var element = jQuery(reference.options.target).find("img").get(reference.options.currentFrame-1);
                    TweenMax.to(jQuery(reference.options.target).find("img"), 0, {display:"none"});
                    TweenMax.to(element, 0, {display:"block"});
                    if(reference.options.currentFrame == 1){
                        jQuery(reference).trigger("complete");
                        jQuery(this).trigger("complete");
                        if(!options.loop){ return; }
                        reference.options.currentFrame = reference.options.frames;
                    }
                    options.currentFrame--;
                }
                TweenMax.delayedCall(1/options.fps, reference.Animate,[reference]);
            }
            if(this.options.play) this.Animate(this);
        //--
        //++ GotoAndPlay
            this.gotoAndPlay = function(value, loop){
                TweenMax.killTweensOf(this.Animate);
                if(!value) value = 1; 
                this.options.currentFrame = value; 
                if(loop != undefined) this.options.loop = loop;
                this.Animate(this);
            }
        //--
        //++ GotoAndPlay
            this.gotoAndStop = function(value){
                TweenMax.killTweensOf(this.Animate);
                if(!value) value = 1; 
                this.options.currentFrame = value; 
                return;
                this.Animate(this);
            }
        //--
        //++ Stop
            this.stop = function(){
                TweenMax.killTweensOf(this.Animate);
            }
        //--
        return this;
    };
/* Add tween to timeLine and push next tweents after */
    cuppa.timeLine = function(vars){
        this.vars = vars;
        this.timeLine = new TimelineMax(vars);
        this.tweens = [];
        this.labels = [];
        
        this.to = function(target, duration, vars, position, label){
            this.timeLine.to(target, duration, vars, position);
            this.tweens.push({target:target, duration:duration, vars:vars, position:position, label:label});
            if(label){ 
                this.timeLine.addLabel(label);
                this.labels.push({label:label, position:this.timeLine.getLabelTime(label)});
            }
        }
        this.addLabel = function(label, position){
            this.timeLine.addLabel(label, position);
            this.labels.push({label:label, position:this.timeLine.getLabelTime(label)});
        }
        this.append = function(target, duration, vars, position, label, position_to_add, resume){
            this.timeLine.stop();
            this.currentTime = this.timeLine.time();
            this.timeLine = new TimelineMax(this.vars);
            var temp_tweens = this.tweens; this.tweens = [];
            for(var i = 0; i < temp_tweens.length; i++){
                this.to(temp_tweens[i].target, temp_tweens[i].duration, temp_tweens[i].vars, temp_tweens[i].position, temp_tweens[i].label);
                if(temp_tweens[i].label == position_to_add) 
                    this.to(target, duration, vars, position, label);
            }
            this.timeLine.stop();
            this.timeLine.seek(this.currentTime);
            if(resume) this.timeLine.play();
        }
        this.remove = function(label, resume){
            this.timeLine.stop();
            this.currentTime = this.timeLine.time();
            this.timeLine = new TimelineMax(this.vars);
            var temp_tweens = this.tweens; this.tweens = [];
            for(var i = 0; i < temp_tweens.length; i++){
                if(temp_tweens[i].label == label){
                    temp_tweens.splice(i,1); break;
                }
            }
            for(var i = 0; i < temp_tweens.length; i++){
                this.to(temp_tweens[i].target, temp_tweens[i].duration, temp_tweens[i].vars, temp_tweens[i].position, temp_tweens[i].label);
            }
            this.timeLine.stop();
            this.timeLine.seek(this.currentTime);
            if(resume) this.timeLine.play();
        }
    };
/* Config URL Friendly HTML5  
    setParams params: { path:string, title:string, data:object }
    When use jaddress compatibiliy, is necesary <base href="http://base_path/" />
 */ 
    cuppa.getPath = function(return_array){
        var base_path = jQuery("base").attr("href");
        var path = cuppa.replace(window.location.href, base_path, "");
        if(return_array) path = path.split("/");
        return path;
    }
    cuppa.managerURL = function(response_function, jaddress_compatibility, auto_init, init_params, language, base_path){
        if(!response_function) response_function = function(){};
        if(jaddress_compatibility == undefined) jaddress_compatibility = false;
        jaddress_forced = (jaddress_compatibility == true) ? true : false;
        if(auto_init == undefined) auto_init = true;
        if(base_path == undefined) base_path = jQuery("base").attr("href");
        if(base_path == undefined) base_path = "";
        this.history_list = new Array();
        this.path = "";       
        this.path_array = null;
        this.params = null;
        this.jaddress_compatibility = jaddress_compatibility;
        this.jaddress_forced = jaddress_forced;
        this.language = language;
        this.base_path = base_path; 
        this.data = {};
        this.data_get = {}
        // Set Params
            this.setParams = function(params, forced, data, dispatchEvent){
                if(dispatchEvent == undefined) dispatchEvent = true;
                if(this.path == params.path && !forced) return;
                this.path = params.path = cuppa.replace(params.path, this.base_path, "");
                this.path = params.path = cuppa.replace(params.path, "#", "");
                this.data = (data) ? data : {};
                if(this.language){ this.languageTransform(); }
                //++ Crate Array data
                    if(this.path){
                        this.path_array = this.path.split("/");
                        if(!this.path_array[this.path_array.length-1]) this.path_array.pop();
                    }else this.path_array = null;
                //--
                //++ Get data
                    try{
                        this.data_get = this.path_array[ this.path_array.length-1 ];
                        this.data_get = this.data_get.replace("?","");
                        this.data_get = cuppa.urlToObject(this.data_get);
                    }catch(err){}
                //--
                if(params.path != undefined ){
                    var new_url = this.base_path + cuppa.replace(params.path,"//","/");
                    if(window.location.href != new_url || forced){
                        try{
                            if(!this.jaddress_forced){
                                if(params.title) window.history.pushState(new_url, params.title, new_url);
                                else window.history.pushState(new_url, new_url, new_url);
                            }else{
                                jQuery.address.path(params.path);
                            }
                        }catch(err){
                            //++ jAddress compatibily
                                if(this.jaddress_compatibility){
                                    jQuery.address.path(params.path);
                                }else{
                                    location.href = new_url;
                                    return;
                                }
                            //--
                        }
                        params.path_array = this.path_array;
                        this.params = params;
                        if(dispatchEvent) jQuery(window).trigger("change_url", [params, this.data, this.data_get]);
                    }
                    if(params.title != undefined) document.title = params.title;
                }
                this.addToHistory(params);
            }
        // Add a new item to history
            this.addToHistory = function(params){
                var current_state = (this.base_path) ? cuppa.replace(window.history.state, this.base_path, "") : cuppa.replace(window.history.state, jQuery("base").attr("href"), "");
                for(var i = 0; i < this.history_list.length; i++){
                    if(this.history_list[i].path == current_state){
                        this.history_list.splice(i,1);
                        break;
                    }
                }
                return this.history_list.unshift(params);
            }
        // Get CurrentState
            this.getCurrentPath = function(){
                var current_state = cuppa.replace(window.history.state, this.base_path, "");
                return current_state;
            }
        // Language Transform
            this.languageTransform = function(path_resource, language_resource){
                if(path_resource && language_resource){
                    if( typeof path_resource == 'string' ){ 
                        path_resource = path_resource.replace("#/","");
                        path_resource = path_resource.split("/");
                    }
                    path_resource = path_resource.slice(0);
                    if(!path_resource[path_resource.length-1]) path_resource.pop();
                    for(var i = 0; i < path_resource.length; i++){
                        path_resource[i] = cuppa.getKeyFromValue(path_resource[i], language_resource, true, true);
                    }
                    return path_resource;
                }else{
                    if(!this.language) return null;
                    this.path = this.path.replace("#/","");
                    this.path_array = this.path.split("/");
                    if(!this.path_array[this.path_array.length-1]) this.path_array.pop();
                    for(var i = 0; i < this.path_array.length; i++){
                        this.path_array[i] = cuppa.getKeyFromValue(this.path_array[i], this.language, true, true);
                    }
                    this.path = this.path_array.join("/");
                    return null;
                }
            }        
        // History Handle with popstate
            this.historyHandler = function(event){
                var history_list = event.data.tu_ManagerURL.history_list;
                var current_state = cuppa.replace(window.location.href, jQuery(window)[0].tu_ManagerURL.base_path, "");
                    current_state = current_state.replace("#/","");
                var founded = false;
                for(var i = 0; i < history_list.length; i++){
                    if(history_list[i].path == current_state){
                        if(jQuery(window)[0].tu_ManagerURL.path == history_list[i].path) return; 
                        jQuery(window)[0].tu_ManagerURL.path = history_list[i].path;
                        if(jQuery(window)[0].tu_ManagerURL.language){ jQuery(window)[0].tu_ManagerURL.languageTransform(); }
                        // Crate Array data
                            if( jQuery(window)[0].tu_ManagerURL.path ) jQuery(window)[0].tu_ManagerURL.path_array = jQuery(window)[0].tu_ManagerURL.path.split("/");
                            else jQuery(window)[0].tu_ManagerURL.path_array = null;
                        //--
                        history_list[i].path_array = jQuery(window)[0].tu_ManagerURL.path_array;
                        jQuery(window).trigger("change_url", [history_list[i]]);
                        if(history_list[i].title) document.title = history_list[i].title;
                        founded = true;
                        break;
                    }
                }
                if(!founded){
                    try{ console.log("no founded"); }catch(err){ }
                    var current_state = { path:cuppa.replace(window.location.href, jQuery(window)[0].tu_ManagerURL.base_path, "") };
                        current_state.path = cuppa.replace(current_state.path, "#/","");
                        current_state.path = cuppa.replace(current_state.path, "#","");
                        jQuery(window)[0].tu_ManagerURL.path = current_state.path;
                        if(jQuery(window)[0].tu_ManagerURL.language){ jQuery(window)[0].tu_ManagerURL.languageTransform(); }
                        // Crate Array data
                            if( jQuery(window)[0].tu_ManagerURL.path ) jQuery(window)[0].tu_ManagerURL.path_array = jQuery(window)[0].tu_ManagerURL.path.split("/");
                            else jQuery(window)[0].tu_ManagerURL.path_array = null;
                        //--
                        current_state.path_array = jQuery(window)[0].tu_ManagerURL.path_array;
                        if(!jQuery(window)[0].tu_ManagerURL.jaddress_forced){
                            jQuery(window).trigger("change_url", [current_state]);
                        }
                }
            }; jQuery(window).bind('popstate', {tu_ManagerURL:this}, this.historyHandler);
        // Auto configure 'a' tags
            this.updateLinks = function(className, forced, groupName){
                if(!groupName) groupName = "default";
                if(!className) className = ".link";
                jQuery(className).data("forced", forced);
                cuppa.removeEventListener("click", onClick, className, groupName);
                cuppa.addEventListener("click", onClick, className, groupName);
                function onClick(event){
                    if(jQuery(this).attr("target") == "_blank"){ return };
                    event.preventDefault();
                    var params = {}
                        params.path = jQuery(this).attr("href");
                        params.title = jQuery(this).attr("title");
                    jQuery(window)[0].tu_ManagerURL.setParams(params, jQuery(this).data("forced"));
                }
            }
        // Set Handler
            this.addListener = function(response_function, groupName, init_execute){
                if(!groupName) groupName = "default";
                cuppa.addEventListener("change_url", response_function, window, groupName);
                if(init_execute) response_function();
            }
        // Unset Handler
            this.removeListener = function(response_function, groupName){
                if(groupName == undefined) groupName = "default";
                cuppa.removeEventListener("change_url", response_function, window, groupName);
            }
        // Add object to window
            jQuery(window)[0].cuppa.managerURL = jQuery(window)[0].tu_ManagerURL = cuppa.managerURL = this;
        // Add Default response
            this.addListener(response_function)
            //jQuery(window).bind("change_url", response_function);
        // Set Init Params
            if((init_params == undefined || !init_params) && this.base_path) init_params = { path:cuppa.replace(window.location.href, this.base_path, "") }
            else  init_params = { path:"" }
            //++ jAddress compatibily
                if((!window.history.pushState && this.jaddress_compatibility) || this.jaddress_forced ){                  
                    if(init_params){                    
                        if(init_params.path.search("#") == -1 && init_params.path.length){
                            var url_data = this.base_path + "#/" + init_params.path;
                            location.href = url_data;
                            return;
                        }
                    }                    
                }
                if(this.jaddress_compatibility){
                    if(!window.history.pushState || this.jaddress_forced){
                        this.init = true;
                        function onExternalChange(event){
                            if(jQuery(window)[0].tu_ManagerURL.init){ jQuery(window)[0].tu_ManagerURL.init = false; return; }
                            var params = {}
                                params.path = jQuery.address.path().substring(1);
                                params.title = jQuery.address.title();
                                if(jQuery(window)[0].tu_ManagerURL.path == params.path) return;
                                jQuery(window)[0].tu_ManagerURL.setParams(params);
                        }; try{jQuery.address.externalChange(onExternalChange);}catch(err){};
                    }else{
                        var path_address = jQuery.address.path().slice(1);
                        if(path_address.length){
                            location.href = jQuery(window)[0].tu_ManagerURL.base_path + path_address;
                            return;
                        }
                    }
                }
            //--
            init_params.path = init_params.path.replace("#/", "");
            init_params.path = init_params.path.replace("#", "");
            init_params.path = cuppa.replace(init_params.path, this.base_path, "");
            this.addToHistory(init_params);
            this.path = init_params.path;
            if(this.language){ this.languageTransform(); init_params.path = this.path; }
            // Crate Array data
                if(this.path){
                    this.path_array = init_params.path.split("/");
                    if(!this.path_array[this.path_array.length-1]) this.path_array.pop();
                }else this.path_array = null;
            //--
            //++ Get data
                try{
                    this.data_get = this.path_array[ this.path_array.length-1 ];
                    this.data_get = this.data_get.replace("?","");
                    this.data_get = cuppa.urlToObject(this.data_get);
                }catch(err){}
            //--
            init_params.path_array = this.path_array;
            this.params = init_params;  
            if(auto_init) jQuery(window).trigger("change_url", [init_params, this.data, this.data_get]); 
    }; 