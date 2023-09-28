import { useFetchers, useNavigation } from "@remix-run/react";
import { type HTMLAttributes, useMemo } from "react";

/**
 * @description TransitionLoader //TODO
 * @returns state
 */
export function TransitionLoader({
  children,
}: HTMLAttributes<HTMLBaseElement>) {
  const navigation = useNavigation();
  const fetchers = useFetchers();

  const state = useMemo<"idle" | "loading">(() => {
    const states = [
      navigation.state,
      ...fetchers.map((fetcher) => fetcher.state),
    ];
    if (states.every((state) => state === "idle")) return "idle";
    return "loading";
  }, [navigation.state, fetchers]);

  return state === "idle" ? <>{children}</> : <h1>loading</h1>;
}
