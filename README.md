# Mancala

A browser-based strategy game.

<a><img style="width:50%; height: auto" src="https://i.imgur.com/zngXamm.png" title="source: imgur.com" /></a><a><img style="width:50%; height: auto" src="https://i.imgur.com/qVNdtWs.png" title="source: imgur.com" /></a>


## Background

Mancala is a family of two player strategy games that involve capturing the most seeds on the board before play ends. This browser-based version of Mancala is based on the Kalah variation.

## How to Play

- At the beginning of the game, four seeds are placed in each house. The number of seeds in a house will be represented by an integer.

- Each player controls the six houses and their seeds on the player's side of the board. On each player's turn the integers representing the seeds will change color so it will be obvious which houses and seeds belong to the active player.

- The player's score is the number of seeds in their store (the larger buckets on either end).

- Players take turns sowing their seeds. On a turn, the active player removes all seeds from one of the houses under their control by clicking on it. Moving counter-clockwise, a seed is dropped in each house in turn, including the active player's own store but not their opponent's.

- If the last sown seed lands in an empty house owned by the active player, and the opposite house contains seeds, both the last seed and the opposite seeds are captured and placed into the active player's store.

- If the last sown seed lands in the active player's store, the active player gets an additional move. There is no limit on the number of moves a player can make in their turn.

- When one player no longer has any seeds in any of their houses, the game ends. The other player gets all remaining seeds moved to their store, and the player with the most seeds in their store wins.

- It is possible for the game to end in a draw.

## Technologies Used:
- HTML
- CSS
- JavaScript

## Getting Started

Follow the link below and select "New Game". You're all set!

https://mthompson11.github.io/mancala/

## Next Steps

- Currently the seeds are represented simply as an integer. I would like to create a graphical representation of the beads that are used in a typical Mancala game. 

- While the game is somewhat responsive as is, I would like to make it even more responsive by ensuring that it can be played without scrolling on a wider array of devices.

- In a game of Mancala, the player who goes first has a distinct advantage. I'd like to use local storage to allow players to play multiple games, alternating who goes first. There would also be a running score that indicates how many games each player has won.

