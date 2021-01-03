import React, { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chosenValueState, gameState, playersState } from '../../state';
import { styled } from '../../stitches.config';
import { NextStepProps, RoundData } from '../../types';

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

const Container = styled.div({
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
});

const Heading = styled.h2({
    margin: 0,
    fontFamily: '$main',
    fontSize: '2.5rem'
});

const Hint = styled.span({
    fontFamily: '$main',
    fontSize: '2rem',
    color: 'white',
    textAlign: 'center'
});

const Select = styled.select({
    background: 'transparent',
    border: '5px solid $blue',
    color: 'white',
    appearance: 'none',
    fontFamily: '$main',
    fontSize: '3rem',
    padding: '$s $l',
    margin: '$m'
});

const SpaceContainer = styled.div({
    marginBottom: '$l'
});

const Tip = ({ nextStep }: NextStepProps) => {
    const [value, setValue] = useRecoilState(chosenValueState);
    const [game, setGame] = useRecoilState(gameState);
    const players = useRecoilValue(playersState);

    const player = players.find(p => p.id === game.currentPlayer);

    const allTipsAsArray = Array.from(game.rounds[game.currentRound - 1].values()).map(
        v => v?.tips
    );
    const isLast = allTipsAsArray.length === players.length;
    const tipSum = allTipsAsArray.reduce((prev, curr) => {
        if (curr && prev) {
            return prev + curr;
        } else if (!prev) {
            return curr;
        } else {
            return prev;
        }
    }, 0);

    console.log({ allTipsAsArray, isLast, tipSum });

    const nextPlayer = () => {
        const currentPlayerIndex = players.findIndex(p => p.id === game.currentPlayer);
        let newPlayer;
        if (currentPlayerIndex === players.length - 1) {
            newPlayer = players[0];
        } else {
            newPlayer = players[currentPlayerIndex + 1];
        }
        setGame({
            ...game,
            currentPlayer: newPlayer.id
        });
        setValue(0);
        if (allTipsAsArray.length === players.length) {
            nextStep();
        }
    };

    const handleSelection = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(parseInt(e.target.value));
    };

    return (
        <Container>
            <Heading>Du bist am Zug, {player?.name || player?.id}</Heading>
            <SpaceContainer>
                <Hint>Vorhersage</Hint>
                <Select onChange={handleSelection} value={value}>
                    {new Array(game.currentRound + 1).fill(0).map((_, i) => (
                        <option key={i} value={i}>
                            {i}
                        </option>
                    ))}
                </Select>
            </SpaceContainer>
            <Button disabled={isLast && tipSum === game.currentRound} onClick={nextPlayer}>
                nächster
            </Button>
            {isLast && tipSum === game.currentRound && (
                <Hint>Du musst deine Vorhersage anpassen</Hint>
            )}
        </Container>
    );
};

export default Tip;
