import { COLORS } from '../stitches.config';

const BACKGROUND = '#000000';

const Menschen = ({ size, width, height }: { size?: number; width?: number; height?: number }) => {
    return (
        <svg
            width={width || size}
            height={height || size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 59 99">
            <g>
                <path
                    stroke={BACKGROUND}
                    id="T_2"
                    d="m5.70618,1.4592l49.31289,-0.454c0.09139,0.08404 9.38886,-0.84082 -1.36705,3.41355c-10.75591,4.25437 -12.03204,4.80929 -12.12341,4.72524c0.09137,0.08405 -0.27323,17.84142 -0.36461,17.75738c0.09137,0.08404 13.58184,-3.43044 13.49046,-3.51448c0.09137,0.08404 5.56049,-2.13562 0.09137,1.93377c-5.4691,4.06939 -13.85507,10.35846 -13.94644,10.27442c0.09137,0.08404 -4.64851,54.28102 -4.7399,54.19697c0.09139,0.08405 -2.27856,17.47146 -5.01312,1.00891c-2.73456,-16.46255 -5.46911,-54.38195 -5.56049,-54.46599c0.09137,0.08404 -13.7637,-8.60967 -13.85507,-8.69371c0.09137,0.08404 -7.38308,-3.61541 -1.91396,-2.13562c5.4691,1.47978 15.4958,2.95956 15.40443,2.87551c0.09137,0.08405 0.09137,-18.78315 0,-18.86721c0.09137,0.08405 -35.64013,-7.86978 -19.0505,-8.05475"
                    strokeWidth="0"
                    fill={COLORS.blue}
                />
            </g>
        </svg>
    );
};

export default Menschen;
