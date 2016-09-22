var ajax_loader_myktj = '<img src="http://ktj.in/static/images/loading/loading.gif" style="padding:10%"/>';

//function for Registering for a event from event page!
function event_reg(id)
{
    if (id==1000)
        $("#event_"+id+"_06_01").load('/eventreg/register_w');
    else
        $("#event_"+id+"_06_01").load('/eventreg/register?id='+id);
}

function digital_reg(id)
{
    $("#digital_"+id+"_01").load('/eventreg/register_digital')
}
function blockchain_reg(id)
{
    $("#blockchain_"+id+"_03").load('/eventreg/register_blockchain')
}
function digitalworkshop_reg(id)
{
    $("#digital_"+id+"_02").load('/eventreg/register_digitalworkshop')
}
function openMyKtj () {
        updateAjax();
        $("#myktj_container").animate({left:"0%"},700);
        $(".section-container").animate({opacity:"0"},700);
}

function closeMyKtj () {
        $("#myktj_container").animate({left:"-200%"},700);
        $(".section-container").animate({opacity:"1"},700);
}


function mFillProfile () {
    $('#content_block').html(ajax_loader_myktj);
    $('#content_block').load('/accounts/myktjprofile');
}

function mFillPass () {
    $('#content_block').html(ajax_loader_myktj);
    $('#content_block').load('/accounts/myktjpassword');
}

function mFillTeam () {
    $('#content_block').html(ajax_loader_myktj);
    $('#content_block').load('/accounts/myktjteam');
}

function mFillInvites () {
    $('#content_block').html(ajax_loader_myktj);
    $('#content_block').load(URLS.ACCOUNTS + 'myktjteam/invites');
}

function mFillInstructions () {
    $('#content_block').html(ajax_loader_myktj);
    $('#content_block').load(URLS.ACCOUNTS + 'myktjinstructions');
}



function mFillUpload () {
    $('#content_block').html(ajax_loader_myktj);
    $('#content_block').load('/accounts/fileupload');
}

function update_profile() {
    var token = $('input[name="csrfmiddlewaretoken"]').prop('value');
    var values = $('#update_profile').serialize();
    $('#content_block').html(ajax_loader_myktj);
    $.ajax({
        url: '/accounts/myktjprofilesave',
        type: 'POST',
        data: values,
        success: function (data) {
            $('#content_block').load('/accounts/myktjprofile');
        },
        error: function(jqXHR, textStatus, errorThrown) {},
    }).done(function(){
        $('#content_block').load('/accounts/myktjprofile');
    });
}


function update_password() {
    var token = $('input[name="csrfmiddlewaretoken"]').prop('value');
    var values = $('#update_password').serialize();
    $('#content_block').html(ajax_loader_myktj);
    $.ajax({
        url: '/accounts/myktjpassword/',
        type: 'POST',
        data: values,
        success: function (errorMsg) {
            $('#content_block').load('/accounts/myktjpassword');
            setTimeout( function(){
                $("span#passwordErrMsg").html(errorMsg);
                $("span#passwordErrMsg").fadeIn();
            }, 1000);
        },
        error: function(jqXHR, textStatus, errorThrown) {},
    });
}


// $('#id_institution').html("<option disabled>Choose a state first...</option>");

