import styles from '../styles/GameButtons.module.css'
import { PLAYER_O, PLAYER_X, BOARD_SIZE } from '../reuse/constants'

const GameButtons = ({ setBoardState, setGameHistory, gameHistory, setActivePlayer }) => {

    // 
    const performUndo = () => {
        if (!!gameHistory && gameHistory.length) {
            const previousState = gameHistory.pop()
            setGameHistory(gameHistory)
            setBoardState(previousState)
            setActivePlayer(currentPlayer => currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X)
        }
    }

    const performReset = () => {
        setBoardState(new Array(BOARD_SIZE).fill('')
            .map(_ => new Array(BOARD_SIZE).fill('')))
        setGameHistory([])
        setActivePlayer(PLAYER_X)
    }

    return (
        <div className={styles.gameButtonContainer}>
            <button className={styles.gameButton} onClick={() => performUndo()}>
                Undo
            </button>
            <button className={styles.gameButton} onClick={() => performReset()}>
                Reset
            </button>
        </div>
    )
}

export default GameButtons
