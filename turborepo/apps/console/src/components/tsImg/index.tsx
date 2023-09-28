import { useMemoizedFn } from "ahooks";
import {
  forwardRef,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import "./index";

/**
 * @date 2023/02/06
 * @description  Image loading transition
 * @todo forwardRef placeholder
 */
export default function TsImg({
  className,
  onLoad: onLoadParams,
  onError: onErrorParams,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const onLoad = useMemoizedFn((e) => {
    ref?.current?.classList.remove("scale-0");
    ref?.current?.classList.remove("opacity-0");
    onLoadParams?.(e);
  });
  const onError = useMemoizedFn((e) => {
    ref?.current?.classList.add("scale-0");
    ref?.current?.classList.add("opacity-0");
    onErrorParams?.(e);
  });
  useEffect(() => {
    onError(null);
    return onLoad(null);
  }, [ref]);
  return (
    <img
      ref={ref}
      onLoad={onLoad}
      className={`opacity-0  outline-none  transition-opacity  ${className}`}
      onError={onError}
      src=""
      alt=""
      {...props}
    />
  );
}
