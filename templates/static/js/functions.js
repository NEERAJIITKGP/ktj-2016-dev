stage = {}
stage.content;
stage.language;
stage.currentLanguage;
stage.path_array;
stage.transform_path;
//++ Init
    stage.init = function(){
        //++ Responsive classes
            for(var i = 400; i <= 1500; i+=100){ cuppa.addResponsiveClass("r"+i, 0, i, i); }
        //--
        //++ Change URL
            jQuery(".wrapper").html("");
            cuppa.managerURL(stage.changeURL, false);
            cuppa.managerURL.addListener(cuppa.googleTrakingHandler, "stage", false);
        //--
        //++ activate page_blocked
            //if( $.browser.msie && $.browser.version <= 10) $(".page_blocked").css("display","block");
        //--
    }; jQuery(document).ready(stage.init);
//--
//++ Change URL
    stage.changeURL = function(){
        //++ Return conditions
            try{ 
                if(stage.path_array[1] == cuppa.managerURL.path_array[1] && cuppa.managerURL.path_array[1] == "portfolio" ) return; 
            }catch(err){ }
        //--
        cuppa.moveContent(".wrap2", ".wrap2", false, true, 0, 0);
        //++ Set language path
            if(!cuppa.managerURL.path_array){
                cuppa.managerURL.path_array = [stage.currentLanguage];
            }else if(cuppa.managerURL.path_array[0] != stage.currentLanguage ){
                cuppa.managerURL.path_array.unshift(stage.currentLanguage);
            }
            stage.path_array = cuppa.managerURL.path_array;
            stage.transform_path = cuppa.managerURL.languageTransform(cuppa.managerURL.path_array, stage.language);
        //--
        ///++
            if(cuppa.managerURL.params.title){
                $(".menu_btn .text").html(cuppa.managerURL.params.title);
            }
        //--
        //++ Set url
            var url = "static/html/home/base.html";
            if(stage.transform_path){
                if(stage.transform_path[1] == "events1") url = "static/html/events/events.html";
                else if(stage.transform_path[1] == "sponsors1") url = "static/html/sponsors/sponsors.html";
                else if(stage.transform_path[1] == "exhibitions1") url = "static/html/exhibitions/exhibitions.html";
                else if(stage.transform_path[1] == "workshops1") url = "static/html/workshops/workshops.html";
                    else if(stage.transform_path[1] == "megashows1") url = "static/html/megashows/megashows.html";
                else if(stage.transform_path[1] == "guests1") url = "static/html/guests/guests.html";
                else if(stage.transform_path[1] == "contacts1") url = "static/html/contacts/contacts.html";
                else if(stage.transform_path[1] == "blog"){
                    if(stage.transform_path[3]){
                        url = "html/blog/blog_article.php";
                    }else{
                        url = "html/blog/blog.php";
                    }
                } 
            }
        //--
        //++ change menu selected
            $(".menu .buttons a").removeClass("selected");
            if(stage.transform_path.length < 2){
                $(".menu .buttons #home").addClass("selected");
            }else{
                $(".menu .buttons #"+stage.transform_path[1]).addClass("selected");
            }
        //--
        //++ fade when is not the menu
            // if( $(".menu").css("display") == "none" ){
            //     var timeline = new TimelineMax();
            //         timeline.fromTo(".menu_btn", 0.4, {x:0}, {x:-100, ease:Expo.easeIn});
            //         timeline.fromTo(".menu", 0.3, {left:0, right:"100%", display:"none"}, {display:"block", right:0, ease:Expo.easeInOut}, "0");    
            // }
        //--
        //++ Load content
            var path = (stage.transform_path) ? stage.transform_path.join("/") : "";
            //if(stage.content) stage.content.ajax.abort();
           // cuppa.blockade({name:"blocakde_transparent"});
            stage.content = cuppa.preloadContent({url:url, name:"wrapper_content", preload:false, data:{path:path} });
            function onComplete(){
                jQuery(".wrapper").html(stage.content);
                //cuppa.blockade({load:false, name:".blocakde_transparent", delay:0.4});
                cuppa.removeEventListener("complete", onComplete, stage.content, "stage");
                menu.show(false);
            }; cuppa.addEventListener("complete", onComplete, stage.content, "stage");
        //--
    }
//--

            
              

            