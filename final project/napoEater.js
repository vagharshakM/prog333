let LivingCreature = require("./LivingCreature");

module.exports = class NapoEater extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.multiply = 0
        this.directions = [];
    }


    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor() * Math.random() * emptyCells.lenght];
        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var NewGrass = new NapoEater(newX, newY);
            napoEaterArr.push(NewGrass);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = this.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in napoArr) {
                if (newX == napoArr[i].x && newY == napoArr[i].y) {
                    napoArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in napoEaterArr) {
            if (this.x == napoEaterArr[i].x && this.y == napoEaterArr[i].y) {
                napoEaterArr.splice(i, 1);
                break;
            }
        }
    }
}