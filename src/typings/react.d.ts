export * from "react";

// export experimental_useEffectEvent as useCallback;
declare module "react" {
  export function experimental_useEffectEvent<T>(
    callback: (event: T) => void
  ): (event: T) => void;
}
