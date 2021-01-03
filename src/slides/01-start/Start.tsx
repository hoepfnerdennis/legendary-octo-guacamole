import React from 'react';
import { css, styled } from '../../stitches.config';
import Elfen from '../../icons/Elfen';
import Riesen from '../../icons/Riesen';
import Zwerge from '../../icons/Zwerge';
import Menschen from '../../icons/Menschen';
import { NextStepProps } from '../../types';

const Container = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    padding: '$m 0'
});

const makeShadowAroundText = (stroke: number = 10) => {
    const shadow = [];
    const from = stroke * -1;
    for (let index = from; index < stroke; index += 2) {
        for (let jndex = from; jndex < stroke; jndex += 2) {
            shadow.push(`${index}px ${jndex}px 0 rgba(255, 255, 255,.1)`);
        }
    }
    return shadow.join(', ');
};

const Heading = styled.h1({
    fontFamily: '$main',
    fontSize: '8rem',
    margin: 0,
    textShadow: makeShadowAroundText(),
    color: 'black'
});

const bounce = css.keyframes({
    '0%': { transform: 'scale(1)' },
    '10%': { transform: 'scale(1.2)' },
    '20%': { transform: 'scale(.8)' },
    '30%': { transform: 'scale(1.05)' },
    '40%': { transform: 'scale(1)' },
    '100%': { transform: 'scale(1)' }
});

const ButtonContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animationName: bounce,
    animationDuration: '2000ms',
    animationIterationCount: 'infinite',
    animationFillMode: 'forwards'
});

const colors = css.keyframes({
    '0%': {
        boxShadow: '0px 0px 5px 15px $green',
        backgroundColor: '$green'
    },
    '25%': {
        boxShadow: '0px 0px 5px 15px $red',
        backgroundColor: '$red'
    },
    '50%': {
        boxShadow: '0px 0px 5px 15px $blue',
        backgroundColor: '$blue'
    },
    '75%': {
        boxShadow: '0px 0px 5px 15px $yellow',
        backgroundColor: '$yellow'
    },
    '100%': {
        boxShadow: '0px 0px 5px 15px $green',
        backgroundColor: '$green'
    }
});

const Button = styled.button({
    animationName: colors,
    animationDuration: '10000ms',
    animationIterationCount: 'infinite',
    animationFillMode: 'forwards',
    appearance: 'none',
    outline: 'none',
    border: 'none',
    position: 'relative',
    color: 'black',
    width: '250px',
    height: '250px',
    borderRadius: '100%',
    fontFamily: '$main',
    fontSize: '5rem'
});

const IconContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
});

const Start = ({ nextStep }: NextStepProps): JSX.Element => {
    return (
        <Container>
            <Heading>Wizard</Heading>
            <ButtonContainer>
                <Button onClick={nextStep}>Start</Button>
            </ButtonContainer>
            <IconContainer>
                <Menschen height={100} />
                <Zwerge height={100} />
                <Elfen height={100} />
                <Riesen height={100} />
            </IconContainer>
        </Container>
    );
};

export default Start;
