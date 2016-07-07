"use strict";

/**
 * Global variables.
 **/
var player = "O";
var computer = "X";
var move = 0;
var winner = false;
var choose = false;
var inProgress = false;
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
};
var keys = Object.keys(grid);
var playerScore = 0;
var compScore = 0;


/**
 * Awaits user click to begin game.
 **/
$("#start").on("click", function () {
    if (!inProgress) {
        $("td").text(" ");
        $("#instructions").html("Choose X or O (X begins).");
        choose = true;
    }
});

/** 
 * Allows user to select shape once at beginning of game.
 **/
$(".choice").on("click", function () {
    if (choose) {
        player = $(this).text();
        computer = (player === "O") ? "X" : "O";
        choose = false;
        inProgress = true;
        if (player === "O") {
            computerMove();
        }
        $("#instructions").html("Your move.");
    }
});

/**
 * Draws symbol on board.
 **/
$("td").on("click", function () {
    if (inProgress) {
        var cell = $(this)[0].id;
        if ((grid[cell] === null) && (!winner)) {
            $(this).text(player);
            grid[cell] = player;
            calculateWin();
            if ((move < 4) && (!winner)) {
                computerMove();
            }
        }
    }

});

/**
 * Clears board and resets variables.
 **/
$("#reset").on("click", function () {
    $("td").text(" ");
    for (var i = 0; i < keys.length; i++) {
        grid[keys[i]] = null;
    }
    move = 0;
    winner = false;
    $("#instructions").html("Choose X or O (X begins).");
    choose = true;
});

// computer moves randomly
var computerMove = function () {
    var cell = keys[Math.floor(Math.random() * keys.length)];
    if (grid[cell] !== null) {
        computerMove();
    } else {
        grid[cell] = computer;
        $("#" + cell).text(computer);
        move += 1;
    }
}

// looks for a winning board and responds accordingly
var calculateWin = function () {
    // check first row
    if ((grid["r1c1"] !== null) && (grid["r1c1"] === grid["r1c2"]) && (grid["r1c1"] === grid["r1c3"])) {
        console.log('test');
        winResponse(grid["r1c1"]);
    }

    //check second row
    else if ((grid["r2c1"] !== null) && (grid["r2c1"] === grid["r2c2"]) && (grid["r2c1"] === grid["r2c3"])) {
        winResponse(grid["r2c1"]);
    }

    //check third row
    else if ((grid["r3c1"] !== null) && (grid["r3c1"] === grid["r3c2"]) && (grid["r3c1"] === grid["r3c3"])) {
        winResponse(grid["r3c1"]);
    }

    // check first column
    else if ((grid["r1c1"] !== null) && (grid["r1c1"] === grid["r2c1"]) && (grid["r1c1"] === grid["r3c1"])) {
        winResponse(grid["r1c1"]);
    }

    // check second column
    else if ((grid["r1c2"] !== null) && (grid["r1c2"] === grid["r2c2"]) && (grid["r1c2"] === grid["r3c2"])) {
        winResponse(grid["r1c2"]);
    }

    // check third column
    else if ((grid["r1c3"] !== null) && (grid["r1c3"] === grid["r2c3"]) && (grid["r1c3"] === grid["r3c3"])) {
        winResponse(grid["r1c3"]);
    }

    // check first diagonal
    else if ((grid["r1c1"] !== null) && (grid["r1c1"] === grid["r2c2"]) && (grid["r1c1"] === grid["r3c3"])) {
        winResponse(grid["r1c1"]);
    }

    // check second diagonal
    else if ((grid["r1c3"] !== null) && (grid["r1c3"] === grid["r2c2"]) && (grid["r1c3"] === grid["r3c1"])) {
        winResponse(grid["r1c3"]);
    }
}

/**
 * Responds to winning board.
 **/
var winResponse = function (winner) {
    $("#instructions").html(winner + " wins!");
    if (player === winner) {
        var newScore = parseInt($("#playerScore").text()) + 1;
        $("#playerScore").text(newScore);
    } else {
        var newScore = parseInt($("#comptScore").text()) + 1;
        $("#compScore").text(newScore);
    }
    winner = true;
    inProgress = false;
}