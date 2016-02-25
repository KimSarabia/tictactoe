var champion = new Array();
var playerOneMove = new Array();
var playerTwoMove = new Array();
var playerCount = 2;
var playerTurn = 0;
var move = 0;
var points1 = 0;
var points2 = 0;
var size = 3;

function makeBoard() {
    var Parent = document.getElementById("game");
    var counter = 1;
    
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

    for (s = 0; s < 3; s++) {
        var row = document.createElement("tr");
        
        for (r = 0; r < 3; r++) {
            var col = document.createElement("td");
            col.id = counter;
            col.innerHTML = counter;

            var handler = function(e) {
                if (playerTurn == 0) {
                    this.innerHTML = "X";
                    playerOneMove.push(parseInt(this.id));
                    playerOneMove.sort(function(a, b) { return a - b });
                }

                else {
                    this.innerHTML = "O";
                    playerTwoMove.push(parseInt(this.id));
                    playerTwoMove.sort(function(a, b) { return a - b });
                }

                move++;
                var isWin = checkWinner();

                if (isWin)
                {
                    if(playerTurn == 0)
                        points1++;
                    else
                        points2++;

                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;

                    reset();
                    makeBoard();
                }

                else
                {
                    if (playerTurn == 0)
                        playerTurn = 1;
                    else
                        playerTurn = 0;
                    this.removeEventListener('click', arguments.callee);
                }
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }

    loadAnswers();
}

function reset()
{
    playerTurn = 0;
    playerOneMove = new Array();
    playerTwoMove = new Array();
}

function loadAnswers()
{
    champion.push([1, 2, 3]);
    champion.push([4, 5, 6]);
    champion.push([7, 8, 9]);
    champion.push([1, 4, 7]);
    champion.push([2, 5, 8]);
    champion.push([3, 6, 9]);
    champion.push([1, 5, 9]);
    champion.push([3, 5, 7]);
}


function showCurrent(){

}


function checkWinner() {
    var win = false;
    var playerSelections = new Array();

    if (playerTurn == 0)
        playerSelections = playerOneMove;
    else
    playerSelections = playerTwoMove;
    
    if (playerSelections.length >= size) {
        
        for (i = 0; i < champion.length; i++) {
            var sets = champion[i];
            var setFound = true;
            
            for (r = 0; r < sets.length; r++) {
                var found = false;

                for (s = 0; s < playerSelections.length; s++) {
                    if (sets[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }

                if (found == false) {
                    setFound = false;
                    break;
                }
            }

            if (setFound == true) {
                win = true;
                break;
            }
        }
    }

    return win;
} 

window.onload = makeBoard;