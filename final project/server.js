var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);


 matrix = []

var n = 40;



function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 5))
        
    }  
}

io.sockets.emit("send matrix", matrix);


grassArr = []
grassEaterArr = []
predatorArr = []
napoArr = []
napoEaterArr = []

weath = "winter";
grass = require("./grass");
grassEater = require("./grassEater");
predator = require("./predator");
napo = require("./napo");
napoEater = require("./napoEater");

function createObject() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new grass(x, y, 1);
                grassArr.push(gr);
                

            }
            else if (matrix[y][x] == 2) {
                var gr = new grassEater(x, y, 2)
                grassEaterArr.push(gr);
            }
            else if (matrix[y][x] == 3) {
                var gr = new predator(x, y, 3)
                predatorArr.push(gr);
            }
            else if (matrix[y][x] == 4) {
                var gr = new napo(x, y, 4)
                napoArr.push(gr);
            }
            else if (matrix[y][x] == 5) {
                var gr = new napoEater(x, y, 5)
                napoEaterArr.push(gr);
            }
        }
    }
    io.sockets.emit('send matrix', matrix);
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (let j in grassEaterArr) {
        grassEaterArr[j].mul()
        grassEaterArr[j].eat()
    }
    for (let j in predatorArr) {
        predatorArr[j].mul()
        predatorArr[j].eat()
    }
    for (var i in napoArr) {
        napoArr[i].mul();
        napoArr[i].eat();
    }
    for (var j in napoEaterArr) {
        napoEaterArr[j].mul()
        napoEaterArr[j].eat()
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000);

function kill() {
    grassArr = [];
    grassEaterArr = []
    predatorArr = []
    napoArr = []
    napoEaterArr = []

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrass() {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new grassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPredator() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new predator(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addNapo() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            napoArr.push(new napo(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addNapoEater() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            napoEaterArr.push(new napoEater(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add napo", addNapo);
    socket.on("add napoEater", addNapoEater);
});


var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.napo = napoArr.length;
    statistics.napoEater = napoEaterArr.length;

    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)