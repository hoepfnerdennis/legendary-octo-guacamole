import React from 'react';
import { useRecoilValue } from 'recoil';
import { playersState } from '../../state';
import { styled } from '../../stitches.config';
import { NextStepProps } from '../../types';
import PlayerName from './PlayerName';

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '$m'
});

const Heading = styled.h1({
    fontFamily: '$main',
    fontSize: '5rem',
    margin: '0 0 $m 0',
    color: 'white',
    textAlign: 'center',
    variants: {
        size: {
            sm: {
                fontSize: '3rem'
            }
        }
    }
});

const List = styled.ol({
    color: 'white',
    fontFamily: '$main',
    fontSize: '3rem',
    margin: '$l'
});

const Item = styled.li({});

const Button = styled.button({
    appearance: 'none',
    border: 'none',
    width: '100%',
    fontFamily: '$main',
    fontSize: '4rem'
});

const colors = ['$green', '$yellow', '$red', '$blue'];

const PlayerNames = ({ nextStep }: NextStepProps) => {
    const players = useRecoilValue(playersState);

    const nextPlayerOrFin = () => {
        if (
            players.length > 0 &&
            players.every(player => player.name !== undefined && player.name !== '')
        ) {
            nextStep();
        }
    };

    const playerToEdit = players.findIndex(player => !player.name);

    if (playerToEdit === -1) {
        return (
            <Container>
                <Heading>Lehrlinge</Heading>
                <List>
                    {players.map(({ name, id }, i) => (
                        <Item key={`${id} ${name}`} css={{ color: colors[i % colors.length] }}>
                            {name}
                        </Item>
                    ))}
                </List>
                <Button onClick={nextStep}>beginnt</Button>
            </Container>
        );
    }

    return (
        <Container>
            <Heading size="sm">
                Dein Name,
                <br />
                Lehrling {playerToEdit + 1}
            </Heading>
            <PlayerName {...players[playerToEdit]} nextStep={nextPlayerOrFin} />
        </Container>
    );
};

export default PlayerNames;
