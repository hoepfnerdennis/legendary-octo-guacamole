export interface NextStepProps {
    nextStep: () => void;
}

export enum GAME_STEPS {
    STEP_1 = '1: start screen',
    STEP_2 = '2: set players',
    STEP_3 = '3: game started',
    STEP_4 = '4: game finished'
}

export enum ROUND_STEPS {
    STEP_1 = '1: tips',
    STEP_2 = '2: stitches',
    STEP_3 = '3: overview'
}

export interface Player {
    name?: string;
    id: string;
}

export type Tip = number;

export interface RoundData {
    tips: Tip;
    stitch: Tip;
    sum: Tip;
}

type Round = Map<Player['id'], RoundData | undefined>;

export interface Game {
    currentRound: number;
    maxRounds: number;
    rounds: Round[];
    startPlayer: Player['id'];
    currentPlayer: Player['id'];
}
