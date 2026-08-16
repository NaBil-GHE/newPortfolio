import type { SVGProps } from "react";

const Flutter = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 256 315" preserveAspectRatio="xMidYMid">
        <path fill="#40C4FF" d="M153.6 0 24 129.6l40.5 40.5L234.7 0z" />
        <path fill="#40C4FF" d="M64.5 170.1 105 210.6l40.6-40.5H105z" />
        <path
            fill="#03569B"
            d="m105 210.6 48.6 48.6H234l-88.4-88.4z"
        />
        <path
            fill="#16B9FD"
            d="M105 210.6 145.6 170H234l-80.4 80.4z"
            opacity="0.85"
        />
    </svg>
);

export { Flutter };
