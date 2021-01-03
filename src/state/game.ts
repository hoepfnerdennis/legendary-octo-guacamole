import { atom, DefaultValue, selector, selectorFamily } from 'recoil';
import { Player, Tip, Game } from '../types';
import historyEffect from './plugins/historyEffect';

export const gameState = atom<Game>({
    key: 'gameState',
    default: { currentRound: 0, maxRounds: 0, rounds: [], startPlayer: '', currentPlayer: '' },
    effects_UNSTABLE: [
        historyEffect<Game>('gameState')
        // localStorageEffect('gameState')
    ]
});

export const currentRoundState = selector<Game['currentRound']>({
    key: 'currentRoundState',
    get: ({ get }) => {
        const game = get(gameState);
        return game.currentRound;
    },
    set: ({ get, set }, newValue) => {
        if (newValue && !(newValue instanceof DefaultValue)) {
            const game = get(gameState);
            const newGame = { ...game };
            newGame.currentRound = newValue;
            set(gameState, newGame);
        }
    }
});
