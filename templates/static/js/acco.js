var URLS={ACCOUNTS:'/accounts/'};
var ajax_loader = '<img src="/static/images/loading/loading.gif" style="padding:10%"/>';

function pass() {}

$('#home-wrapper').show();
$('#home-acco').css('background','rgb(85, 79, 83)');
$('#instructions-wrapper').hide();
$('#faqs-wrapper').hide();
$('#contact-wrapper').hide();

function showDialogue(content,header){
  if(content != undefined)
    $('#dialogue-content').html(content);
  if(header != undefined)
    $('#dialogue-header').html(header);
  $('#dialogue-wrapper').fadeIn();
}

function save_acco()
  {
   var values=$('#acco-form').serialize();
      $('#acco_content').html(ajax_loader);
   $.ajax({
   	url:'/acco/save',	
   	data:values,
   	type:'POST',
   	success:function(data){    		
        $('#acco_content').html(data);
//  		$('#acco_content').fadeIn();
  		}
   	
   });
  }


function loadDialogue(link,header)
{
 $('#load-dialogue-content').load(link);
  $('#load-dialogue-wrapper').fadeIn();
}    
    
$('#acco_btn').click(function(){
loadDialogue('/acco','Accomodation');
});

$('#acco_btn-center').click(function(){
loadDialogue('/acco','Accomodation');
});

$('#acco_ws').click(function(){
loadDialogue('/acco','Accomodation');
});
    
    
$('#home-acco').click( function(){
	$('#instructions-wrapper').hide();
	$('#faqs-wrapper').hide();
	$('#contact-wrapper').hide();
	$('#home-wrapper').show();
	$('#home-acco').css('background','rgb(85, 79, 83)');
	$('#instructions-acco').css('background','rgb(28, 117, 151)');
	$('#faq-acco').css('background','rgb(28, 117, 151)');
	$('#contact-acco').css('background','rgb(28, 117, 151)');
});

$('#instructions-acco').click( function() {
	$('#home-wrapper').hide();
	$('#faqs-wrapper').hide();
	$('#contact-wrapper').hide();
	$('#instructions-wrapper').show();
	$('#instructions-acco').css('background','rgb(85, 79, 83)');
	$('#home-acco').css('background','rgb(28, 117, 151)');
	$('#faq-acco').css('background','rgb(28, 117, 151)');
	$('#contact-acco').css('background','rgb(28, 117, 151)');
});

$('#faq-acco').click( function() {
	$('#home-wrapper').hide();
	$('#instructions-wrapper').hide();
	$('#contact-wrapper').hide();
	$('#faqs-wrapper').show();
	$('#faq-acco').css('background','rgb(85, 79, 83)');
	$('#instructions-acco').css('background','rgb(28, 117, 151)');
	$('#home-acco').css('background','rgb(28, 117, 151)');
	$('#contact-acco').css('background','rgb(28, 117, 151)');
});

$('#contact-acco').click( function() {
	$('#home-wrapper').hide();
	$('#instructions-wrapper').hide();
	$('#faqs-wrapper').hide();
	$('#contact-wrapper').show();
	$('#contact-acco').css('background','rgb(85, 79, 83)');
	$('#instructions-acco').css('background','rgb(28, 117, 151)');
	$('#faq-acco').css('background','rgb(28, 117, 151)');
	$('#home-acco').css('background','rgb(28, 117, 151)');
});

function check_logged(success, fail) {
    if (success == undefined)
        success = pass;
    if (fail == undefined)
        fail = pass;
    var logged = false;
    $.ajax({
        url: URLS.ACCOUNTS + 'check_logged',
        type: 'POST'
    }).done(function(data) {
        if (data.logged)
            success();
        else
            fail();
    });
}

function login() {
    var token = $('input[name="csrfmiddlewaretoken"]').prop('value');
    var values = $('#login_form').serialize();
    $('#login_container').html(ajax_loader);
    $.ajax({
        url: URLS.ACCOUNTS + 'login',
        type: 'POST',
        data: values
    }).done(function (data) {
        console.log(data);
        check_logged(function () {
            $('#login_container').html(ajax_loader);
            $('#login_container').load(URLS.ACCOUNTS + 'profile');
            setTimeout(closeLogin, 1000);
        },
        $('#login_container').html(data))
    });
}

function signup() {
    var token = $('input[name="csrfmiddlewaretoken"]').prop('value');
    var values = $('#signup_form').serialize();
    $('#registration_container').html(ajax_loader);
    $.ajax({
        url: URLS.ACCOUNTS + 'signup',
        type: 'POST',
        data: values,
        success: function (data) {
            check_logged($('#registration_container').html(data))
                         
        },
        error: function(jqXHR, textStatus, errorThrown) {},
    });
}


function logout() {
    $.ajax({
        url: URLS.ACCOUNTS + 'logout',
        type: 'POST'
    }).done(function(data) {
        check_logged(pass, logged_out);
    });
    check_logged(pass, logged_out);
}

function logged_out() {
    $('#registration_container').html(ajax_loader);
    $('#login_container').html(ajax_loader);
    userNotLogged();
}


$(document).on('change', '#id_state', function() {
        url = URLS.ACCOUNTS + 'institutes/' + encodeURIComponent($("#id_state>option:selected").attr('value'));
        console.log($("#id_state>option:selected").attr('value'));
        console.log("Hello ID STate Change" + url);
        $.ajax({
            url: url,
        }).done(function(data) {
            $('#id_institution').html("");
            for (i in data) {
                $('#id_institution').append(
                    '<option value="' + i + '">' +
                    i + '</option>');
            }
        });
});

function userLogged(){
    $('#login_container').load(URLS.ACCOUNTS + 'profile');
    $('#registration_container').load(URLS.ACCOUNTS + 'success');
}

function userNotLogged(){
    $('#registration_container').load(URLS.ACCOUNTS + 'signup');
    $('#login_container').load(URLS.ACCOUNTS + 'login');
}

function updateAjax() {
	$('#registration_container').html(ajax_loader);
	$('#registration_container').load(URLS.ACCOUNTS + 'signup');
    $('#myktj_container').load(URLS.ACCOUNTS+'myktj');
    $('#acco_content').load(URLS.ACCOUNTS+'acco');
    check_logged(userLogged, userNotLogged);
}

$(document).ready(updateAjax);