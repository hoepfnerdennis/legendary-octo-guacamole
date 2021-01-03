import { COLORS } from '../stitches.config';

const BACKGROUND = '#000000';

const Riesen = ({ size, width, height }: { size?: number; width?: number; height?: number }) => {
    return (
        <svg
            width={width || size}
            height={height || size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 100">
            <g>
                <path
                    stroke={BACKGROUND}
                    id="I_1"
                    d="m4.58585,96.03315c2.3348,2.13865 51.36562,2.7967 54.03397,0c2.66835,-2.7967 -20.34653,-4.60675 -22.09742,-6.90972c-1.7509,-2.30296 -3.08548,-29.28336 -0.66708,-32.5734c2.41839,-3.29004 25.89116,-6.25155 25.6828,-24.6768c-0.20836,-18.42525 -15.34319,-28.99545 -30.56088,-28.89242c-15.21769,0.10303 -29.39369,8.82175 -28.97655,27.41181c0.41714,18.59007 19.92899,22.20893 23.01447,25.8284c3.08548,3.61947 2.75153,29.94099 0.83386,32.24436c-1.91767,2.30337 -23.59797,5.42911 -21.26316,7.56776z"
                    strokeWidth="0"
                    fill={COLORS.yellow}
                />
                <ellipse
                    stroke={COLORS.yellow}
                    ry="19.74145"
                    rx="24.09849"
                    id="I_2"
                    cy="29.57027"
                    cx="31.68622"
                    strokeWidth="0"
                    fill={BACKGROUND}
                />
                <path
                    stroke={BACKGROUND}
                    id="I_3"
                    d="m24.09812,29.68904c2.36253,-2.12348 3.22411,-4.99639 7.08759,-6.37042c3.33543,1.62379 5.83701,3.87212 7.50472,6.37027c-1.50094,3.24759 -4.00252,5.99555 -7.50472,7.11972c-3.80788,-1.49883 -7.11545,-6.24526 -7.08759,-7.11956z"
                    strokeWidth="0"
                    fill={COLORS.yellow}
                />
            </g>
        </svg>
    );
};

export default Riesen;
