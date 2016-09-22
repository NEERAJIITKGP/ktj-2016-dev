function menuState2(){
    return true
    }
function closePopup(){
    console.log('pos1');

    $('.exhi_pop').css('transform','translateY(-5000px)');
    $('.popout').animate({
        opacity:0,
        },500,'swing',function(e){
        $(this).hide();
        });
}
$(document).ready(function(e) {
    $('.outerSpace').click(function(){
        closePopup();
        console.log('pos1');
        });
});

function hidework(){
     $('.work_rel>div').addClass('exhi_pop');
    $('.work_rel>div').removeClass('exhi_content');
    setTimeout(function(){$('.popout div').hide();$(".popout").hide();},500);

}

function openPopup(id){
    var data=$('#item'+id).html();
    $('.exhi_pop').html(data);
        $('.exhi_pop').css('transform','translateY(-5000px)');

    $('.popout').show();
    $('.popout').animate({
        opacity:0.9,
        },500,'swing',function(e){
        });

    $('.exhi_pop').css('transform','translateY(0)');

}
