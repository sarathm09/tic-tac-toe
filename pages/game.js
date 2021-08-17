import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Game.module.css'
import GameBoard from '../components/game-board'
import GameButtons from '../components/game-buttons'
import GamePlayerIndicator from '../components/game-players'
import ConfettiExplosion from '@reonomy/react-confetti-explosion'
import { PLAYER_O, PLAYER_X, GAME_RESULT, BOARD_SIZE, OPPONENT_AI, DIFFICULTY_EASY, AVATAR_HUMAN } from '../reuse/constants'


export default function Game() {
    const [boardState, setBoardState] = useState([])
    const [winningCells, setWinningCells] = useState()
    const [gameHistory, setGameHistory] = useState([])
    const [showConfetti, setShowConfetti] = useState(false)
    const [activePlayer, setActivePlayer] = useState(PLAYER_X)
    const [gameResult, setGameResult] = useState(GAME_RESULT.IN_PROGRESS)

    const [boardSize, setBoardSize] = useState(BOARD_SIZE)
    const [opponent, setOpponent] = useState(OPPONENT_AI)
    const [difficulty, setDifficulty] = useState(DIFFICULTY_EASY)
    const [playerAvatar, setPlayerAvatar] = useState()
    const [playerPiece, setPlayerPiece] = useState(PLAYER_X)

    useEffect(() => {
        if (gameResult === PLAYER_X || gameResult === PLAYER_O) {
            setShowConfetti(true);
        }
    }, [gameResult])

    useEffect(() => {
        if (showConfetti) {
            setTimeout(() => setShowConfetti(false), 4000)
        }
    }, [showConfetti])

    useEffect(() => {
        const { boardSize, opponent, difficulty, playerAvatar, playerPiece } =
            JSON.parse(window?.localStorage?.getItem('game-options')) || {}

        setBoardSize(boardSize || BOARD_SIZE)
        setOpponent(opponent || OPPONENT_AI)
        setDifficulty(difficulty || DIFFICULTY_EASY)
        setPlayerAvatar(playerAvatar || AVATAR_HUMAN())
        setPlayerPiece(playerPiece || PLAYER_X)

        const initialBoardState = new Array(boardSize || BOARD_SIZE).fill('')
            .map(_ => new Array(boardSize || BOARD_SIZE).fill(''))
        setBoardState(initialBoardState)
    }, [])

    return (
        <>
            <Head>
                <title>Tic tac toe</title>
                <meta name="description" content="Play tic-tac-toe online" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>

                <h1 className={styles.pageTitle}>TIC TAC TOE</h1>

                {(showConfetti) && (
                    <ConfettiExplosion
                        particleCount={300}
                        floorHeight={2000}
                        duration={5000}
                        force={0.9}
                    />
                )}

                <div className={styles.gameBoardContainer}>

                    <GamePlayerIndicator
                        opponent={opponent}
                        playerPiece={playerPiece}
                        activePlayer={activePlayer}
                        playerAvatar={playerAvatar}
                    />

                    <GameButtons
                        setBoardState={setBoardState}
                        setGameHistory={setGameHistory}
                        gameHistory={gameHistory}
                        setActivePlayer={setActivePlayer} />

                    <GameBoard
                        opponent={opponent}
                        difficulty={difficulty}
                        playerPiece={playerPiece}
                        boardState={boardState}
                        gameResult={gameResult}
                        gameHistory={gameHistory}
                        activePlayer={activePlayer}
                        winningCells={winningCells}
                        setBoardState={setBoardState}
                        setGameResult={setGameResult}
                        setGameHistory={setGameHistory}
                        setActivePlayer={setActivePlayer}
                        setWinningCells={setWinningCells}
                    />

                    <div className={styles.currentPlayerIndicator}>
                        {(GAME_RESULT.IN_PROGRESS === gameResult) ?
                            (<><span>{activePlayer}</span>{'\'s turn'}</>) :
                            (<><span>{gameResult}</span>&nbsp;{' won the game!!!'}</>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
