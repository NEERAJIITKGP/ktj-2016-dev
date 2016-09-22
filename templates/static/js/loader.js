var limit = 30;
var superLoaded = false;
var entered = false;

function allowEnter(){
	$("#loading-page").fadeOut();
    $("#super-container").animate({opacity:1}, 300);
    $('body').css('height', '');
    entered = true;
    setTimeout(function(){
    	routeUrl();
    }, 500);
}

$('#super-container').ready( function(){
	superLoaded = true;
});

function startLoad(){
	var randPcnt = 0;
	var intervalID = setInterval( function(){
		var limit = Math.floor((Math.random()*30)+10);
		randPcnt += Math.floor((Math.random()*limit)+30);
		if (randPcnt>=40) {
			clearInterval(intervalID);
			randPcnt = Math.floor((Math.random()*10)+50) + '%';
			drawCircle(randPcnt);
			if (superLoaded) {
				setTimeout(function(){
					drawCircle("100%");
					$('#percent-box').fadeOut();
					setTimeout(function(){
                        $('#onload-enter-button').css('display', '-webkit-flex');
						$('#onload-enter-button').css('display', 'flex');
						$('#onload-enter-text').animate({opacity: 1}, 500);
						$('#onload-enter-text').css('height', '40px');
						$('body').keypress(function(e) {
						    if (e.which == 13 && entered == false) {
						        allowEnter();
						    }
						});
					},800);
				}, 1200);
			}
		}
		randPcntStr = randPcnt;
		drawCircle(randPcntStr);
		$('#percent-box').html(randPcntStr);
		$('#percent-box').css('left',randPcntStr);
	}, 700);
	
}

function drawCircle(randPcnt){
	$('#progress-overlay-bar').animate({width: randPcnt}, 600);
	circlePcnt = (parseInt(randPcnt.slice(0,-1))*4)+'px';
	$('#loading-center-circle').animate({height: circlePcnt, width: circlePcnt}, 600, 'linear');
}
