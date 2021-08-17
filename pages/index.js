import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import {
  OPPONENT_AI, OPPONENT_HUMAN,
  BOARD_SIZE,
  DIFFICULTY_EASY, DIFFICULTY_HARD,
  PLAYER_X, PLAYER_O, AVATAR_HUMAN
} from '../reuse/constants'


export default function Home() {

  const [boardSize, setBoardSize] = useState(BOARD_SIZE)
  const [opponent, setOpponent] = useState(OPPONENT_AI)
  const [difficulty, setDifficulty] = useState(DIFFICULTY_EASY)
  const [playerName, setPlayerName] = useState('')
  const [playerAvatar, setPlayerAvatar] = useState()
  const [playerPiece, setPlayerPiece] = useState(PLAYER_X)

  const changeAvatar = () => {
    setPlayerAvatar(AVATAR_HUMAN())
  }

  useEffect(() => {
    const { boardSize, opponent, difficulty, playerAvatar, playerPiece } =
      JSON.parse(window?.localStorage?.getItem('game-options')) || {}

    setDifficulty(difficulty || DIFFICULTY_EASY)
    setOpponent(opponent || OPPONENT_AI)
    setPlayerPiece(playerPiece || PLAYER_X)
    setBoardSize(boardSize || BOARD_SIZE)
    setPlayerAvatar(playerAvatar || AVATAR_HUMAN())
  }, [])

  useEffect(() => {
    window?.localStorage?.setItem('game-options', JSON.stringify({
      boardSize,
      opponent,
      difficulty,
      playerAvatar,
      playerPiece
    }))
  }, [boardSize, opponent, difficulty, playerAvatar, playerPiece])

  return (
    <>
      <Head>
        <title>Tic tac toe</title>
        <meta name="description" content="Play tic-tac-toe online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.welcomePageTitle}>
          <h1 className={styles.pageTitle}>TIC TAC TOE</h1>
        </div>

        <div className={styles.gameOptionsContainer}>
          <div className={styles.optionsLeftPane}>
            {playerAvatar && (
              <div className={styles.playerAvatar}>
                <Image
                  src={playerAvatar}
                  width={100}
                  height={100}
                  objectFit='fill'
                  alt="User Avatar" />
              </div>
            )}
            <button onClick={() => changeAvatar()}>New Avatar</button>
          </div>
          <div className={styles.optionsRightPane}>
            <div className={styles.opponentOptions}>
              <b>Opponent</b>
              <div className={styles.optionButtonsGroup}>
                <button
                  className={opponent === OPPONENT_AI ? styles.buttonSelected : ''}
                  onClick={() => setOpponent(OPPONENT_AI)}>
                  AI
                </button>
                <button
                  className={opponent === OPPONENT_HUMAN ? styles.buttonSelected : ''}
                  onClick={() => setOpponent(OPPONENT_HUMAN)}>
                  Human
                </button>
              </div>
            </div>
            <div className={styles.difficultyOptions}>
              <b>Difficulty</b>
              <div className={styles.optionButtonsGroup}>
                <button
                  className={difficulty === DIFFICULTY_EASY ? styles.buttonSelected : ''}
                  onClick={() => setDifficulty(DIFFICULTY_EASY)}>
                  Easy
                </button>
                <button
                  className={difficulty === DIFFICULTY_HARD ? styles.buttonSelected : ''}
                  onClick={() => setDifficulty(DIFFICULTY_HARD)}>
                  Hard
                </button>
              </div>
            </div>
            <div className={styles.playerOptions}>
              <b>Player</b>
              <div className={styles.optionButtonsGroup}>
                <button
                  className={playerPiece === PLAYER_X ? styles.buttonSelected : ''}
                  onClick={() => setPlayerPiece(PLAYER_X)}>
                  X
                </button>
                <button
                  className={playerPiece === PLAYER_O ? styles.buttonSelected : ''}
                  onClick={() => setPlayerPiece(PLAYER_O)}>
                  O
                </button>
              </div>
            </div>

            <Link href="/game"><button>Start</button></Link>
          </div>
        </div>

      </div>
    </>
  )
}
