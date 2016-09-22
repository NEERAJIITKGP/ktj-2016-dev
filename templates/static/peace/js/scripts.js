function loadhash(hash)
{
$('.menu-item').removeClass('menu-item-active');
$('.menu-item'+hash+'-menu').addClass('menu-item-active');

var page='/static/peace/html/'+hash.substring(1)+'.html';
$('#page_content').load(page);
$('#content_head').html(hash.substring(1));

}

$('document').ready(function(){

if(window.location.hash!="" && window.location.hash)
{	
	if (window.location.hash == '#registration')
		loadBottom(window.location.hash);
	else
		loadHash(window.location.hash);
}
});

function sankalp_reg(id)
{
    $("#sankalp_"+id+"_01").load('/eventreg/register_sankalp')
}