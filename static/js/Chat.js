function Chat() {
    var nik = "user";
    this.setNick = function (nick) {
        nik = nick;
    }
    this.init = function () {
        document.getElementById("wyslij").addEventListener("click", function () {
            //wysylanie+dodanie
            var tekst = document.getElementById("wiadomosc").value;
            var div = $("<div>");
            var txt = $("<span>");
            var name = $("<span>");
            name.text(" :" + nik);
            name.addClass("name");
            txt.text(tekst);

            txt.addClass("wiadomosc");
            div.append(txt);
            div.append(name);
            div.css("text-align", "right")
            name.css("color", "red")
            $("#przychodzace").append(div);
            var elem = document.getElementById('przychodzace');
            elem.scrollTop = elem.scrollHeight;
            net.sendWiadomosc(nik, tekst)
            document.getElementById("wiadomosc").value = ""
        })

    }
    this.addWiadomosc = function (nick, tekst) {
        var div = $("<div>");
        var txt = $("<span>");
        var name = $("<span>");
        name.text(nick + ": ");
        name.addClass("user");
        txt.text(tekst);
        txt.css("width", "200px")
        txt.addClass("wiadomosc");
        div.append(name);
        div.append(txt);
        div.css("text-align", "left")
        name.css("color", "green")
        $("#przychodzace").append(div);
        console.log(div[0])
        var elem = document.getElementById('przychodzace');
        elem.scrollTop = elem.scrollHeight;
    }
}
