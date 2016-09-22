var OPTION={
    1:'red',
    2:'blue',
    3:'green',
    5:'orange',
    4:'white',
    6:'yellow',
    7:'brown',
    8:'violet',
}
var TRAIL={
    1:0,
    2:0,
    3:0,
    4:0,
}
var SELECTED=-1;
function reset(){
    TRAIL={
    1:0,
    2:0,
    3:0,
    4:0,
}    
}
function startNewGame(){
    var a=$('backupGame').html();
    $('#game table').html('');
    $('#game table').html(a);
    $('#notification').fadeOut();
    getGame();
    getStats();
}
function setOptionColors(){
    var a=$('#options>.game_circle');
    for (var i=0;i<a.length;i++){
        var opt=OPTION[i+1];
        $(a[i]).css('background',opt);
    }
}
$(document).ready(
    function(){
        ActivateOptions();
        getHistory();
        getGame();
        setOptionColors();
        $('.overlay').hide();   
        setTrailClicks();
        setSubmitClick();
        $('#newGame').click(function(){startNewGame();});
        $('game .game_peg').removeAttr('background');
        $('#notification').fadeOut();
        getStats();
    }
);
function setSubmitClick(){
    $('.submit').click(function(){
        var out='';
        var input=true;
        for (var i=0;i<4;i++)
        {
            if (TRAIL[i+1]==0) 
                input=false;
            out+=TRAIL[i+1].toString();
        }
        submitAnswer(out,input);
    });
}
function resetTrail(){
    $('#trail>.game_circle').css('background','');
    reset();
}
function setTrailClicks(){    
        $('#trail>.game_circle').click(
            function(){
                if (SELECTED!=-1){
                    var temp = $(this).attr('id').substring(1,2);
                    var id=parseInt(temp);
                    $(this).css('background',OPTION[SELECTED]);
                    TRAIL[id]=SELECTED;
                    SELECTED=-1;
                }
            }
        );    
}
function showNotification(msg){
    $('#notification').fadeIn();
    $('#notification #msg').html(msg);
}
function getGame(){
    $.ajax({
        url:'/cryptex/getquestion',
        method:'GET',
        success: function(data){
            if(data['is_new_question']) startNewGame();
            for (var i=0;i<Object.keys(data['trails']).length;i++){
                addTrail(data['trails'][i].trail,data['trails'][i]['white'],data['trails'][i]['blue']);
            }
        }
    });
    return true;
}
function ActivateOptions(){
    $('#options>.game_circle').click(function(){
        var id=$(this).attr('id').substring(1,2);
        SELECTED=parseInt(id);
    });
}

function getHistory()
{
    return true;
}
function addTrail(receivedtrail,white,blue){    
    var d=$('data game table');
    var c=d.html()
    var a=$('tempdata').html(c);
    var trails=a.children('tbody').children('tr').children('.trail').children();
    for (var i=0;i<trails.length;i++){
        var it=receivedtrail[i].toString();
        $(trails[i]).css('background',OPTION[it]);
    }
    var pegs=a.children('tbody').children('tr').children('.pegs').children();
    for (var i=0;i<pegs.length;i++){
        for (var x=i;x<white;x++){
            $(pegs[x]).css('background','white');    
        }i=x;
        for (var y=0;y<blue;y++){
            $(pegs[x+y]).css('background','blue');
        }break;
    }
    var b=a.html();
    $('#game table').append(b);
}
function getStats(){
    $.ajax({
        url:'/cryptex/getstats',
        success:function(data){
            $('#won').html(data['won']);
            $('#lost').html(data['lost']);
            $('#total').html(data['total']);
            $('#mins').html(data['mins']);
            $('#secs').html(data['secs']);   
        }
    })
}
function submitAnswer(trail,input){
    getStats();
    if (!input)
        alert('Enter All Balls');
    else{
        $.ajax({
            url:'/cryptex/submitanswer',
            method:'GET' ,
            data:{
                answer:trail,
            },
            success:function(data){
                resetTrail();
                addTrail(data['trail'],data['white'],data['blue']);

                if (data['is_completed']){
                    if (data['is_won']){
                        console.log("you Won");
                        var mins=data['mins'].toString()
                        var secs=data['secs'].toString()
                        var out="You Won!<br><br>Time taken "+mins+':'+secs;
                        showNotification(out);
                    }
                    else {  
                        showNotification('You Lost');
                        console.log('you lost');
                    }
                }
                else{

                }
            },
        });    
    }
}