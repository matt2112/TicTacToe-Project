var player = "O";
var computer = "X";
var grid = {
    r1c1: null,
    r1c2: null,
    r1c3: null,
    r2c1: null,
    r2c2: null,
    r2c3: null,
    r3c1: null,
    r3c2: null,
    r3c3: null
}
var keys = Object.keys(grid);
move = 0;

$("#chooseO").on("click", function() {
    player = "O";
    computer = "X";
})

$("#chooseX").on("click", function() {
    player = "X";
    computer = "O";
})

$("td").on("click", function() {
    var cell = $(this)[0].id;
    if (grid[cell] === null) {
        $(this).text(player);
        grid[cell] = player;
        if (move < 4) {
            $computerMove();   
        }
    }
})

$("#clear").on("click", function() {
    $("td").text(" ");
    for (var i = 0; i < keys.length; i++) {
        grid[keys[i]] = null;
    }
    move = 0;
})

$computerMove = function() {
    console.log("start");
    var cell = keys[Math.floor(Math.random() * keys.length)];
    console.log(cell);
    if (grid[cell] !== null) {
        console.log("oops");
        $computerMove();
    } else {
        grid[cell] = computer;
        $("#" + cell).text(computer);
        move += 1;
    }
};