function Ui() {
    var zegar = false
    var stoper;
    document.getElementById("load_screen").style.display = "block";

    document.getElementById("wiadomosc").onfocus = function () {
        document.getElementById("ui_gracza").style.opacity = "0.8"
    }
    document.getElementById("wiadomosc").onblur = function () {
        document.getElementById("ui_gracza").style.opacity = "0.4"
    }

    this.waitScreen = function () {
        document.getElementById("loading_text").innerHTML = "Waiting for second player";
    }
    this.changeScreen = function () {
        document.getElementById("load_screen").style.display = "block";
        document.getElementById("loading_text").innerHTML = "Changeing stage";
    }
    this.removeLoading = function () {
        setTimeout(function () {
            document.getElementById("load_screen").style.display = "none"
            if (zegar == false) {
                zegar = true
                var minuty = 0;
                var sekundy = 0;
                stoper = setInterval(function () {
                    sekundy++
                    if (sekundy == 60) {
                        minuty++
                        sekundy = 0
                    }
                    document.getElementById("time").innerHTML = (zero(minuty) + ":" + zero(sekundy))
                }, 1000)
            }

        }, 1500)
    }
    this.stopStoper = function () {
        clearInterval(stoper)
        return document.getElementById("time").innerHTML;
    }

    function zero(i) {
        return (i < 10) ? '0' + i : i; //zero(  
    }
    this.promptDrzwi = function (stage, door) {
        var container = document.createElement("div")
        container.style.width = "100vw"
        container.style.height = "100vh"
        container.style.position = "absolute"
        container.style.top = "0"
        container.style.left = "0px"
        container.style.zIndex = "900"
        container.style.backgroundColor = "rgba(50,50,50,0.7)"
        container.style.textAlign = "center"
        var div = document.createElement("div")
        div.style.width = "50vw"
        div.style.margin = "0 auto"
        div.style.backgroundColor = "silver"
        div.style.border = "3px solid black"
        div.style.borderRadius = "5px"
        div.style.paddingBottom = "2vh"
        div.style.paddingTop = "2vh"
        container.appendChild(div)
        var textbox = document.createElement("div")
        textbox.innerHTML = riddles[stage - 1][door - 1]
        console.log(riddles);
        console.log(stage)
        console.log(riddles[stage - 1][door - 1]);
        textbox.id = "textbox"
        div.appendChild(textbox)
        var input = document.createElement("input")
        input.type = "text"
        input.id = "odpowiedz"
        div.appendChild(input)
        div.innerHTML += "</br>"
        var submit = document.createElement("input")
        submit.type = "button"
        submit.value = "Potwierdz"
        submit.onclick = function () {
            console.log("Potwierdzam")
            console.log(document.getElementById("odpowiedz").value.toLowerCase().trim())
            if (document.getElementById("odpowiedz").value.toLowerCase().trim() == anwsers[stage - 1][door - 1]) {
                console.log("poprawna odp")
                game.openDoor(door);
                document.getElementById("textbox").innerHTML = "Poprawna odpowieź."
                var that = this
                setTimeout(function () {
                    that.parentElement.parentElement.remove()
                }, 500)

            } else {
                document.getElementById("textbox").innerHTML = "Błędna odpowiedź, spróbuj ponownie."
            }
        }
        div.appendChild(submit)
        var cancel = document.createElement("input")
        cancel.type = "button"
        cancel.value = "Wyjdz"
        cancel.onclick = function () {
            console.log("wychodze")
            console.log(this)
            console.log(this.parentElement.parentElement)
            this.parentElement.parentElement.remove()
            game.unray();

        }
        div.appendChild(cancel)
        return container
    }
}
