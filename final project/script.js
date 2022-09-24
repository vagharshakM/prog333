let io = io();


var grassArr = []
var grassEaterArr = []
var predatorArr = []
var napoArr = []
var napoEaterArr = []
function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
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

}
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }
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
}