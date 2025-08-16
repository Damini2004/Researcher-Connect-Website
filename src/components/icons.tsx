import type { SVGProps } from "react";
import Image from "next/image";

export function Logo(props: SVGProps<SVGSVGElement>) {
  // The className prop is passed to control sizing from different parts of the app.
  // We use a wrapper div to apply the className for layout purposes.
  // The Image component itself uses width and height for intrinsic sizing.
  return (
    <div className={props.className}>
      <Image
        src="/Pure Researc.gif"
        alt="Pure Research Insights Logo"
        width={256} // Original width of the image for aspect ratio
        height={256} // Original height of the image for aspect ratio
        className="h-full w-full object-contain"
        unoptimized // Necessary for animated GIFs
      />
    </div>
  );
}
