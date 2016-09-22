/* Get percent betwen 2 range */
    cuppa.percent = function(n, min, max, invert){
        var percent = (n-min)/(max-min);
        if(invert) percent = 1-percent;
        return percent
    }
/* Get new dimensions, force:width or height */
	cuppa.newDimensions = function(width, height, new_width, new_height, invert, force) {
		if(!invert) invert = false;
        width = parseFloat(width); height = parseFloat(height); new_width = parseFloat(new_width); new_height = parseFloat(new_height);
		var porcent = 1 + ((new_width - width) / width);
        if(force == "width"){
            var porcent = 1 + ((new_width - width) / width);
                new_width = width*porcent;
				new_height = height*porcent;
                return {width:new_width, height:new_height, scale:porcent}
        }else if(force == "height"){
            var porcent = 1 + ((new_height - height) / height);
                new_width = width*porcent;
                new_height = height*porcent;
                return {width:new_width, height:new_height, scale:porcent}
        }
        
		if(!invert){
			if(height*porcent >= new_height){
				new_width = width*porcent;
				new_height = height*porcent;
			}else{
				porcent = 1 + ((new_height - height)/height);
				new_width = width*porcent;
				new_height = height*porcent;
			}
		}else{
			if(height*porcent <= new_height){
				new_width = width*porcent;
				new_height = height*porcent;
			}else{
				porcent = 1 + ((new_height - height)/height);
				new_width = width*porcent;
				new_height = height*porcent;
			}
		}
		return {width:new_width, height:new_height, scale:porcent}
	};
