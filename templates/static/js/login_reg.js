var URLS={ACCOUNTS:'/accounts/'};
var ajax_loader = '<img src="/static/images/loading/loading.gif" style="padding:10%"/>';

function pass() {}

function openRegfromLogin () {
        $("#login_container").animate({left:"100%"},700);
        $("#registration_container").animate({left:"0%"},700);
}


function openLogin () {
        updateAjax();
        $("#login_container").animate({left:"0%"},700);
        $(".section-container").animate({opacity:"0"},700);
}

function openRegister () {

        $("#registration_container").animate({left:"0%"},700);
        $(".section-container").animate({opacity:"0"},700);
}

function closeLogin () {
        $("#login_container").animate({left:"100%"},700);
        $(".section-container").animate({opacity:"1"},700);
}

function closeRegister () {
        $("#registration_container").animate({left:"200%"},700);
        $(".section-container").animate({opacity:"1"},700);
}

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
    check_logged(userLogged, userNotLogged);
}

$(document).ready(updateAjax);

var tickIndex = 0;

function sponsTick () {
    if (tickIndex>=sponsTickerPost.length) {
        tickIndex=0;
    };
    $("#tick_display_box").animate({left:"-240px"},500, "swing",function(){
        $("#tick_title").html(sponsTickerPost[tickIndex]);
        $("#tick_spons_img img").attr("src", sponsTickerImage[tickIndex]);
        $("#tick_spons_img a").attr("href",sponsTickerLink[tickIndex]);
        tickIndex++;
    });
    $("#tick_display_box").animate({left:"0px"},500);
}
