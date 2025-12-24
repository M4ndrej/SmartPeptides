// src/hooks/useModalAnimation.ts
import { useEffect, useState } from "react";

interface UseModalAnimationProps {
  isOpen: boolean;
  animationDuration?: number;
  enterAnimationClass: string;
  exitAnimationClass: string;
}

interface UseModalAnimationReturn {
  showModal: boolean;
  animationClass: string;
}

const useStandaloneModalAnimation = ({
  isOpen,
  animationDuration = 250,
  enterAnimationClass,
  exitAnimationClass,
}: UseModalAnimationProps): UseModalAnimationReturn => {
  const [showModal, setShowModal] = useState(isOpen);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setAnimationClass(enterAnimationClass);
    } else if (showModal) {
      setAnimationClass(exitAnimationClass);
      const timer = setTimeout(() => {
        setShowModal(false);
      }, animationDuration);
      return () => clearTimeout(timer);
    }
  }, [
    isOpen,
    showModal,
    enterAnimationClass,
    exitAnimationClass,
    animationDuration,
  ]);

  return { showModal, animationClass };
};

export default useStandaloneModalAnimation;