/* Cover
    if scale = true, use CSS Transform and dont with and heght, default = false
 */
    cuppa.cover = function(element, invert, scale, force, align){
        var elements = jQuery(element);
        for(var i = 0; i < elements.length; i++){
            element = elements[i];
            var parent = jQuery(element).parent();
            if(invert){
                var dimention = cuppa.newDimensions(jQuery(element).width(), jQuery(element).height(), jQuery(parent).width(), jQuery(parent).height(), true, force );
                if(scale){
                    TweenMax.to(element, 0, {scale:dimention.scale});
                    jQuery(element).css("position", "absolute");
                    jQuery(element).css("left", (jQuery(parent).width()-jQuery(element).width())*0.5 );
                    jQuery(element).css("top", (jQuery(parent).height()-jQuery(element).height())*0.5 );
                }else{
                    jQuery(element).width(dimention.width).height(dimention.height);
                    jQuery(element).css("position", "absolute");
                    jQuery(element).css("left", (jQuery(parent).width()-jQuery(element).width())*0.5 );
                    jQuery(element).css("top", (jQuery(parent).height()-jQuery(element).height())*0.5 );
                }
            }else{
                var dimention = cuppa.newDimensions(jQuery(element).width(), jQuery(element).height(), jQuery(parent).width(), jQuery(parent).height(), false, force );
                if(scale){
                    TweenMax.to(element, 0, {scale:dimention.scale});
                    jQuery(element).css("position", "absolute");
                    jQuery(element).css("left", (jQuery(parent).width()-jQuery(element).width())*0.5 );
                    jQuery(element).css("top", (jQuery(parent).height()-jQuery(element).height())*0.5 );
                }else{
                    jQuery(element).width(dimention.width+1).height(dimention.height+1);
                    jQuery(element).css("position", "absolute");
                    jQuery(element).css("left", (jQuery(parent).width()-jQuery(element).width())*0.5 );
                    jQuery(element).css("top", (jQuery(parent).height()-jQuery(element).height())*0.5 );
                }
            }
            //++ Align 
                if(align){ 
                    cuppa.alignAbsolute(element, align);
                }
            //--
        }
    };
 /**
  * Get the sum of all element passed
  * Example: cuppa.sumWidth(".content li")
  */
    cuppa.sumWidth = function(list, one_element){
        var items = jQuery(list);
        var value = 0;
        for(var i = 0; i < items.length; i++){ 
            value+= jQuery(items[i]).width();
            value+= parseFloat(jQuery(items[i]).css("margin-left"));
            value+= parseFloat(jQuery(items[i]).css("margin-right"));
            value+= parseFloat(jQuery(items[i]).css("padding-left"));
            value+= parseFloat(jQuery(items[i]).css("padding-right"));
            if(one_element) break;
        }
        return value;
    };
  /* Unique value
  */
    cuppa.unique = function(add_to_init){
        var value = Math.round(Math.random()*9999) + new Date().valueOf();
        if(add_to_init) value = add_to_init + value;
        return value;
    }
  /* Get real dimention
   *  Recomendable add all inner element inside the container without scroll "wrapper"
   */
    cuppa.dim = function(element){ return cuppa.dimentions(element); }
    cuppa.dimentions = function(element){
        var value = {width:0, height:0, x:0, x2:0, y:0, y2:0};
            try{
                //++ width2, height2
                    var parents = jQuery(element).parents();
                    var tmp_parents = new Array();
                    for(var i = 0; i < parents.length; i++){
                        if( jQuery(parents[i]).css("display") == "none" ) tmp_parents.push(parents[i]);
                    }
                    jQuery(tmp_parents).css({visibility:"hidden", display:"block"});
                    // x,y values
                        value.x = jQuery(element).offset().left;
                        value.y = jQuery(element).offset().top;
                        value.x2 = jQuery(element).position().left; 
                        value.y2 = jQuery(element).position().top;
                        value.x3 = value.x-cuppa.statusScrollPixel().x;
                        value.y3 = value.y-cuppa.statusScrollPixel().y;
                    // dimentions, including border + padding
                        value.width = jQuery(element).outerWidth();
                        value.height = jQuery(element).outerHeight();
                    // dimentions,  - border, - padding 
                        value.width2 = jQuery(element).width();
                        value.height2 = jQuery(element).height();
                    // dimentions, - border
                        value.width3 = jQuery(element).innerWidth();
                        value.height3 = jQuery(element).innerHeight();
                    // dimentions, + border, + padding, + margin 
                        value.width4 = jQuery(element).outerWidth(true);
                        value.height4 = jQuery(element).outerHeight(true);
                    // scroll dimensions
                        value.scrollWidth = jQuery(element).get(0).scrollWidth;
                        value.scrollHeight = jQuery(element).get(0).scrollHeight;
                    jQuery(tmp_parents).css({visibility:"visible", display:"none"});
                //--
            }catch(err){}
        return value;
    };
 /* Auto Ajust Width
  * This calcul and ajust the width container according the inner content 
  * If you use display:inline-block usualy you should add_padding
  */
    cuppa.ajustWidth = function(container, inner_elements, add_padding){
        if(add_padding == undefined) add_padding = 0;
        function Calculate(){
            var inner_elements_width = cuppa.sumWidth(inner_elements, true);
            var container_width = parseFloat( jQuery(container).css("max-width") );
            if(container_width > jQuery(container).parent().width() || !container_width ) container_width = jQuery(container).parent().width();
            var count = Math.floor(container_width/inner_elements_width);
            if(count > jQuery(inner_elements).length) count = jQuery(inner_elements).length;
            jQuery(container).width(inner_elements_width*count + add_padding);
        }; jQuery(window).unbind("resize", Calculate).bind("resize", Calculate); Calculate();
    };
 /* Auto Ajust Dimentions
    This calculate and ajust the height and width container according the inner absolute items
    params.width = true;
    params.height = true;
    params.autoUpdate = true;
  */
    cuppa.ajustDimentions = function(container, elements, params){
        this.params = params || {};
        this.params.containers = $(container).get();
        this.params.elements = "> "+elements;
        if(this.params.width  == undefined) this.params.width =  true;
        if(this.params.height  == undefined) this.params.height =  true;
        if(this.params.autoUpdate == undefined) this.params.autoUpdate = true;
        this.ajust = function(e){
            var params = this.params; if(e) params = e.data;
            for(var i = 0; i < params.containers.length; i++){
                var container = params.containers[i];
                var elements = $(container).find(params.elements);
                if(params.width){
                    if(params.width == "sum"){
                        var x = null;
                        var width = 0;
                        for(var j = 0; j < elements.length; j++){
                            var dim = cuppa.dim(elements[j]);
                            if(x !== dim.x){
                                width += dim.width;
                                x = dim.x;
                            }
                        }
                        $(container).width(width);
                    }else{
                        var width = cuppa.getCSSValues(elements, "width", "max", true);
                        $(container).width(width);
                    }
                }
                if(params.height){
                    if(params.height == "sum"){
                        var y = null;
                        var height = 0;
                        for(var j = 0; j < elements.length; j++){
                            var dim = cuppa.dim(elements[j]);
                            if(y !== dim.y){
                                height += dim.height;
                                y = dim.y;
                            }
                        }
                        $(container).height(height);
                    }else{
                        var height = cuppa.getCSSValues(elements, "height", "max", true);
                        $(container).height(height);
                    }
                }
            }
        };
        if(this.params.autoUpdate) jQuery(window).unbind("resize", this.ajust).bind("resize", this.params, this.ajust); 
        this.ajust();
    };
