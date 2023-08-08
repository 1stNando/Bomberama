import React, { useEffect, useState } from 'react'

type GameDifficulty = 0 | 1 | 2

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

  // Tracks difficulty selected
  const [difficulty, setDifficulty] = useState<GameDifficulty>(0)

  // Part 3.1: Coming back to add useEffect
  useEffect(function () {
    async function loadExistingGame() {
      const existingGameId = localStorage.getItem('game-id')
      console.log(existingGameId)

      // Part 3.3: Save difficulty level and ID
      const existingDifficulty = localStorage.getItem('game-difficulty')

      // fetch the saved game by id.
      if (existingGameId && existingDifficulty) {
        const response = await fetch(
          `http://minesweeper-api.herokuapp.com/games/${existingGameId}`
        )

        if (response.ok) {
          const gameJson = await response.json()

          setGame(gameJson)
          setDifficulty(Number(existingDifficulty) as GameDifficulty)
        }
      }
    }
    loadExistingGame()
  }, [])

  async function newGame(newGameDifficulty: 0 | 1 | 2) {
    const gameOptions = {
      difficulty: newGameDifficulty,
    }

    const url = 'https://minesweeper-api.herokuapp.com/games'

    const fetchOptions = {
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameOptions),
    }

    const response = await fetch(url, fetchOptions)

    //check console
    console.log(response)

    if (response.ok) {
      const newGameStateJson = await response.json()

      // Set game difficulty from tracking its state
      setDifficulty(newGameDifficulty)
      setGame(newGameStateJson)
      // Part 3, Coming back to add ability to save data on localStorage!
      localStorage.setItem('game-id', newGameStateJson.id)
      localStorage.setItem('game-difficulty', String(newGameDifficulty))
    }
  }
  // One Function to do both handleCheck and handleFlag
  async function handleCheckOrFlagCell(
    row: number,
    col: number,
    action: 'check' | 'flag'
  ) {
    // This is a request payload.
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

    console.log(response)

    if (response.ok) {
      const newGameStateJson = await response.json()

      setGame(newGameStateJson)
    }
  }

  // Write a function to dynamically change the DISPLAY of a cell based on its content.
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

  // This function is used to dynamically change the CSS class name of a button (cell) based on its content.
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
      <h1>Nando Bomberama</h1>
      <h2>
        Click on desired difficulty to start:
        <button onClick={() => newGame(0)}>Easy Game</button>
        <button onClick={() => newGame(1)}>Intermediate</button>
        <button onClick={() => newGame(2)}>Hard</button>
      </h2>
      <h3>Mines: {game.mines}</h3>
      <h3>Game #: {game.id}</h3>

      <section className={`difficulty-${difficulty}`}>
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
