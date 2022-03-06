/*

<---------Game Flow-------------->

init()
    Initializes state variables
    turn = 1
    board
        0 pieces in both players' store
        4 pieces in each pit
    score
        player 1 score is 0
        player 2 score is 0
    gameOver = false
render() 
    State variables are rendered to the DOM
    Score -> Relevant player score container
    Board -> # of pieces will initially be rendered as numbers in the pit/store
    if gameOver = true
        no border styling
        showModal
            Generate modal with message indicating who won and start over button
    if gameOver = false
        Turn -> Active player pits will have border styling and only those pits will be available to choose from
Player clicks on the pit of their choice
handleClick()
    movePieces()
        Update board to reflect the player's move
    Update score
    checkEndGame()
        if game is over set gameOver to true
        if game is not over set gameOver to false
    changeTurn()
        if player did not end in own store then change turn to -1
        if player did end in own store then keep at 1
render()
Repeat as necessary until gameOver = true

<---------Other Functionality------------>

reset()
    Resets the game
    if modal is showing turn it off
    init() 
    render()

    */

    /*----- constants -----*/
    /*----- app's state (variables) -----*/
let board, turn, gameOver, score;


    /*----- cached element references -----*/
    /*----- event listeners -----*/

$('#pits').click(handleClick);

    /*----- functions -----*/

function init(){
    board = [4,4,4,4,4,4,0,0,0,0,0,0,1,0];
    turn = 1;
    winner = false;
    score = {'1' : 0, '-1' : 0};
    render();
}

function render(){
    board.forEach(function(pos,idx){
        $(`#pos${idx}`).html(pos);
    })
    if(winner){
        if(winner === 1){
            $('.message p').html(`Game Over! <br/> Player 1 Wins!`)
        }else{
            $('.message p').html(`Game Over! <br/>Player 2 Wins!`)
        }
    }else{
        if(turn === 1){
            $('.message p').html(`Player 1's turn!`)
        }else{
            $('.message p').html(`Player 2's turn!`)
        }
    }
}

function handleClick(evt){
    if(($(evt.target).parent().attr('id') === 'p1Side' && turn === 1) || ($(evt.target).parent().attr('id') === 'p2Side' && turn === -1)){
        let pos = Number($(evt.target).attr('id').split('pos')[1]);
        let pieces = Number($(evt.target).html());
        board[pos] = 0;
        const laps = Math.floor(pieces / (board.length - 1))
        const skip = turn === 1 ? 13 : 6;
        let lastIdx;
        console.log(laps)
        if (laps > 0){
            board.forEach(function(pos,idx){
                if(idx !== skip){
                    console.log(idx);
                    board[idx] = pos + laps;
                    pieces --;
                    if(pieces === 0){
                        lastIdx = idx;
                    }
                }
            })
        }
        console.log(pos + 1 )
        let forward = board.slice(pos + 1, board.length);
        let behind = board.slice(0,pos + 1);
        console.log(forward);
        console.log(behind);
        if(pieces > 0 && forward.length !== 0){
            forward.forEach(function(pos,idx){
                if(idx !== 6 && pieces > 0){
                    forward[idx] = pos + 1;
                    pieces--;
                    if(pieces === 0){
                        lastIdx = idx + behind.length;
                    }
                }
            })
        }
        if(pieces > 0 && behind.length !==0){
            behind.forEach(function(pos,idx){
                if(idx != 6 && pieces > 0){
                    behind[idx] = pos + 1;
                    pieces--;
                }
            })
        }
        board = behind.concat(forward);
        if(lastIdx >=0 && lastIdx <=5 && board[lastIdx] === 1 && turn ===1){
            let capturePosition = board.length - lastIdx - 2;
            board[6] += board[capturePosition] + 1
            board[capturePosition] = 0;
            board[lastIdx] = 0
        }
        if(lastIdx >=7 && lastIdx <=13 && board[lastIdx] === 1 && turn === -1){
            let capturePosition = board.length - lastIdx - 2;
            board[13] += board[capturePosition] + 1
            board[capturePosition] = 0;
            board[lastIdx] = 0;
        }
        if(turn === 1 && lastIdx !== 6 || turn === 2 && lastIdx !== 13){
            turn *= -1;
        }
        updateEndGame();
        render();
    }
}

function updateEndGame(){
    const p1 = board.slice(0,6);
    const p2 = board.slice(7,13);
    if(p1.every(pos => pos === 0)){
        winner = 1;
    }else if(p2.every(pos => pos === 0)){
        winner = -1;
    }
}
init();