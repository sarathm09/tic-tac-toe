
export const BOARD_SIZE = 3
export const PLAYER_X = 'X'
export const PLAYER_O = 'O'

export const OPPONENT_HUMAN = 'OPPONENT_HUMAN'
export const OPPONENT_AI = 'OPPONENT_AI'

export const DIFFICULTY_EASY = 'DIFFICULTY_EASY'
export const DIFFICULTY_HARD = 'DIFFICULTY_HARD'

export const AVATAR_HUMAN = () => `https://avatars.dicebear.com/api/avataaars/${Date.now() * Math.random() * 1000}.svg`
export const AVATAR_BOT = () => `https://avatars.dicebear.com/api/bottts/${Date.now() * Math.random() * 1000}.svg`

export const GAME_RESULT = {
    PLAYER_X_WINS: PLAYER_X,
    PLAYER_X_WINS: PLAYER_O,

    TIE: 'TIE',
    IN_PROGRESS: 'IN_PROGRESS'
}