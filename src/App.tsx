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

  const [difficulty, setDifficulty] = useState<0 | 1 | 2>(0)

  async function newGame(difficulty: number) {
    const gameOptions = {
      difficulty,
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
  // One Function to do both handleCheck and handleFlag
  async function handleCheckOrFlagCell(
    row: number,
    col: number,
    action: 'check' | 'flag'
  ) {
    const checkOptions = {
      id: game.id,
      row,
      col,
    }

    const url = `https://minesweeper-api.herokuapp.com/games/${game.id}/${action}`

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

  // Write a function to dynamically change the DISPLAY of a cell
  function transformCellValue(value: string) {
    if (value === 'F') {
      return <i className="fa fa-flag" />
    }

    if (value === '_') {
      return ' '
    }

    if (value === '*') {
      return <i className="fa fa-bomb" />
    }

    return value
  }

  // Function to change the className of our button
  function transformCellClassName(value: string | number) {
    // return appropriate className
    if (value === 'F') {
      return 'cell-flag'
    }
    if (value === '*') {
      return 'cell-bomb'
    }
    if (value === '_') {
      return 'cell-free'
    }

    if ([1, 2, 3, 4, 5, 6, 7, 8].includes(Number(value))) {
      return `cell-${value}`
    }

    return undefined
  }

  return (
    <main>
      <h1>Nando's Bomberama</h1>
      <h2>
        Click on desired difficulty to start:
        <button onClick={() => newGame(0)}>Easy Game</button>
        <button onClick={() => newGame(1)}>Intermediate</button>
        <button onClick={() => newGame(2)}>Hard</button>
      </h2>
      <h3>Mines: {game.mines}</h3>
      <h3>Game #: {game.id}</h3>

      <section className={}>
        {game.board.map(function (gameRow, row) {
          return gameRow.map(function (square, col) {
            return (
              <button
                className={transformCellClassName(square)}
                onClick={function (event) {
                  event.preventDefault()

                  handleCheckOrFlagCell(row, col, 'check')
                }}
                // this prevents the default option menu to pop up when you right click on the page.
                onContextMenu={function (event) {
                  event.preventDefault()

                  handleCheckOrFlagCell(row, col, 'flag')
                }}
                key={col}
              >
                {transformCellValue(square)}
              </button>
            )
          })
        })}
      </section>
    </main>
  )
}
