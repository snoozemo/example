import { useFetchers, useNavigation } from "@remix-run/react";
import nprogress from "nprogress";
import { useEffect, useMemo } from "react";

/**
 * @description nprogress hook
 * @returns state
 */
export function useNProgress() {
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

  useEffect(() => {
    if (state === "loading") nprogress.start();
    if (state === "idle") nprogress.done();
  }, [state, navigation.state]);
  return state;
}
