var i=0;
var main_section;
var post;
var top;
var left;
var width;
var height;


function init()
{
    main_section=document.getElementById("main_section").innerHTML;
    //a=$("#main_section").children().length;
    $(".blog_post").addClass("blog_load");
    $(".blog_post").click(function (e){OpenPost(this);});
    $("#home_button").click(reset);
    $('body').click(function(){$('.blog_post footer div:nth-child(2)').css('vertical-align','middle');console.log('hey');});
}

function OpenPost(a)
{
    post=a.innerHTML;
    left=a.offsetLeft;
    top=a.offsetTop;
    height=a.offsetHeight;
    width=a.offsetWidth;
    $("#post").show();
    $("#post").css("opacity",'1');
    $("#post").css("left",left+"px");
    $("#post").css("top",top+'px');
    $("#post").css("width",width+'px');
    $("#post").css("height",height+'px');
    $("#main_section").animate({'scrollTop':'0px'},100);
    
    $("#post").animate({
        opacity:'1',
        width:'100%',
        height:'90%',
        left:"0px",
        top:"0px"
    },200,"swing");
    $("#blog_data").html(post);
    $("#blog_data").addClass("blog_post");
    $("#blog_data").css("flex",'1');
    $("#blog_data").css("height",'100%');
    
    //$("#post").css("position","absolute");
    $("#blog_data").css("opacity","1");
    //$("#post").css("padding","10px");
    $("#main_section").css("overflow","hidden");
    $("#blog_data").children("article").css("overflowY","scroll");
    $("#blog_data").children("article").css("padding-right","10px");
    
}

function reset()
{
    $("#post").removeClass("blog_post");
    $("#post").animate({
        width:width+'px',
        height:height+'px',
        left:left+"px",
        top:top+"px",        
        opacity:"1",
    },200,"swing",function(){$("#post").hide();$("#blog_data").html("");});
    //$(".blog_post").removeClass("blog_load");
    //$("#post").css("width",'0px');
    //$(".blog_post").addClass("blog_load");
    $("#main_section").css("overflow-y","scroll");
    
}