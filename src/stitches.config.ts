import { createStyled } from '@stitches/react';
import { useRef, useState } from 'react';

export interface RGB {
    red: number;
    green: number;
    blue: number;
}

export interface HSL {
    hue: number;
    saturation: number;
    lightness: number;
}

interface ALPHA {
    alpha: number;
}

export type RGBA = RGB & ALPHA;
export type HSLA = HSL & ALPHA;

function* getColor() {
    while (true) {
        yield '$green';
        yield '$yellow';
        yield '$red';
        yield '$blue';
    }
}

export const useColor = (): [string, () => void] => {
    const [color, setColor] = useState('$blue');
    const ref = useRef(getColor());

    const nextColor = () => {
        const { value } = ref.current.next();
        if (value) {
            console.log('nextColor', value);
            setColor(value);
        } else {
            setColor('$blue');
        }
    };

    return [color, nextColor];
};

export const COLORS = {
    blue: '#65a4d5',
    green: '#87ae53',
    red: '#bb2234',
    yellow: '#e6c92d'
};

export const { styled, css } = createStyled({
    prefix: '',
    tokens: {
        colors: {
            $blue: COLORS.blue,
            $green: COLORS.green,
            $red: COLORS.red,
            $yellow: COLORS.yellow
        },
        space: {
            $s: '.5rem',
            $m: '1rem',
            $l: '2rem'
        },
        fonts: {
            $main: 'Redressed, cursive'
        }
    },
    breakpoints: {},
    utils: {}
});
