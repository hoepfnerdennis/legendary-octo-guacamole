import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { gameState, roundStepState } from '../../state';
import { styled } from '../../stitches.config';
import { NextStepProps, ROUND_STEPS } from '../../types';

function* nextRoundStep(setter: (step: ROUND_STEPS) => void) {
    yield setter(ROUND_STEPS.STEP_2);
    yield setter(ROUND_STEPS.STEP_3);
}

const Button = styled.button({
    appearance: 'none',
    border: 'none',
    padding: '$s',
    fontFamily: '$main',
    fontSize: '5rem',
    backgroundColor: '$yellow',
    ':disabled': {
        backgroundColor: 'gray'
    }
});

const Round = ({ nextStep }: NextStepProps) => {
    const [game] = useRecoilState(gameState);
    const [roundStep, setRoundStep] = useRecoilState(roundStepState);
    const generator = useRef(nextRoundStep(setRoundStep));

    console.log(game.currentRound);

    const finRound = () => {
        setRoundStep(ROUND_STEPS.STEP_1);
        generator.current = nextRoundStep(setRoundStep);
        nextStep();
    };

    if (roundStep === ROUND_STEPS.STEP_1) {
        return <Button onClick={() => generator.current.next()}>TIP</Button>;
    }
    if (roundStep === ROUND_STEPS.STEP_2) {
        return <Button onClick={() => generator.current.next()}>Stitch</Button>;
    }
    return <Button onClick={finRound}>Summary</Button>;
};

export default Round;
