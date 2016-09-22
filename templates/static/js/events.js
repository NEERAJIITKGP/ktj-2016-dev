 
function changeGenre(genre_no){
    $(".select_genre_container").attr("class", "genre_container");
    $("#cont_genre_"+genre_no).attr("class", "select_genre_container");

    var select_genre = $('.mid_container_genre_selected');
    select_genre.attr('class', 'mid_container_genre' );
    $('#genre_'+genre_no).attr('class', 'mid_container_genre_selected');
    //Hide the select genre page //
    $('.icon_genre_holder').hide();
    $('#ev_h').hide();
    var cl_g ;
    for(cl_g=1;cl_g<=9;cl_g++){
        if(cl_g!=genre_no)  $('#ev_genre_'+cl_g).hide();
        else {
            $('#ev_genre_'+genre_no).show();
            $('#ev_genre_'+genre_no+'>#ev_tile_group').show();   
        }
    }
    //show the genre tile page //
    $('.genre_title_'+genre_no).show();
    // Resetting the event tile
    $("#ev_genre_"+genre_no+" .overlay_tile_ev_select").attr("class", "overlay_tile_ev");
    $(".ev_menu").hide(1000);
    $('.event_container_selected').hide();
    //$('#genre_'+genre_no+'>#ev_tile_group>div:first-child>.overlay_tile_ev').attr("class", "overlay_tile_ev_select");

    // Resetting the event
    var select_event = $('#genre_'+genre_no+'>.event_container_selected');
    select_event.attr('class', 'event_container' );
    $('#genre_'+genre_no+'>div[class^=event_container]:first-child').attr('class', 'event_container_selected');
    
    // Resetting the event info selector
    $('#genre_'+genre_no+'>div[class^=event_container]:first-child .logo_container_right_select').attr('class', 'logo_container_right');
    $('#genre_'+genre_no+'>div[class^=event_container]:first-child #right_pane>#bot_line_right>.nav_li_right:first-child div').attr('class', 'logo_container_right_select');
    // Resetting the event
    //var select_info = $("#genre_"+genre_no+">div[class^=event_container]:first-child .event-matter-selected");
    //select_info.attr("class", "event-matter");
    //$("#genre_"+genre_no+">div[class^=event_container]:first-child>#center_pane>#event_details>div:nth-child(2)").attr("class", "event-matter-selected scroll");
}


function changeEvent(event_id){
    if ($('#event_info_'+event_id).parent().prop('className')!='mid_container_genre_selected'){
        var eveS=$('#event_info_'+event_id).parent().attr('id');
        var intS=eveS.replace( /^\D+/g, '');
        var gen_num=parseInt(intS);
        changeGenre(gen_num);
    }
    var evenS=$('#event_info_'+event_id).parent().attr('id');
    var dintS=evenS.replace( /^\D+/g, '');
    var gen_numd=parseInt(dintS);
    $(".overlay_tile_ev_select").attr("class", "overlay_tile_ev");
    $("#ev_"+event_id+" span").attr("class", "overlay_tile_ev_select");

    var select_event = $('.event_container_selected');
    select_event.attr('class', 'event_container' );
    $('#event_info_'+event_id).attr('class', 'event_container_selected');
    $('#ev_genre_'+gen_numd).hide();
    $('.genre_title_'+gen_numd).hide();
    $('#ev_tile_group').hide();
    $('#event_info_'+event_id).show();
    //$("#event_"+event_id+"_01").attr("class", "event-matter-selected ev_scroll");
    //changeEventInfo(1, event_id);

    history.replaceState({a:'events'},'events','/events/'+uncapitalise(eventNameIndex[event_id]));
}

function changeEventInfo(info_id, event_id){
    $(".logo_container_right_select").attr("class", "logo_container_right");
    $("#event_info_"+event_id+" #info_cont_"+info_id).attr("class", "logo_container_right_select");

    var select_info = $("#event_info_"+event_id+" .event-matter-selected");
    select_info.attr("class", "event-matter");
    $("#event_"+event_id+"_0"+info_id).attr("class", "event-matter-selected ev_scroll");
}

function uncapitalise(word){
    word = word.toLowerCase();
    word = word.replace(/\s+/g, '');
    return word;
}

function eveSearch(k){
    var sresultArray= new Array;
    for( evens in eventNameIndex){
        var sresult = eventNameIndex[evens].search(k);
        if (sresult!=-1){              
            sresultArray.push(evens);
        }
    }
    var out='';
    for ( evens in sresultArray){ 
        k=sresultArray[evens];
        out+='<option value="'+evens+'"  onclick="changeEvent('+evens+');">'+eventNameIndex[k]+'</option>';
    }
    return out;
    
}

