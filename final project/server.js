var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3001);

var grassArr = []
var grassEaterArr = []
var predatorArr = []
var napoArr = []
var napoEaterArr = []
var matrix = []

var n = 50;

function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 3))
        
    }  
}

io.sockets.emit("send matrix", matrix);

grass = require("./grass");
grassEater = require("./grassEater");
predator = require("./predator");
napo = require("./napo");
napoEater = require("./napoEater");

function createObject() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);

            }
            else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y, 1)
                grassEaterArr.push(gr);
            }
            else if (matrix[y][x] == 3) {
                var gr = new Predator(x, y, 1)
                predatorArr.push(gr);
            }
            else if (matrix[y][x] == 4) {
                var gr = new Napo(x, y, 1)
                napoArr.push(gr);
            }
            else if (matrix[y][x] == 5) {
                var gr = new NapoEater(x, y, 1)
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
    

    io.sockets.emit("send matrix", matrix);
}

function generator(matLen, gr, grEat) {
    var matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}



matrix = generator(30, 20, 20, 20, 20, 20);

io.sockets.emit('send matrix', matrix);