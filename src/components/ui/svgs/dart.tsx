import type { SVGProps } from "react";

const Dart = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 256 256" preserveAspectRatio="xMidYMid">
        <path fill="#00B4AB" d="M128 16 32 112v96l96 32 96-96V48z" />
        <path fill="#0081C6" d="M128 16v96l96-64V48z" />
        <path fill="#29B6F6" d="M32 112h96l96 32-96 96z" />
        <path fill="#01579B" d="M128 112v128l96-96z" />
    </svg>
);

export { Dart };
