import Start from './slides/01-start/Start';
import { GAME_STEPS, Game } from './types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameState, gameStepState, playersState } from './state';
import PlayerSteps from './slides/02-player/PlayerSteps';
import { useBrowserBack } from './state/history';
import PlayingStep from './slides/03-playing/PlayingStep';
import { useRef } from 'react';

function* nextGameStep(setter: (step: GAME_STEPS) => void) {
    yield setter(GAME_STEPS.STEP_2);
    yield setter(GAME_STEPS.STEP_3);
    yield setter(GAME_STEPS.STEP_4);
}

function App() {
    const [gameStep, setGameStep] = useRecoilState(gameStepState);
    const [game, setGame] = useRecoilState(gameState);
    const players = useRecoilValue(playersState);
    const generator = useRef(nextGameStep(setGameStep));
    useBrowserBack();

    const startPlaying = () => {
        const newGame: Game = {
            currentRound: 1,
            maxRounds: 60 / players.length,
            rounds: new Array(60 / players.length).fill(
                new Map(players.map(player => [player.id, {}]))
            ),
            startPlayer: players[0].id,
            currentPlayer: players[0].id
        };
        setGame(newGame);
        generator.current.next();
    };

    if (gameStep === GAME_STEPS.STEP_3) {
        return <PlayingStep nextStep={() => generator.current.next()} />;
    }
    if (gameStep === GAME_STEPS.STEP_2) {
        return <PlayerSteps nextStep={startPlaying} />;
    }
    if (gameStep === GAME_STEPS.STEP_1) {
        return <Start nextStep={() => generator.current.next()} />;
    }

    return <div style={{ color: 'white' }}>Done...</div>;
}

export default App;
