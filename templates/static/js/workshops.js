$(document).ready(function(){


    document.getElementById('image2').style.backgroundImage='url("../static/images/ws_icon1/icon1.png")';
    document.getElementById('image3').style.backgroundImage='url("../static/images/ws_icon1/icon2.png")';
    document.getElementById('image4').style.backgroundImage='url("../static/images/ws_icon1/icon3.png")';
    document.getElementById('image5').style.backgroundImage='url("../static/images/ws_icon1/icon4.png")';
    document.getElementById('image6').style.backgroundImage='url("../static/images/ws_icon1/icon5.png")';
    document.getElementById('image7').style.backgroundImage='url("../static/images/ws_icon1/icon6.png")';
    document.getElementById('image8').style.backgroundImage='url("../static/images/ws_icon1/icon7.png")';
    document.getElementById('image9').style.backgroundImage='url("../static/images/ws_icon1/icon8.png")';
    document.getElementById('image10').style.backgroundImage='url("../static/images/ws_icon1/icon9.png")';
    document.getElementById('image11').style.backgroundImage='url("../static/images/ws_icon1/icon10.png")';
    document.getElementById('image12').style.backgroundImage='url("../static/images/ws_icon1/icon11.png")';



    $(".work_container").hide();
});
function hidewwwork(){
    $('#bc').addClass('work_hidden');
    $('#bc').removeClass('work_content');
    setTimeout(function(){$('.work_container div').hide();$(".work_container").hide();},500);

}

function showwwork(wsid){
    var content = $("#work"+wsid).html();
    $('.wwork_rel>div.work_hidden').html(content);
    $('.wwork_rel>div.work_hidden').append("<div class='work_response'></div>");
    $('.wwork_rel>div').show();
    $(".work_container").show();
    $(".layer").show();
    setTimeout(function(){$('.wwork_rel>div').removeClass('work_hidden');},100);
    $('.wwork_rel>div').addClass('work_content');

}



/* New one */
function rotateArrow(x){
    var y=x;
    
    var div = document.getElementById('arrow1');

    div.style.webkitTransform = 'rotate('+x+'deg)'; 
    div.style.mozTransform    = 'rotate('+x+'deg)'; 
    div.style.msTransform     = 'rotate('+x+'deg)'; 
    div.style.oTransform      = 'rotate('+x+'deg)'; 
    div.style.transform       = 'rotate('+x+'deg)'; 


        }

function workreg(id){
    $.ajax(
        {
            url:'/eventreg/workreg',
            data:{
                    'id':id,
                    },
            success:function(data){
                $(".work_response_"+id+"_01").html(data);
                 
            }
        }
  
  );
   
}