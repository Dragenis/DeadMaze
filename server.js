var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var socketio = require("socket.io")
var mongoose = require("mongoose")
var Models = require("./database/Models.js")(mongoose)
mongoose.connect('mongodb://localhost/bazaprojekt');
var Operations = require("./database/Operations.js")
var db;
var opers = new Operations();
var server = http.createServer(function (request, response) {

    switch (request.method) {
        case "GET":
            console.log(request.url)
            if (request.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                })
            } else if (request.url === "/favicon.ico") {

                fs.readFile("static/img/favicon.png", function (error, data) {
                    response.writeHead(200, {
                        'Content-Type': 'image/gif'
                    });
                    response.write(data);
                    response.end();
                })
            } else {
                //console.log(request.url.split(".")[1])
                switch (request.url.split(".")[1]) {
                    case "png":
                        fs.readFile(("static" + request.url), function (error, data) {
                            response.writeHead(200, {
                                'Content-Type': 'image/gif'
                            });
                            //console.log(error)
                            //console.log(data)
                            if (error) {
                                console.log(error)
                            } else {
                                response.write(data);
                            }
                            //
                            response.end();
                        })
                        break;
                    case "js":
                        fs.readFile(("static" + request.url), function (error, data) {
                            response.writeHead(200, {
                                'Content-Type': 'application/javascript'
                            });
                            response.write(data);
                            response.end();
                        })
                        break;
                    case "css":
                        fs.readFile(("static" + request.url), function (error, data) {
                            response.writeHead(200, {
                                'Content-Type': 'text/css'
                            });
                            response.write(data);
                            response.end();
                        })
                        break;
                    case "gif":
                        fs.readFile(("static" + request.url), function (error, data) {
                            response.writeHead(200, {
                                'Content-Type': 'image/gif'
                            });
                            //console.log(error)
                            //console.log(data)
                            if (error) {
                                console.log(error)
                            } else {
                                response.write(data);
                            }
                            //
                            response.end();
                        })
                        break;
                    case "ttf":
                        fs.readFile(("static" + request.url), function (error, data) {
                            response.writeHead(200, {
                                'Content-Type': 'font/ttf'
                            });
                            response.write(data);
                            response.end();
                        })
                        break;
                }
            }
            break;

        case "POST":
            servResp(request, response);
            break;
    }
})
server.listen(3000);
console.log("Serwer startuje na porcie 3000");
//---------dane_servera--------
var ilosc_graczy = 0;
var gracz1 = {
    id: "",
    name: "",
    x: 0,
    y: 0,
    rotacja: 0,
    animacja: "stand",
    stage: 1
};
var gracz2 = {
    id: "",
    name: "",
    x: 0,
    y: 0,
    rotacja: 0,
    animacja: "stand",
    stage: 1
};
var wygrana = false;
//-----------------------------
var io = socketio.listen(server)
io.sockets.on("connection", function (client) {
    connectToMongo();
    console.log("klient sie podłączył" + client.id)
    if (ilosc_graczy == 0) {
        gracz1.id = client.id;
        client.emit("onconnect", {
            clientId: client.id,
            clientName: "Gracz1"
        })
        ilosc_graczy++
    } else if (ilosc_graczy == 1) {
        gracz2.id = client.id;
        client.emit("onconnect", {
            clientId: client.id,
            clientName: "Gracz2"
        })

        ilosc_graczy++
    } else {
        client.emit("onconnect", {
            clientId: client.id,
            clientName: "Spectator"
        })
    }

    //---------------------------------------------
    client.on("get_gracz1", function () {
        client.emit("get_gracz1", {
            gracz: gracz1
        })
    })
    client.on("get_gracz2", function () {
        client.emit("get_gracz2", {
            gracz: gracz2
        })
    })
    client.on("gracz1_setnick", function (data) {
        gracz1.name = data.name
    })
    client.on("gracz2_setnick", function (data) {
        gracz2.name = data.name
        client.broadcast.emit("start_game")
        client.emit("start_game")
    })
    client.on("reset_graczy", function () {
        ilosc_graczy = 0;
    })
    client.on("sendWiadomosc", function (data) {
        console.log(data)
        client.broadcast.emit("getWiadomosc", {
            nick: data.name,
            tekst: data.tekst
        })
    })
    //---------------------------------------------
    client.on("disconnect", function () {
        console.log("klient się rozłącza");
    })
    //--------MOngoo----------
    function connectToMongo() {
        db = mongoose.connection;
        //przy wystąpieniu błędu
        db.on("error", function () {
            console.log("problem z mongo")
        });
        //przy poprawnym połączeniu z bazą
        db.once("open", function () {
            console.log("mongo jest podłączone - można wykonywać operacje na bazie");
        });
        //--------sockety w bazie----------
        client.on("rekord", function (data) {
            console.log(data)
            var rekord = new Models.Rekord({
                nick: data.nick,
                czas: data.czas,
                data: data.data
            });
            rekord.validate(function (err) {
                console.log(err);
            });
            opers.InsertOne(rekord);
        })
        client.on("wypisz", function (data) {
            console.log("------Przyslal-----")
            console.log(data)
            console.log("-------------------")
            var data = opers.SelectAll(Models.Rekord, function (data) {
                console.log("data*-------------")
                console.log(data)
                console.log("data*-------------")
                client.emit("wypisz", {
                    data: data
                })
                if (wygrana == false) {
                    client.broadcast.emit("Przegrales")
                    client.emit("Wygrales")
                    wygrana = true;
                }


            })
        })
        //przy rozłączeniu z bazą
        db.once("close", function () {
            console.log("mongodb zostało odłączone");
        });
    }

})
