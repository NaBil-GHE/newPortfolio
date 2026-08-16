import type { SVGProps } from "react";

const RestApi = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 256 256" preserveAspectRatio="xMidYMid">
        <rect x="20" y="36" width="216" height="184" rx="20" fill="#10B981" />
        <rect x="36" y="56" width="184" height="144" rx="12" fill="#064E3B" />
        <path
            d="M98 97 66 128l32 31M158 97l32 31-32 31"
            stroke="#A7F3D0"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        <circle cx="128" cy="128" r="14" fill="#34D399" />
    </svg>
);

export { RestApi };