// Get the bounding rotate element data
    cuppa.boundingBox = function (element, addPixels, angle) {
        if(angle == undefined) angle = cuppa.getRotationDegrees(element);
        if(addPixels == undefined) addPixels = 0;
        //++ Fix angles
            if(angle >= 360) angle = angle - Math.floor(angle/360)*360;
            if(angle >= 180 && angle < 360) angle = angle - 180;
            if(angle <= -360) angle = angle + Math.floor(angle*-1/360)*360;
            if(angle <= -180) angle = angle + 180;
            if(angle < 0) angle = 180+angle;
        //--
        angle = (angle/180)*Math.PI;
        var width = jQuery(element).width() + addPixels;
        var height = jQuery(element).height() + addPixels;
        angle = ((angle > Math.PI * 0.5 && angle < Math.PI * 1) || (angle > Math.PI * 1.5 && angle < Math.PI * 2))? Math.PI - angle : angle;
        var dimention = {}
            dimention.width = Math.sin(angle) * height + Math.cos(angle) * width;
            dimention.height = Math.sin(angle) * width + Math.cos(angle) * height; 
            dimention.x = -(dimention.width - jQuery(element).width())*0.5;
            dimention.y = -(dimention.height - jQuery(element).height())*0.5;
        return dimention;
    };
// Get the bounding skew element data
    cuppa.boundingSkewBox = function (element, skewX, skewY, addPixels) {
        if(skewX == undefined) skewX = 0;
        if(skewY == undefined) skewY = 0;
        if(addPixels == undefined) addPixels = 0;
        var width = jQuery(element).width();
        var height = jQuery(element).height();
        var longX = cuppa.getOpositeDimention(height, skewX);
        var longY = cuppa.getOpositeDimention(width, skewY);
        var dimention = {}
            dimention.width = Math.abs(longX)+width;
            dimention.height = Math.abs(longY)+height;
            dimention.x = (jQuery(element).width() - dimention.width)*0.5;
            dimention.y = (jQuery(element).height() - dimention.height)*0.5;
        return dimention;
    };
// Get rotation degrees
    cuppa.getRotationDegrees = function(obj){
        var matrix = jQuery(obj).css("-webkit-transform") ||
        jQuery(obj).css("-moz-transform")    ||
        jQuery(obj).css("-ms-transform")     ||
        jQuery(obj).css("-o-transform")      ||
        jQuery(obj).css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return (angle < 0) ? angle +=360 : angle;
    };
// Get arc params
    cuppa.arcParams = function(x, y, radius, startAngle, endAngle){
        function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        }
        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);
        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        var d = [
            "M", start.x, start.y, 
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
            "L", x,y,
            "L", start.x, start.y
        ].join(" ");
        return d;       
    }
// Get the oposite dimention of a triangle rectangle 
    cuppa.getOpositeDimention = function(longitude, angle){
        angle = (angle/180)*Math.PI;
        var A = angle;
        var b = longitude;
        var C = 90;
        var B = 180-C-Math.abs(A);
        var c = b/Math.cos(A);
        var a =b*Math.tan(A); 
        return a;
    };
/* Get Ages from date (1985/03/01) ) */
    cuppa.getAge = function(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
        return age;
    };