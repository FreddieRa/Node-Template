$(function() {
    socket = io();    //Gets the socket from the server (?)

    document.addEventListener('keydown', reset);
    function reset(e) {
        if (e.keyCode == 192) {
            socket.emit('reset', null)
        }
    }

    // States
    // 0: waiting to join room or make new one
    // 1: waiting to enter name or press start
    // 2: In game

    // Transitions
    // 0 -> 1: Hide "make room", join the required room
    // 1 -> 2: Hide ["start", "UsersListDiv"]

    state = 0
    name = ""
    timerOn = false
    countDownTimer = 60;
    clicked = false;
    roomID = ""

    // HTML jQuery initalisation

    $('#m').keyup(function(e){
        if (e.keyCode == 13) {submit()}
    });

    $('#SubmitBtn').click(function(){
        submit()
    });

    function submit() {
        let val = $('#m').val()
        if (val.length == 0) {
            return;
        }

        let data = $('#m').val()
        console.log(data)
        socket.emit('chat message', {"user": name, "data": data}); //Sending a message to server
        $('#CaptionsSubmitDiv').hide()  

        $('#m').val('');  //Setter      
        return false;
    }
  
    function setSocket(s) {
        console.log(s)
        s.on('command', function(cmdDict) {
            console.log(cmdDict)
            let cmd = cmdDict.cmd
            let data = cmdDict.data
            switch (cmd) {
                case 'test':
                    //$('#messages').append($('<li>').html('<img src="' + data + '" />'));   //Add gif
                    //window.scrollTo(0, document.body.scrollHeight);
                    $('#gif').attr('src', data)
                    break;
                case 'hide':
                    for (let element of data){
                        $('#'+element).hide()
                    }
                    break;
                case 'show':
                    for (let element of data){
                     $('#'+element).show()
                    }                
                    break;      
          }
        
      });

      s.on('test', function(url) {
        //current votes, score
        countDownTimer = 0;
        timerOn = true;
        // $('#CaptionsListDiv').empty();
        console.log(url);
        $("#winning").show()
        $("#winning").attr("src", url)
        $("#winning").one('load', function(){$("#loader").hide(), $("#BestMeme").show()})
    });

    s.on('refresh', function(_) {
        window.location.reload(false);
    });
        }

}); 


function update() {
    if (timerOn){
        if (countDownTimer > 0) {
            countDownTimer -= 1
            $('#Counter').text(countDownTimer)
        }
        else{
            timerOn = false
            $('#Counter').attr('display', 'none')
        }
    }
}

setInterval(update, 1000); //time is in ms

