 try {
        var ws = new WebSocket("ws://193.43.210.54:80");
        $("#player_name").focus();

        $('#player_name').keyup(function (e) {
            if (this.value.trim() == "") {
                $('#btn_start').addClass("ui-disabled");
            } else {
                $('#btn_start').removeClass('ui-disabled');
                if (e.which == 13) send_name();
            }
        });

        $('[name=enter_game]').click(function (btn) {
            //$('#enter_game').click(function(btn){
            console.log(btn.target.value);
            ws.send('{"enter_game":"' + btn.target.value + '"}');
            if (btn.target.value == "create_game") {
                $('#enter_game').hide(1000);
            } else if (btn.target.value == "join_game") {
                $('#enter_game').hide(1000);
                $('#players_list').show(1000);
            }
        });

        $('#player_list').click(function (e) {
            console.log(e.target.id);
            ws.send('{"selected_player":"' + e.target.id + '"}');
        });


        function send_name() {
            if ($('#player_name').val() != "") {
                ws.send('{"player_name":"' + $('#player_name').val() + '"}');
                $('#btn_start').hide(1000);
                $('#player_name').hide(1000);
                $('#enter_game').show(1000);
            }
        }


        ws.onmessage = function (event) {
            if (event.data) {
                var msg = JSON.parse(event.data);
                if(msg.register){
                    $('#msg').text(msg.register);
                }
                else if(msg.create_game){
                    $('#msg').text(msg.create_game);
                }
                else if(msg.players){
                    var player_list = $("#player_list");
                    var j = 0;
                    for (var key in msg.players) {
                        j++;
                        if (Object.keys(msg.players).length == j) {
                            $('#player_list').append($("<li id='" + key + "' class='ui-li ui-li-static ui-btn-up-c ui-last-child' data-theme='c'/>").text(msg.players[key]))
                        } else {
                            $('#player_list').append($("<li id='" + key + "' class='ui-li ui-li-static ui-btn-up-c' data-theme='c'/>").text(msg.players[key]))
                        }
                    }
                    player_list.show();
                    console.log(msg.players);
                }
                else if(msg.begin_game){
                    $('#msg').text(msg.begin_game);
                    $("#player_list").hide(1000);
                }

            }

        };

        ws.onopen = function () {
            console.log('open connection');
        };

        ws.onclose = function (event) {
            if (event.wasClean) {
                console.log('was clean');
            } else {
                console.log('not clean');
                console.log(event);
            }
        };
        ws.onerror = function (error) {
            console.log(error);
        };
    } catch (e) {
        $('body').append(e + '<br>');
    }
