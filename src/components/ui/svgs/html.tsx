import type { SVGProps } from "react";

const Html = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 256 361" preserveAspectRatio="xMidYMid">
        <path fill="#E44D26" d="M36 324 7 0h242l-29 324-92 26" />
        <path fill="#F16529" d="M128 322V26h99l-24 273" />
        <path
            fill="#EBEBEB"
            d="m128 146-46-.1-3-34h49V79H44l1 9 9 101h74zm0 84-.2.1-39-11-2-24H52l4 50 72 20z"
        />
        <path
            fill="#FFF"
            d="m128 146 .1-.1h43l-4 46-39 11v34l72-20 .4-5 8-94 1-9h-82zm0-67v32h85l.7-7 1.7-16 1-9z"
        />
    </svg>
);

export { Html };
