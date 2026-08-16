import type { SVGProps } from "react";

const Css = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 256 361" preserveAspectRatio="xMidYMid">
        <path fill="#264DE4" d="M36 324 7 0h242l-29 324-92 26" />
        <path fill="#2965F1" d="M128 322V26h99l-24 273" />
        <path
            fill="#EBEBEB"
            d="M128 146H82l-3-34h49V79H44l1 9 9 101h74zm0 84-.2.1-39-11-2-24H52l4 50 72 20z"
        />
        <path
            fill="#FFF"
            d="M128 146v33h41l-4 45-37 10v34l72-20 .4-5 8-90 1-10zm0-67v33h85l.7-7 1.7-16 1-10z"
        />
    </svg>
);

export { Css };
