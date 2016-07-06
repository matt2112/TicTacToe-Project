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

/**
 * Awaits user click to begin game.
 **/
$("#start").on("click", function () {
    if (!inProgress) {
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
                calculateWin();
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
        winResponse();
    }

    //check second row
    if ((grid["r2c1"] !== null) && (grid["r2c1"] === grid["r2c2"]) && (grid["r2c1"] === grid["r2c3"])) {
        winResponse();
    }

    //check third row
    if ((grid["r3c1"] !== null) && (grid["r3c1"] === grid["r3c2"]) && (grid["r3c1"] === grid["r3c3"])) {
        winResponse();
    }

    // check first column
    if ((grid["r1c1"] !== null) && (grid["r1c1"] === grid["r2c1"]) && (grid["r1c1"] === grid["r3c1"])) {
        winResponse();
    }

    // check second column
    if ((grid["r1c2"] !== null) && (grid["r1c2"] === grid["r2c2"]) && (grid["r1c2"] === grid["r3c2"])) {
        winResponse();
    }

    // check third column
    if ((grid["r1c3"] !== null) && (grid["r1c3"] === grid["r2c3"]) && (grid["r1c3"] === grid["r3c3"])) {
        winResponse();
    }

    // check first diagonal
    if ((grid["r1c1"] !== null) && (grid["r1c1"] === grid["r2c2"]) && (grid["r1c1"] === grid["r3c3"])) {
        winResponse();
    }

    // check second diagonal
    if ((grid["r1c3"] !== null) && (grid["r1c3"] === grid["r2c2"]) && (grid["r1c3"] === grid["r3c1"])) {
        winResponse();
    }
}

// responds to winning board
var winResponse = function () {
    alert("winner!");
    winner = true;
    inProgress = false;
}