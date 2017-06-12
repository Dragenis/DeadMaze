function Net() {
    function zero(i) {
        return (i < 10) ? '0' + i : i; //zero(  
    }
    var stage = 1;
    var nick = ""
    var client = io();
    this.lvlUp = function () {
        stage++;
        if (stage == 3) {
            console.log("Koniec wersji demo")
            var czas = ui.stopStoper();
            var d = new Date();
            var date = (zero(d.getDate()) + "-" + zero(d.getMonth()) + "-" + d.getFullYear() + " " + zero(d.getHours()) + ":" + zero(d.getMinutes()) + ":" + zero(d.getSeconds()))
            console.log(czas)
            client.emit("rekord", {
                nick: nick,
                czas: czas,
                data: date
            })
            client.emit("wypisz", {})
            client.emit("reset_graczy");
        }
        ui.changeScreen();
        game.loadMap(stage)
        setTimeout(function () {
            ui.removeLoading();
        }, 1500)

    }
    this.init = function () {



        client.on("onconnect", function (data) {
            if (nick == null || nick.trim() == "") {
                do {
                    nick = prompt("ClientId: " + data.clientId + "\n Name:" + data.clientName)
                }
                while (nick == null || nick.trim() == "")
                switch (data.clientName) {
                    case "Gracz1":
                        game.loadGracz1()
                        if (nick != null) {
                            client.emit("gracz1_setnick", {
                                name: nick
                            })
                            document.getElementById("player_name").innerHTML = nick;
                            chat.setNick(nick)
                            game.loadMap(stage)
                            ui.waitScreen()
                        }
                        break;
                    case "Gracz2":
                        game.loadGracz2()
                        if (nick != null) {
                            client.emit("gracz2_setnick", {
                                name: nick
                            })
                            document.getElementById("player_name").innerHTML = nick;
                            chat.setNick(nick)
                            game.loadMap(stage)
                        }
                        break;
                    case "Spectator":
                        client.emit("get_gracz1")
                        client.emit("get_gracz2")
                        break;
                }
            }


        })
        client.on("get_gracz1", function (data) {
            console.log(data)
        })
        client.on("get_gracz2", function (data) {
            console.log(data)
        })
        client.on("start_game", function () {

            ui.removeLoading();
        })
        client.on("wypisz", function (data) {
            console.log("wypisz")
            console.log(data)
            document.getElementById("rekordy").innerHTML = "";
            var div = document.createElement("div");
            var span = document.createElement("span");
            span.innerHTML = "Dotychczasowe rekordy:";
            div.appendChild(span);
            document.getElementById("rekordy").appendChild(div);
            for (var j = 0; j < data.data.length; j++) {
                var div = document.createElement("div");

                var span = document.createElement("span");
                span.innerHTML = "Nick: " + data.data[j].nick + " ";
                div.appendChild(span);
                var span = document.createElement("span");
                span.innerHTML = " Czas: " + data.data[j].czas;
                div.appendChild(span);
                var span = document.createElement("span");
                span.innerHTML = " Data: " + data.data[j].data;
                div.appendChild(span);
                document.getElementById("rekordy").appendChild(div);
            }

        })
        document.getElementById("reset").addEventListener("click", function () {
            client.emit("reset_graczy");
            game.removeGracz();
        })
        this.sendWiadomosc = function (nick, tekst) {
            client.emit("sendWiadomosc", {
                name: nick,
                tekst: tekst
            })
        }
        client.on("getWiadomosc", function (data) {
            console.log(data)
            chat.addWiadomosc(data.nick, data.tekst)
        })
        client.on("Przegrales", function (data) {
            document.getElementById("przegrana").style.display = "block"
        })
        client.on("Wygrales", function (data) {
            document.getElementById("wygrana").style.display = "block"
        })
    }

}
