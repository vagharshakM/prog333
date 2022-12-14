let LivingCreature = require("./LivingCreature");

module.exports = class Napo extends LivingCreature{
    constructor(x, y) {
        super(x, y);
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
            matrix[newY][newX] = 4;

            var NewGrass = new Napo(newX, newY);
            napoArr.push(NewGrass);
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
            this.die();
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
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
        for (var i in napoArr) {
            if (this.x == napoArr[i].x && this.y == napoArr[i].y) {
                napoArr.splice(i, 1);
                break;
            }
        }
    }
}