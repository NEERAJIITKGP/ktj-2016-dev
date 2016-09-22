portfolio = {}
                portfolio.data = cuppa.jsonDecode("bnVsbA==");
                //++ openProject
                    portfolio.openProject = function(e){
                        if(cuppa.managerURL.path_array[2] && $(".portfolio_data").get().length ){
                            TweenMax.set(".portfolio_data", {overflow:"hidden"});
                            TweenMax.set("body", {overflow:"hidden"});
                            var old = $(".portfolio_data").get();
                            var item_list = $(".portfolio ."+cuppa.managerURL.path_array[2]);
                            var index = item_list.attr("index"); if(!index) return;
                            var dim = cuppa.dimentions(".next");
                            var item = $($(".portfolio_data_temp")[0]).clone(); 
                                item.addClass("portfolio_data").removeClass("portfolio_data_temp");
                                item.attr("ref", cuppa.managerURL.path_array[2]);
                                item.css({opacity:0, display:"none", left:dim.x3, top:dim.y3, width:dim.width, height:dim.height });
                                item.css({ backgroundColor:item_list.parent().find(".box1").css("background-color") });
                                item.find(".header .texts").html(portfolio.data[index].banner_text.replace("media/","administrator/media/"));
                                $(old).after(item);
                                //++ Tweenmax
                                    var timeline = new TimelineMax();
                                        timeline.to(".p_content .like_message, .p_content .line", 0.3, {alpha:0});
                                        timeline.set(item.find(".header"), {position:"absolute", top:0, right:0, bottom:0, left:0, height:"auto", zIndex:2});
                                        timeline.set(item.find(".header .texts"), {alpha:0});
                                        timeline.set(item.find(".header .image"), { backgroundImage:"url("+$(item_list).find(".image").attr("ref-img")+")" });
                                        timeline.to(item, 0.5, {alpha:1, display:"block", ease:Cubic.easeIn});
                                        timeline.to(item, 0.5, {left:0, top:0, width:"100%", height:"100%", ease:Expo.easeOut});
                                        timeline.set(item.find(".header .image"), {backgroundAttachment:"fixed"});
                                    // add texts
                                        timeline.set(item.find(".header .texts"), {alpha:1});
                                        timeline.staggerFromTo($(item).find(".header .texts").children(), 0.7, {top:50, alpha:0}, {top:5, alpha:1, ease:Expo.easeOut}, 0.1, "-=0.2");
                                    // content
                                        timeline.set(item.find(".header"), {position:"relative", height:$(window).height()});
                                        timeline.set(item, {overflowY:"auto"});
                                        timeline.set(item.find(".content"), {display:"block"});
                                        timeline.add( function(){ $(old).remove(); });
                                        timeline.add( function(){  
                                            var data = {}
                                            data["id"] = portfolio.data[index].id;
                                            jQuery.ajax({url:"html/portfolio/p_content.php", type:"POST", data:data, success:portfolio.onLoadContent});
                                        });
                                //--
                        }else if(cuppa.managerURL.path_array[2]){
                            menu.showBack(true, "favicon/portfolio", "");
                            TweenMax.set("body", {overflow:"hidden"});
                            var item_list = $(".portfolio ."+cuppa.managerURL.path_array[2]);
                            var index = item_list.attr("index"); if(!index) return;
                            var dim = cuppa.dimentions(item_list);
                            var item = $(".portfolio_data_temp").clone();
                                item.addClass("portfolio_data").removeClass("portfolio_data_temp");
                                item.attr("ref", cuppa.managerURL.path_array[2]);
                                item.css({opacity:0, display:"none", left:dim.x3, top:dim.y3, width:dim.width, height:dim.height });
                                item.css({ backgroundColor:item_list.parent().find(".box1").css("background-color") });
                                item.find(".header .texts").html(portfolio.data[index].banner_text.replace("media/","administrator/media/"));
                                $(".portfolio").after(item);
                                //++ Tweenmax
                                    var timeline = new TimelineMax();
                                        timeline.to(item, 0.5, {alpha:1, display:"block", ease:Cubic.easeIn});
                                        timeline.to(item, 0.5, {left:0, top:0, width:"100%", height:"100%", ease:Expo.easeOut});
                                        timeline.fromTo(item.find(".header .image"), 0.6, {opacity:1, backgroundImage:"url("+$(item_list).find(".image").attr("ref-img")+")" }, {alpha:1, ease:Cubic.easeOut});
                                        timeline.set(item.find(".header .image"), {backgroundAttachment:"fixed"});
                                    // add texts
                                        timeline.staggerFromTo($(item).find(".header .texts").children(), 0.7, {top:50, alpha:0}, {top:5, alpha:1, ease:Expo.easeOut}, 0.1, "-=0.2");
                                    // content
                                        timeline.set(item.find(".header"), {position:"relative", height:$(window).height()});
                                        timeline.set(item.find(".content"), {display:"block"});
                                        timeline.to(item, 0.2, {overflowY:"scroll", onComplete:function(){ cuppa.wheelSmooth(".portfolio_data"); }});
                                        if($(window).width() <= 1100){ timeline.set(".portfolio", {display:"none"}); }
                                //--
                                var data = {}
                                    data["id"] = portfolio.data[index].id;
                                jQuery.ajax({url:"html/portfolio/p_content.php", type:"POST", data:data, success:portfolio.onLoadContent});
                        }else if(!cuppa.managerURL.path_array[2] && $(".portfolio_data").get().length){
                            if($(window).width() <= 1100) TweenMax.set(".portfolio", {display:"block"});
                            menu.showBack(false);
                            var item_list = $(".portfolio ."+$(".portfolio_data").attr("ref"));
                            TweenMax.set(".portfolio_data", {overflow:"hidden"});
                            TweenMax.set("body", {overflow:"auto"});
                            //++ Tweenmax
                                var dim = cuppa.dimentions(item_list);
                                cuppa.moveContent(".portfolio_data", ".portfolio_data", false, true, 0, 0, 0.4, Cubic.easeInOut);
                                TweenMax.delayedCall(0.6, function(){
                                    var timeline = new TimelineMax();
                                        timeline.to(".portfolio_data .header", 0, {position:"absolute", bottom:0, height:"auto", zIndex:2});
                                        timeline.to(".portfolio_data .header", 0, {position:"absolute", bottom:0, height:"auto", zIndex:2});
                                        timeline.to(".portfolio_data .header .texts, .portfolio_data .content", 0.4, {opacity:0, ease:Cubic.easeInOut});
                                        timeline.to(".portfolio_data", 0, {position:"fixed", left:0, top:0, width:"100%", height:"100%"});
                                        timeline.to(".portfolio_data", 0.5, { transform:$(item_list).parent().css("transform"), left:dim.x3, top:dim.y3, width:dim.width, height:dim.height, ease:Expo.easeOut});
                                        timeline.to(".portfolio_data", 0.3, {alpha:0}, "-=0.3");
                                        timeline.add( function(){ $(".portfolio_data").remove(); portfolio.resize();  });
                                });
                            //--
                        }
                    }
                //--
                //++
                    portfolio.onLoadContent = function(result){
                        $(".portfolio_data .content").html(result);
                    }
                //--
                //++ RollOver / RollOut
                    portfolio.rollOver = function(e){
                        TweenMax.to(jQuery(this).find(".box2 .image"), 30, {scale:1.5, ease:Linear.easeNone });
                    }; cuppa.addEventListener("mouseenter", portfolio.rollOver, ".portfolio .item", "portfolio");
                    
                    portfolio.rollOut = function(e){
                        TweenMax.to(jQuery(this).find(".box2 .image"), 2, {scale:1, ease:Cubic.easeInOut } )
                    }; cuppa.addEventListener("mouseleave", portfolio.rollOut, ".portfolio .item", "portfolio");
                //--
                 //++ Scroll
                    portfolio.onScroll = function(){
                         $($(".portfolio .item")).each(function(){
                            var dim  = cuppa.dim(this);
                            var percent = cuppa.percent(dim.y, -dim.height, $(window).height(), true );
                            TweenMax.set(this, {
                                        alpha:1*Math.sin(percent*Math.PI), 
                                        z:(-300*Math.sin(percent*Math.PI)+300)*-1,
                                        rotationX:-45*Math.cos(percent*Math.PI),
                                        transformPerspective:1000, transformStyle:"preserve-3d"
                                    });
                         });
                    }
                //--
                //++ resize
                    portfolio.resize = function(){
                        $(".portfolio .item_type1").each(function(){
                           $(this).height(cuppa.dimentions(this).width*0.56); 
                        });
                        $(".portfolio .item_type2").each(function(){
                           if($(window).width() <= 800) $(this).height(cuppa.dimentions(this).width*0.56); 
                           else $(this).height(cuppa.dimentions(this).width); 
                        });
                        
                        var dim = cuppa.dim(".portfolio .item");
                        var center = ($(window).height()-dim.height)*0.5;
                        if(center > 0 ){
                            TweenMax.set(".portfolio", {paddingTop:center});
                            TweenMax.set(".portfolio", {paddingBottom:center});
                        }
                        cuppa.wheelSmooth(".wrap3");
                    };
                //--
                //++ onRemoved
                    portfolio.end = function(){
                        cuppa.removeEventGroup("portfolio");
                    }
                //--
                //++ init
                    portfolio.init = function(){
                        cuppa.addRemoveListener(".portfolio", portfolio.end);
                        cuppa.addEventListener("resize", portfolio.resize, window, "portfolio"); portfolio.resize();
                        cuppa.managerURL.updateLinks(".portfolio .link", true, "portfolio");
                        cuppa.managerURL.addListener(portfolio.openProject, "portfolio"); portfolio.openProject();
                        $(".portfolio .item").bind("mouseenter", function(){
                            TweenMax.killTweensOf($(this).find(".data").children());
                            var timeline = new TimelineMax();
                                timeline.staggerFromTo($(this).find(".data").children(), 0.3, {top:50, alpha:0}, {top:0, alpha:1, ease:Cubic.easeOut }, 0.1, "+=0.2");
                        });
                        $(".wrap3").scroll(portfolio.onScroll); portfolio.onScroll();
                    }; cuppa.addEventListener("ready",  portfolio.init, document, "portfolio");
                //--