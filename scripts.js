var player = "O";


$("#chooseO").on("click", function() {
    player = "O";
})

$("#chooseX").on("click", function() {
    player = "X";
})

$("td").on("click", function() {
    $(this).text(player);
})

$("#clear").on("click", function() {
    $("td").text(" ");
})