$(document).on('change', '#id_state', function() {
    console.log($("#id_state>option:selected").attr('value'));
    url = '/accounts/minstitutes/' + encodeURIComponent($("#id_state>option:selected").attr('value'));
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

var URLS={ACCOUNTS:'/accounts/'};
var ajax_loader_myktj = '<img src="/static/images/loading/mktjload.gif" style="padding:10%"/>';

function create_team() {
    var values = $('#team_reg_form').serialize();
    if(confirm('Are you sure you want to form the team for this event?')){
        $('#makeTeam_container').html(ajax_loader_myktj);
        $.ajax({
            url: URLS.ACCOUNTS + 'saveteam',
            type: 'POST',
            data: values,
            success: function (data) {
                $('#content_block').load(URLS.ACCOUNTS + 'myktjteam');
            },
            error: function(jqXHR, textStatus, errorThrown) {},
        }).done(function(){
            $('#content_block').load(URLS.ACCOUNTS + 'myktjteam');
        });
    }
}

function register_event() {
    var values = $('#eventReg_form').serialize();
    $('#makeTeam_container').html(ajax_loader_myktj);
    $.ajax({
        url: URLS.ACCOUNTS + 'saveEvReg',
        type: 'POST',
        data: values,
        success: function (data) {
            $('#content_block').load(URLS.ACCOUNTS + 'myktjteam');
        },
        error: function(jqXHR, textStatus, errorThrown) {},
    }).done(function(){
        $('#content_block').load(URLS.ACCOUNTS + 'myktjteam');
    });
}

function display_invites() {
    $('#dispay_team').removeClass('team_cont_tab_select').addClass('team_cont_tab');
    $('#dispay_invites').removeClass('team_cont_tab').addClass('team_cont_tab_select');
    $('#content_block').load(URLS.ACCOUNTS + 'myktjteam/invites');
}

function showDialogue(content, header) {
    if (content != undefined) $('#dialogue-content').html(content);
    if (header != undefined) $('#dialogue-header').html(header);
    $('#dialogue-wrapper').fadeIn();
}

function removeTeam(team_id) {        
    var invite={team_id:team_id}
    if(confirm('Are you sure you want to remove the team?'))
    {
    $.ajax({
                url:'/accounts/removeTeam',
                type:'POST',
                data:invite,
                success:function(data){
                    showDialogue(data, "<h4>Exit Team</h4>");
                    $('#content_block').load(URLS.ACCOUNTS + 'myktjteam');
                },
                error:function(data){
                    showDialogue(data.responseText, "<h4>Exit Team</h4>");
                    console.log(data);
                }
            });
   }
}

function exitTeam(team_id) {        
    var invite={team_id:team_id}
    if(confirm('Are you sure you want to exit the team?'))
    {
    $.ajax({
                url:'/accounts/exitTeam',
                type:'POST',
                data:invite,
                success:function(data){
                    showDialogue(data, "<h4>Exit Team</h4>");
                    $('#content_block').load(URLS.ACCOUNTS + 'myktjteam');
                },
                error:function(data){
                    showDialogue(data.responseText, "<h4>Exit Team</h4>");
                    console.log(data);
                }
            });
   }
}


function invite(team_id,user_id) {

    var invite={team_id:team_id,user_id:user_id}
    $.ajax({
                url:'/accounts/invite',
                type:'POST',
                data:invite,
                success:function(data){
                    showDialogue(data, "<h4>Invite Members</h4>");
                    setTimeout(function(){
                        $('#content_block').load(URLS.ACCOUNTS + 'myktjteam');
                    }, 1000);
                },
                error:function(data){
                    showDialogue(data.responseText, "<h4>Invite Members</h4>");
                    console.log(data);
                }
            });
}

function search(team_id) {

    var qry = $('#query'+team_id).val();
    console.log($('#query'+team_id).val());
    var team = {search:qry, tid:team_id}
    $.ajax({
                url:'/accounts/search',
                type:'GET',
                data:team,
                success:function(data){
                    $('#search'+team_id).html(data);
                },
                error:function(data){
                    $('#search'+team_id).html('No Results Found');
                }
            });
}

function deleteRequest(invite_id) {
    if(confirm('Are you sure you want to delete this inviation?')) {
        var inv={id:invite_id}
        $.ajax({
                    url:'/accounts/deleteInvite',
                    type:'POST',
                    data:inv,
                    success:function(data){
                        showDialogue(data, "<h4>Team Request</h4>");
                        $('#content_block').load(URLS.ACCOUNTS + 'myktjteam/invites');
                    },
                    error:function(data){
                        showDialogue(data.responseText, "<h4>Team Request</h4>"); 
                        console.log(data);
                    }
                });
    }
}

function accept(invite_id) {
    if(confirm('Are you sure you want to accept this inviation?')) {
        var inv={id:invite_id}
        $.ajax({
                    url:'/accounts/acceptInvite',
                    type:'POST',
                    data:inv,
                    success:function(data){
                        showDialogue(data, "<h4>Team Request</h4>");
                        $('#content_block').load(URLS.ACCOUNTS + 'myktjteam/invites');
                    },
                    error:function(data){
                        showDialogue(data.responseText, "<h4>Team Request</h4>"); 
                        console.log(data);
                    }
                });
    }
}


$('#dialogue-close').click(function() {
    $('#dialogue-wrapper').fadeOut();
});

file = null;
progress = null;
eventz = null;
filetype = null

$(document).on('change', "select#upload_event", function() {
    eventz = this.value;
});

function fileUpload(filez) {
    if (filez.type == "application/pdf" || filez.name.toLowerCase().slice("-5") == ".docx" || filez.type =="application/zip") {
        if (filez.type == "application/pdf") {
            filetype = ".pdf"
        }
        else if(filez.name.toLowerCase().slice("-5") == ".docx"){
            filetype = ".docx"
        }
        else if(filez.type =="application/zip") {
            filetype = ".zip"
        }

        $("span#uploadMessage").html("<b>File Name:</b> " + filez.name + "<br/><b>File Size:</b> " + (filez.size / 1024).toFixed(2) + "Kb");
        $("span#uploadMessage").fadeIn();
        file = filez;
    } 
    else {
        $("span#uploadMessage").html("PDF or DOCX file needed");
        $("span#uploadMessage").fadeIn();
    }
}

$(document).on('change', "div#upload input", function() {
    var filez = this.files[0];
    fileUpload(filez);
});

$(document).on('click', "#file_upload_button", function() {
    
    if (file == null){
        $("span#uploadMessage").html("Please select a file to upload!");
        $("span#uploadMessage").fadeIn();
        return;
    }

    if ((file.size/1024) > 2048){
        $("span#uploadMessage").html("File size is more than 5 Mb!<br/>Kindly sent it to submissions@ktj.in, with file name as <event_name>_<team_id>.");
        $("span#uploadMessage").fadeIn();
        return;
    }

    if (eventz == null || eventz == "") {
        $("span#uploadMessage").html("Choose a valid event!");
        $("span#uploadMessage").fadeIn();
        return;
    }
    
    formData = new FormData($("#upload_data"));
    formData.append("sub_file", file);
    formData.append("sub_event", eventz);
    formData.append("sub_filetype", filetype);    
    
    $.ajax({
        url: '/accounts/fileupload',
        type: "POST",
        success:function(data){
            showDialogue(data, "<h4>Team Request</h4>");
            $('#content_block').html(ajax_loader_myktj);
            $('#content_block').load(URLS.ACCOUNTS + 'fileupload');
            setTimeout( function(){
                $("span#uploadMessage").html("File upload successful!");
                $("span#uploadMessage").fadeIn();
            }, 1000);
        },
        error:function(data){
            $('#content_block').html(ajax_loader_myktj);
            $('#content_block').load(URLS.ACCOUNTS + 'fileupload');
            $("span#uploadMessage").html("File upload encountered some error! Please try again later.");
            $("span#uploadMessage").fadeIn();

        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    });


});