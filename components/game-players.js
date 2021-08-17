import Image from 'next/image'
import { useState } from 'react'
import { AVATAR_BOT, AVATAR_HUMAN, PLAYER_O, PLAYER_X } from '../reuse/constants'
import styles from '../styles/GamePlayers.module.css'

const GamePlayerIndicator = ({ opponent, playerPiece, activePlayer, playerAvatar }) => {

    const [botAvatar, setBotAvatar] = useState(AVATAR_BOT())

    return (
        <div className={styles.playerAvatarContainer}>
            <div className={`${styles.player1} ${activePlayer === PLAYER_X ? 'active' : styles.inactive}`}>
                <div className={styles.player1Avatar}>
                    <Image
                        src={playerPiece === PLAYER_X ? playerAvatar || AVATAR_HUMAN() : botAvatar}
                        height={70}
                        width={70}
                        objectFit='fill'
                        alt="Player 1" />
                </div>
                <div className={styles.player1Piece}>
                    <h3>{PLAYER_X}</h3>
                </div>
            </div>
            <div className={`${styles.player2} ${activePlayer === PLAYER_O ? 'active' : styles.inactive}`}>
                <div className={styles.player2Piece}>
                    <h3>{PLAYER_O}</h3>
                </div>
                <div className={styles.player2Avatar}>
                    <Image
                        src={playerPiece === PLAYER_O ? playerAvatar || AVATAR_HUMAN() : botAvatar}
                        height={120}
                        width={120}
                        objectFit='fill'
                        alt="Player 2" />
                </div>
            </div>

        </div>
    )
}

export default GamePlayerIndicator
