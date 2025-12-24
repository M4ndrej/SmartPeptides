import { useRef } from "react";

const useStickyValue = <T extends object | undefined>(value: T) => {
  const val = useRef<T>();
  if (value !== undefined) val.current = value;
  return val.current as T;
};

export default useStickyValue;
