function menuState2(){
    return true
    }
function closeExhiPopup(){
    console.log('pos1');

    $('.exhi_exhipop').css('transform','translateY(-5000px)');
    $('.exhipopout').animate({
        opacity:0,
        },500,'swing',function(e){
        $(this).hide();
        });
}


function openExhiPopup(id){
    var data=$('#exhiitem'+id).html();
    $('.exhi_exhipop').html(data);
        $('.exhi_exhipop').css('transform','translateY(-5000px)');

    $('.exhipopout').show();
    $('.exhipopout').animate({
        opacity:1,
        },500,'swing',function(e){
        });

    $('.exhi_exhipop').css('transform','translateY(0)');

}





    function rotateIn(x){
    
    var div = document.getElementById('in'+x);

    div.style.webkitTransform = 'rotate(90deg)'; 
    div.style.mozTransform    = 'rotate(90deg)'; 
    div.style.msTransform     = 'rotate(90deg)'; 
    div.style.oTransform      = 'rotate(90deg)'; 
    div.style.transform       = 'rotate(90deg)'; 

    var div = document.getElementById('mid'+x);

    div.style.webkitTransform = 'rotate(-90deg)'; 
    div.style.mozTransform    = 'rotate(-90deg)'; 
    div.style.msTransform     = 'rotate(-90deg)'; 
    div.style.oTransform      = 'rotate(-90deg)'; 
    div.style.transform       = 'rotate(-90deg)'; 

    var div = document.getElementById('outer'+x);

    div.style.webkitTransform = 'rotate(90deg)'; 
    div.style.mozTransform    = 'rotate(90deg)'; 
    div.style.msTransform     = 'rotate(90deg)'; 
    div.style.oTransform      = 'rotate(90deg)'; 
    div.style.transform       = 'rotate(90deg)'; 

    }
    function rotateOut(x){
    var div = document.getElementById('in'+x);

    div.style.webkitTransform = 'rotate(-90deg)'; 
    div.style.mozTransform    = 'rotate(-90deg)'; 
    div.style.msTransform     = 'rotate(-90deg)'; 
    div.style.oTransform      = 'rotate(-90deg)'; 
    div.style.transform       = 'rotate(-90deg)'; 
    var div = document.getElementById('mid'+x);

    div.style.webkitTransform = 'rotate(90deg)'; 
    div.style.mozTransform    = 'rotate(90deg)'; 
    div.style.msTransform     = 'rotate(90deg)'; 
    div.style.oTransform      = 'rotate(90deg)'; 
    div.style.transform       = 'rotate(90deg)'; 
    var div = document.getElementById('outer'+x);

    div.style.webkitTransform = 'rotate(-90deg)'; 
    div.style.mozTransform    = 'rotate(-90deg)'; 
    div.style.msTransform     = 'rotate(-90deg)'; 
    div.style.oTransform      = 'rotate(-90deg)'; 
    div.style.transform       = 'rotate(-90deg)'; 

    }