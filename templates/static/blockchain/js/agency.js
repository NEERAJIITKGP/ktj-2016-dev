/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

function blockchain_reg(id)

{
	
    $("#blockchain_"+id+"_03").load('/eventreg/register_blockchain')
    
    

}


function reg(id)
{

    if(id==1)
    {
        $("#reg_"+id).load('/roboticsworkshop/kolkata')
    }

   else if(id==2)
    {
        $("#reg_"+id).load('/roboticsworkshop/bhubneswar')
    }
    else if(id==3)
    {
        $("#reg_"+id).load('/roboticsworkshop/indore')
    }
   else if(id==4)
    {
        $("#reg_"+id).load('/roboticsworkshop/allahabad')
    }
   else if(id==5)
    {
        $("#reg_"+id).load('/roboticsworkshop/hyderabad')
    }
  else if(id==6)
    {
        $("#reg_"+id).load('/roboticsworkshop/kanpur')
    }
    else if(id==7)
    {
        $("#reg_"+id).load('/roboticsworkshop/lucknow')
    }
   else if(id==8)
    {
        $("#reg_"+id).load('/roboticsworkshop/raipur')
    }
   else if(id==9)
    {
        $("#reg_"+id).load('/roboticsworkshop/rourkela')
    }

}