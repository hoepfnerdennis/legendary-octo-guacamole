import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Elfen from '../../icons/Elfen';
import Riesen from '../../icons/Riesen';
import Zwerge from '../../icons/Zwerge';
import Menschen from '../../icons/Menschen';
import { currentRoundState, gameState, playerSelector, playersState } from '../../state';
import { COLORS, css, styled } from '../../stitches.config';
import { Game, NextStepProps } from '../../types';
import Round from './Round';

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
});

const HeadingContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
});

const Divider = styled.div({
    marginBottom: '$l',
    width: '100%',
    paddingBottom: '10px',
    background: `linear-gradient(to right, ${COLORS.yellow} 0%,${COLORS.red} 25%, #000000 45%,#000000 55%, ${COLORS.green} 75%,${COLORS.blue} 100%) bottom #777 no-repeat`,
    backgroundSize: '100% 10px'
});

const Heading = styled.h1({
    margin: '$m 0',
    color: 'white',
    fontFamily: '$main',
    fontSize: '2rem'
});

const RoundIndicator = () => {
    const { currentRound, maxRounds } = useRecoilValue(gameState);
    return (
        <HeadingContainer>
            <Riesen height={50} />
            <Zwerge height={50} />
            <Heading>
                Runde: {currentRound} / {maxRounds}
            </Heading>
            <Elfen height={50} />
            <Menschen height={50} />
        </HeadingContainer>
    );
};

const PlayingStep = ({ nextStep }: NextStepProps) => {
    const [game, setGame] = useRecoilState(gameState);
    const players = useRecoilValue(playersState);

    const nextRound = () => {
        if (game.currentRound === game.maxRounds) {
            nextStep();
        } else {
            const currentPlayerIndex = players.findIndex(player => player.id === game.startPlayer);
            let newPlayer;
            if (currentPlayerIndex === players.length - 1) {
                newPlayer = players[0];
            } else {
                newPlayer = players[currentPlayerIndex + 1];
            }
            const newGame: Game = {
                ...game,
                currentPlayer: newPlayer.id,
                currentRound: game.currentRound + 1,
                rounds: [...game.rounds, new Map(players.map(player => [player.id, undefined]))],
                startPlayer: newPlayer.id
            };
            setGame(newGame);
        }
    };

    return (
        <Container>
            <RoundIndicator />
            <Divider />
            <Round nextStep={nextRound} />
        </Container>
    );
};

export default PlayingStep;
