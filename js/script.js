const players = {
    '1' : 'Player 1',
    '-1' : 'Player 2'
}

let board, turn, winner;

const $message = $('.message p');

$('#pits').click(handleClick);

$('button').click(resetGame);

function init(){
    board = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
    turn = 1;
    winner = false;
    render();
};

function render(){
    board.forEach(function(pos,idx){
        $(`#pos${idx}`).html(pos);
    })
    if(winner !== false){
        if(winner !== 0){
            $message.html(`Game Over! <br/> ${players[winner]} Wins!`);
        }else{
            $message.html(`Game Over! <br/>Tie Game!`);
        }
    }else{
        $message.html(`${players[turn]}'s turn!`);
    }
};

function handleClick(evt){
    if((($(evt.target).parent().attr('id') === 'p1Side' && turn === 1) || ($(evt.target).parent().attr('id') === 'p2Side' && turn === -1)) && winner === false){
        const currentPos = Number($(evt.target).attr('id').split('pos')[1]);
        let pieces = Number($(evt.target).html());
        const laps = Math.floor(pieces / (board.length - 1))
        const skip = (turn === 1) ? 13 : 6;
        let lastIdx;
        
        function moveFullLaps(){
            board.forEach(function(pos,idx,array){
                if(idx !== skip){
                    array[idx] = pos + laps;
                    pieces -= laps;
                    if(pieces === 0){
                        console.log(idx);
                        lastIdx = idx;
                    }
                }
            })
        };

        function moveFillForward(){
            board.forEach(function(pos,idx,array){
                if(idx > currentPos && idx !== skip && pieces > 0){
                    array[idx] = pos + 1;
                    pieces --;
                    if(pieces === 0){
                        lastIdx = idx;
                    }
                }
            })
        };

        function moveFillBehind(){
            board.forEach(function(pos,idx,array){
                if(idx !== skip && pieces > 0){
                    array[idx] = pos + 1;
                    pieces --;
                    if(pieces === 0){
                        lastIdx = idx;
                    }
                }
            })
        };

        function movePieces(){
            if (laps > 0){
                moveFullLaps();
            }
            
            if(pieces > 0){
                moveFillForward();
            }
    
            if(pieces > 0){
                moveFillBehind();
            }
        };

        function checkCapture(){
            if(board[lastIdx] === 1){
                if((lastIdx >=0 && lastIdx <=5 && turn ===1) || (lastIdx >=7 && lastIdx <=12 && turn === -1)){
                    const capturePosition = board.length - lastIdx - 2;
                    if(board[capturePosition] > 0){
                        if(turn ===1){
                            board[6] += board[capturePosition] + 1;
                        }else{
                            board[13] += board[capturePosition] + 1;
                        }
                        board[capturePosition] = 0;
                        board[lastIdx] = 0;
                    }
                }
            }
        };

        function updateTurn(){
            if((turn === 1 && lastIdx !== 6) || (turn === -1 && lastIdx !== 13)){
                turn *= -1;
            }
        };

        board[currentPos] = 0;
        movePieces();
        checkCapture();
        updateTurn();
        checkEndGame();
        render();
    }
};

function checkEndGame(){
    const p1SideSum = board.slice(0,6).reduce((acc,cur) => acc + cur);
    const p2SideSum = board.slice(7,13).reduce((acc,cur) => acc + cur);

    if(p1SideSum === 0 || p2SideSum === 0){
        board[6] += p1SideSum;
        board[13] += p2SideSum;
        clearPits();
        if(board[6] > board[13]){
            winner = 1;
        }else if(board[6] < board[13]){
            winner = -1;
        }else{
            winner = 0;
        }
    }
};

function clearPits(){
    board.forEach(function(pos,idx,array){
        if(idx !== 6 && idx !== 13){
            array[idx] = 0;
        }
    })
};

function resetGame(){
    init();
    render();
};

init();