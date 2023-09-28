import { HTMLAttributes } from "react";

export function P5TextMarquee({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  const style: React.CSSProperties = {
    animation: "text-marquee  10s linear infinite",
  };
  return (
    <div
      style={
        {
          // transformOrigin: "left center",
          // transform: "rotateY(-1 0deg) skew(5deg,15deg) scale(0.5,1)",
        }
      }
      className="flex h-full w-full items-center overflow-hidden border-white bg-[#D31400ee]"
    >
      <p
        {...props}
        style={style}
        className={`${className} animate-marquee  w-[200%] translate-x-full space-x-2`}
      >
        {children}
      </p>
    </div>
  );
}
