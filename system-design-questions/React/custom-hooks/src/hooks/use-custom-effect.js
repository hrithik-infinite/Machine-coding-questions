import { useRef } from "react";

const useCustomEffect = (cb, deps) => {
  //first render
  const isFirstRender = useRef(true);
  const prevDeps = useRef([]);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    const cleanup = cb();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }
  //deps chnage and no deps
  const depsChanged = deps ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current) : true;
  if (depsChanged) {
    const cleanup = cb();
    if (cleanup && typeof cleanup === "function" && deps) {
      cleanup();
    }
  }
  //cleanup
  prevDeps.current = deps || [];
};
export default useCustomEffect;
