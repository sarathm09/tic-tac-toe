import React, { useEffect } from 'react'
import styles from '../styles/GameBoard.module.css'
import { PLAYER_O, PLAYER_X, GAME_RESULT, BOARD_SIZE, OPPONENT_AI, DIFFICULTY_EASY } from '../reuse/constants'

const GameBoard = ({
    opponent, difficulty, playerPiece,
    boardState, setBoardState, activePlayer, setActivePlayer,
    winningCells, setWinningCells, gameResult,
    gameHistory, setGameHistory, setGameResult
}) => {

    useEffect(() => {
        setWinningCells(undefined)
        setGameResult(GAME_RESULT.IN_PROGRESS)
    }, [boardState, setWinningCells, setGameResult])

    useEffect(() => {
        if (playerPiece !== activePlayer && opponent === OPPONENT_AI) {
            setTimeout(() => {
                if (difficulty === DIFFICULTY_EASY) {
                    const freeCells = []
                    for (let row = 0; row < boardState.length; row++) {
                        for (let column = 0; column < boardState[row].length; column++) {
                            if (!boardState[row][column]) freeCells.push([row, column])
                        }
                    }
                    const cellToPlay = freeCells[Math.floor(Math.random() * freeCells.length)]
                    cellToPlay && onGameBoardCellClick(cellToPlay[0], cellToPlay[1])
                }
            }, 1500)

        }
    }, [activePlayer, opponent, playerPiece])


    const checkIfCellsAreEqual = (indices) => {
        if (indices.every(([x, y]) => !!boardState[x][y] &&
            boardState[indices[0][0]][indices[0][1]] === boardState[x][y])) {
            setGameResult(boardState[indices[0][0]][indices[0][1]])
            setWinningCells(indices)
            return true
        }
        return false
    }

    const checkForTie = () => {
        if (boardState.filter(row => row.filter(cell => !!cell).length === BOARD_SIZE).length === BOARD_SIZE) {
            setGameResult(GAME_RESULT.TIE)
            return true
        }
        return false
    }

    const checkGameOver = () => {
        const indices = new Array(BOARD_SIZE).fill('').map((_, i) => i)
        const somePlayerWon = indices.some(i =>
            checkIfCellsAreEqual(indices.map(n => [n, i])) ||
            checkIfCellsAreEqual(indices.map(n => [i, n])) ||
            checkIfCellsAreEqual(indices.map(n => [n, n])) ||
            checkIfCellsAreEqual(indices.map(n => [n, BOARD_SIZE - n - 1]))
        )

        return somePlayerWon || checkForTie()
    }

    const onGameBoardCellClick = (row, column) => {
        if (!boardState[row][column] && gameResult === GAME_RESULT.IN_PROGRESS) {
            setGameHistory(JSON.parse(JSON.stringify([...gameHistory, boardState])))
            let newBoardState = boardState
            newBoardState[row][column] = activePlayer
            setBoardState(newBoardState)
            setActivePlayer(currentPlayer => currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X)
            checkGameOver(newBoardState)
        }
    }

    const getClassNamesForCell = (row, column) => {
        let classNames = styles.boardCell
        if (boardState[row][column]) classNames += ` ${styles.boardCellFilled}`
        if (!!winningCells && !!winningCells.find(([i, j]) => i === row && j === column)) {
            classNames += ` ${styles.boardWinningCell}`
        }
        return classNames
    }


    return (
        <div className={styles.gameBoard}>
            {boardState.map((row, i) => (
                // Setting index as key only because it is a static list with BOARD_SIZE items.
                <div className={styles.boardRow} key={i + 1}>
                    {row.map((column, j) => (
                        // Setting index as key only because it is a static list with BOARD_SIZE items.
                        <div className={styles.boardColumn} key={j + 1}>
                            <div className={getClassNamesForCell(i, j)} onClick={() => onGameBoardCellClick(i, j)}>
                                <span className='unselectable'>{column}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default GameBoard
