import { useRecoilValue } from 'recoil';
import { playersState } from '../../state';
import { NextStepProps } from '../../types';
import PlayerCountSelection from './PlayerCountSelection';
import PlayerNames from './PlayerNames';

const PlayerSteps = ({ nextStep }: NextStepProps) => {
    const players = useRecoilValue(playersState);

    if (!(players.length > 0)) {
        return <PlayerCountSelection />;
    }
    return <PlayerNames nextStep={nextStep} />;
};

export default PlayerSteps;
