"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from "react";

export default function createFastContext<T extends Record<string, any>>(
  initialState: T
) {
  type UseFastContextDataReturn = {
    get: () => T;
    set: (value: Partial<T>) => void;
    subscribe: (callback: () => void) => () => void;
  };

  function useFastContextData(): UseFastContextDataReturn {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<T>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  const FastContext = createContext<UseFastContextDataReturn | null>(null);

  function FastContextProvider({
    children,
  }: Readonly<{ children: ReactNode }>) {
    const data = useFastContextData();
    return <FastContext.Provider value={data}>{children}</FastContext.Provider>;
  }

  type UseFastContextReturn = [T[keyof T], (value: Partial<T>) => void];

  function useFastContext(
    selector: (store: T) => T[keyof T]
  ): UseFastContextReturn {
    const fastContext = useContext(FastContext);
    if (!fastContext) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
      fastContext.subscribe,
      () => selector(fastContext.get()),
      () => selector(initialState)
    );

    return [state, fastContext.set];
  }

  type FieldGetterSetter<K extends keyof T> = {
    get: T[K];
    set: (value: T[K]) => void;
  };

  type FieldsReturn = {
    [K in keyof T]: FieldGetterSetter<K>;
  };

  function useFastContextValues(fieldNames: Array<keyof T>): FieldsReturn {
    const gettersAndSetters: FieldsReturn = {} as FieldsReturn;

    for (const fieldName of fieldNames) {
      /* eslint-disable react-hooks/rules-of-hooks */
      const [getter, setter] = useFastContext((fc) => fc[fieldName]);
      gettersAndSetters[fieldName] = {
        get: getter,
        set: (value: any) => setter({ [fieldName]: value } as Partial<T>),
      };
    }

    return gettersAndSetters;
  }

  return {
    FastContextProvider,
    useFastContextValues,
  };
}
