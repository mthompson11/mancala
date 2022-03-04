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

    console.log('Hello World');