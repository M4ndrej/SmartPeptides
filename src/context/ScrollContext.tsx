"use client";

import createFastContext from "./createFastContext";

export type ScrollDirection = "up" | "down";

export type ScollContext = {
  direction: ScrollDirection;
  scrollTop: number;
};

const initialScrollContext: ScollContext = {
  direction: "up",
  scrollTop: 0,
};

export const {
  FastContextProvider: ScrollContextProvider,
  useFastContextValues: useScrollContext,
} = createFastContext<ScollContext>(initialScrollContext);
