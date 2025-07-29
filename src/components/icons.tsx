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
      <defs>
        <style>
          {
            ".pure-red { fill: #D32F2F; } .pure-blue { fill: #003366; } .pure-text-red { fill: #D32F2F; font-family: Poppins, sans-serif; font-weight: bold; font-size: 48px; text-anchor: middle; } .pure-text-blue { fill: #003366; font-family: Poppins, sans-serif; font-weight: 500; font-size: 24px; text-anchor: middle; letter-spacing: 0.025em; }"
          }
        </style>
      </defs>

      {/* Icon */}
      <g transform="translate(128, 78) rotate(20) scale(0.9)">
        <path
          className="pure-blue"
          d="M-52.6,-5.5 L-9.9,-54.2 L-4.4,-44.7 L-47.1,3.9 Z"
        />
        <path
          className="pure-red"
          d="M-4.4,-44.7 L47.1,-3.9 L52.6,5.5 L9.9,54.2 Z"
        />
        <path
          className="pure-red"
          d="M-47.1,3.9 L4.4,44.7 L9.9,54.2 L-52.6,5.5 Z"
        />
        <path
          className="pure-blue"
          d="M4.4,44.7 L47.1,-3.9 L52.6,5.5 L9.9,54.2 L4.4,44.7 Z"
        />
      </g>

      {/* Text */}
      <text x="128" y="190" className="pure-text-red">
        PURE
      </text>
      <text x="128" y="225" className="pure-text-blue">
        RESEARCH INSIGHTS
      </text>
    </svg>
  );
}
