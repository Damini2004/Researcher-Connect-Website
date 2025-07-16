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
      <g fill="hsl(var(--primary))">
        <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z" />
        <path d="M176 80H80a8 8 0 0 0-8 8v80a8 8 0 0 0 8 8h96a8 8 0 0 0 8-8v-24a8 8 0 0 0-16 0v16H88V96h80v16a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8Z" />
      </g>
    </svg>
  );
}
