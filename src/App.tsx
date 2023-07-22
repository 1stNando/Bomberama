import React, { useState } from 'react'

export function App() {
  // Describes what the API will return. Shape matches exactly the data.
  const [game, setGame] = useState({
    id: undefined,
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
    state: undefined,
    mines: undefined,
  })

  async function newEasyGame() {
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

    //check console
    console.log('Make a new easy game')

    if (response.ok) {
      const newGameStateJson = await response.json()

      setGame(newGameStateJson)
    }
  }

  async function handleClickCell(row: number, col: number) {
    //console.log(`Clicked cell ${row} - ${col}`)

    const checkOptions = {
      id: game.id,
      row,
      col,
    }
    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/check`
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkOptions),
    }

    const response = await fetch(url, fetchOptions)

    if (response.ok) {
      const newGameStateJson = await response.json()

      setGame(newGameStateJson)
    }
  }

  async function handleRightClickCell(row: number, col: number) {
    const checkOptions = {
      id: game.id,
      row,
      col,
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/flag`
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkOptions),
    }

    const response = await fetch(url, fetchOptions)

    if (response.ok) {
      const newGameStateJson = await response.json()

      setGame(newGameStateJson)
    }
  }

  return (
    <main>
      <h1>Nando's Bomberama</h1>
      <h2>
        Click on Easy to Start!
        <button onClick={newEasyGame}>Easy Game</button>
        <button>Intermediate Game</button>
        <button>Hard Game</button>
      </h2>
      <h3>Mines: {game.mines}</h3>
      <h3>Game #: {game.id}</h3>

      <section className="difficulty-0">
        {game.board.map(function (gameRow, row) {
          return gameRow.map(function (square, col) {
            return (
              <button
                onClick={function () {
                  handleClickCell(row, col)
                }}
                key={col}
                // this prevents the default option menu to pop up when you right click on the page.
                onContextMenu={function (event) {
                  event.preventDefault()

                  handleRightClickCell(row, col)
                }}
              >
                {square}
              </button>
            )
          })
        })}
      </section>
    </main>
  )
}
