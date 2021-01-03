import { useSetRecoilState } from 'recoil';
import { playersState } from '../../state';
import { styled } from '../../stitches.config';
import { NextStepProps, Player } from '../../types';

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column'
});
const Heading = styled.h1({
    fontFamily: '$main',
    fontSize: '5rem',
    margin: '0 0 $m 0',
    color: 'white',
    textAlign: 'center'
});

const ButtonContainer = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
});

const Button = styled.button({
    appearance: 'none',
    border: 'none',
    width: '45vw',
    height: '200px',
    margin: '$s',
    fontFamily: '$main',
    fontSize: '6rem',
    variants: {
        color: {
            blue: { backgroundColor: '$blue' },
            green: { backgroundColor: '$green' },
            red: { backgroundColor: '$red' },
            yellow: { backgroundColor: '$yellow' }
        }
    }
});

const PlayerCountSelection = () => {
    const setPlayers = useSetRecoilState(playersState);

    const setPlayerCount = (count: number) => () => {
        const newPlayers: Player[] = new Array(count)
            .fill({})
            .map((_, i) => ({ id: `Spieler ${i + 1}` }));
        setPlayers(newPlayers);
    };

    return (
        <Container>
            <Heading>Wie viele Lehrlinge?</Heading>
            <ButtonContainer>
                <Button onClick={setPlayerCount(3)} color="blue">
                    3
                </Button>
                <Button onClick={setPlayerCount(4)} color="green">
                    4
                </Button>
                <Button onClick={setPlayerCount(5)} color="red">
                    5
                </Button>
                <Button onClick={setPlayerCount(6)} color="yellow">
                    6
                </Button>
            </ButtonContainer>
        </Container>
    );
};

export default PlayerCountSelection;
