import { useEffect, useState } from "react";

const useIsClientRender = () => {
  const [isClientRender, setIsClientRender] = useState(false);
  useEffect(() => {
    setIsClientRender(true);
  }, []);
  return typeof window !== "undefined" && isClientRender;
};

export default useIsClientRender;
