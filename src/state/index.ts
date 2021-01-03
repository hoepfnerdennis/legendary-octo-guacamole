import { atom, DefaultValue, selectorFamily } from 'recoil';
import { GAME_STEPS, Player, ROUND_STEPS } from '../types';
import historyEffect from './plugins/historyEffect';
// import localStorageEffect from './plugins/localStorageEffect';

export const gameStepState = atom({
    key: 'gameStepState',
    default: GAME_STEPS.STEP_1,
    effects_UNSTABLE: [
        historyEffect<GAME_STEPS>('gameStepState')
        // localStorageEffect('gameStepState')
    ]
});

export const roundStepState = atom({
    key: 'roundStepState',
    default: ROUND_STEPS.STEP_1,
    effects_UNSTABLE: [
        historyEffect<ROUND_STEPS>('roundStepState')
        // localStorageEffect('gameStepState')
    ]
});

export const chosenValueState = atom({
    key: 'chosenValueState',
    default: 0,
    effects_UNSTABLE: [
        historyEffect<number>('chosenValueState')
        // localStorageEffect('chosenValueState')
    ]
});

export const playersState = atom<Player[]>({
    key: 'playersState',
    default: [],
    effects_UNSTABLE: [
        historyEffect<Player[]>('playersState')
        // localStorageEffect('playersState')
    ]
});

export const playerSelector = selectorFamily<Player | undefined, Player['id']>({
    key: 'playerSelector',
    get: (id: Player['id']) => ({ get }) => {
        const players = get(playersState);
        return players.find(player => player.id === id);
    },
    set: (id: Player['id']) => ({ get, set }, newValue) => {
        const players = get(playersState);
        if (newValue && !(newValue instanceof DefaultValue)) {
            const newPlayers = players.map(player => {
                if (player.id === id) {
                    return newValue;
                }
                return player;
            });
            set(playersState, newPlayers);
        }
    }
});

export * from './game';
