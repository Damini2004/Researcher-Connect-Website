import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={props.width || 32}
      height={props.height || 32}
      {...props}
    >
      {/* Icon */}
      <g>
        {/* Blue shapes */}
        <g fill="#003366">
          <path d="M116.6 34.2 L70.7 57.1 L93.6 103 L116.6 79.9 Z" />
          <path d="M139.4 153 L185.3 129.9 L162.4 84.1 L139.4 107.1 Z" />
        </g>
        {/* Red shapes */}
        <g fill="#D32F2F">
          <path d="M139.4 34.2 L185.3 57.1 L162.4 103 L139.4 79.9 Z" />
          <path d="M116.6 153 L70.7 129.9 L93.6 84.1 L116.6 107.1 Z" />
        </g>
      </g>

      {/* Text */}
      <text
        x="128"
        y="190"
        fontFamily="Poppins, sans-serif"
        fontSize="48"
        fontWeight="bold"
        fill="#D32F2F"
        textAnchor="middle"
      >
        PURE
      </text>
      <text
        x="128"
        y="225"
        fontFamily="Poppins, sans-serif"
        fontSize="24"
        fontWeight="500"
        fill="#003366"
        textAnchor="middle"
      >
        RESEARCH INSIGHTS
      </text>
    </svg>
  );
}
