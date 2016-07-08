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
var finished = false;

/**
 * Awaits user click to begin game.
 **/
$("#start").on("click", function () {
    if (!inProgress) {
        $("#playerScore").text(0);
        $("#compScore").text(0);
        $("td").text(" ");
        $("#instructions").html("Choose X or O (X begins).");
        choose = true;
        finished = false;
    }
});

/** 
 * Allows user to select shape once at beginning of round.
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
            if (!winner) {
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
    if (!finished) {
        $("td").text(" ");
        for (var i = 0; i < keys.length; i++) {
            grid[keys[i]] = null;
        }
        move = 0;
        winner = false;
        $("#instructions").html("Choose X or O (X begins).");
        choose = true;
    }
});

/**
 * Computer moves randomly.
 **/
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

/**
 * Looks for a winning board and responds accordingly.
 **/
var calculateWin = function () {
    // check first row
    if ((grid["r1c1"] !== null) && (grid["r1c1"] === grid["r1c2"]) && (grid["r1c1"] === grid["r1c3"])) {
        winResponse(grid["r1c1"]);
        winner = true;
    }

    //check second row
    else if ((grid["r2c1"] !== null) && (grid["r2c1"] === grid["r2c2"]) && (grid["r2c1"] === grid["r2c3"])) {
        winResponse(grid["r2c1"]);
        winner = true;
    }

    //check third row
    else if ((grid["r3c1"] !== null) && (grid["r3c1"] === grid["r3c2"]) && (grid["r3c1"] === grid["r3c3"])) {
        winResponse(grid["r3c1"]);
        winner = true;
    }

    // check first column
    else if ((grid["r1c1"] !== null) && (grid["r1c1"] === grid["r2c1"]) && (grid["r1c1"] === grid["r3c1"])) {
        winResponse(grid["r1c1"]);
        winner = true;
    }

    // check second column
    else if ((grid["r1c2"] !== null) && (grid["r1c2"] === grid["r2c2"]) && (grid["r1c2"] === grid["r3c2"])) {
        winResponse(grid["r1c2"]);
        winner = true;
    }

    // check third column
    else if ((grid["r1c3"] !== null) && (grid["r1c3"] === grid["r2c3"]) && (grid["r1c3"] === grid["r3c3"])) {
        winResponse(grid["r1c3"]);
        winner = true;
    }

    // check first diagonal
    else if ((grid["r1c1"] !== null) && (grid["r1c1"] === grid["r2c2"]) && (grid["r1c1"] === grid["r3c3"])) {
        winResponse(grid["r1c1"]);
        winner = true;
    }

    // check second diagonal
    else if ((grid["r1c3"] !== null) && (grid["r1c3"] === grid["r2c2"]) && (grid["r1c3"] === grid["r3c1"])) {
        winResponse(grid["r1c3"]);
        winner = true;
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
        if (newScore === 5) {
            $("#instructions").html("Congratulations, you win! Click 'Start' to play again.");
            finished = true;
        }
    } else {
        var newScore = parseInt($("#compScore").text()) + 1;
        $("#compScore").text(newScore);
        if (newScore === 5) {
            $("#instructions").html("You lose! Click 'Start' to try again.");
            finished = true;
        }
    }
    inProgress = false;
}