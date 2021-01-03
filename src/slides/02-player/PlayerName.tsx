import React, { ChangeEvent, createRef, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { playerSelector } from '../../state';
import { styled, useColor } from '../../stitches.config';
import { NextStepProps, Player } from '../../types';
import onEnter from '../../utils/onEnter';

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '$m'
});

const Button = styled.button({
    appearance: 'none',
    border: 'none',
    width: '100%',
    fontFamily: '$main',
    fontSize: '5rem'
});

const Input = styled.input({
    margin: '$m',
    fontSize: '2rem',
    fontFamily: '$main',
    width: '100%'
});

const PlayerName = ({ id, name, nextStep }: Player & NextStepProps) => {
    const [value, setValue] = useState(name || '');
    const input = createRef<HTMLInputElement>();
    const setPlayer = useSetRecoilState(playerSelector(id));
    const [color, nextColor] = useColor();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    console.log(color);

    const handleClick = () => {
        setValue('');
        setPlayer({ id, name: value });
        nextStep();
        nextColor();
    };

    useEffect(() => {
        if (value === '') {
            input.current?.focus();
        }
    }, [input, value]);

    return (
        <Container>
            <Input
                value={value}
                onChange={handleChange}
                ref={input}
                id={`name spieler ${id}`}
                onKeyPress={onEnter(handleClick)}
            />
            <Button onClick={handleClick} disabled={!value} css={{ backgroundColor: color }}>
                weiter
            </Button>
        </Container>
    );
};

export default PlayerName;
