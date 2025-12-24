"use client";
import { FC, Suspense } from "react";
import SubscribeContent from "./SubscribeContent/SubscribeContent";

const Subscribe: FC = () => {
  return (
    <Suspense>
      <SubscribeContent />
    </Suspense>
  );
};

export default Subscribe;
