import React, { useState } from 'react'

export function App() {
  // Describes what the API will return. Shape matches exactly the data.
  const [game, setGame] = useState({
    id: 1,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    state: 'new',
    mines: 10,
  })

  async function newEasyGame() {
    //check
    console.log('Make a new easy game')

    const gameOptions = {
      difficulty: 0,
    }

    const url = 'https://minesweeper-api.herokuapp.com/games'

    const fetchOptions = {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameOptions),
    }

    const response = await fetch(url, fetchOptions)

    if (response.ok) {
      const newGameStateJson = await response.json()

      setGame(newGameStateJson)
    }
  }

  return (
    <main>
      <h1>Bomberama</h1>
      <h2>
        <button onClick={newEasyGame}>Easy Game</button>
        <button>Intermediate Game</button>
        <button>Hard Game</button>
      </h2>
      <h3>Mines: {game.mines}</h3>
      <h3>Game #: {game.id}</h3>
      <h3></h3>

      <ul className="difficulty-0">
        {game.board.map(function (gameRow) {
          return gameRow.map(function (square, squareIndex) {
            return <li key={squareIndex}>{square}</li>
          })
        })}
      </ul>
    </main>
  )
}
