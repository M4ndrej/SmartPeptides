import {
  enterAnimations,
  exitAnimations,
  transitionAnimations,
} from "@/data/modal_animations";
import { ModalType } from "@/types/modal_types";
import { useState, useEffect } from "react";

const useHeaderModalAnimations = (
  currentModal: ModalType | null
): [ModalType | null, string] => {
  const [displayedModal, setDisplayedModal] = useState<ModalType | null>(null);
  const [animationClass, setAnimationClass] = useState<string>("");

  useEffect(() => {
    if (currentModal === displayedModal) {
      return;
    }

    // ENTER
    if (currentModal && !displayedModal) {
      setDisplayedModal(currentModal);
      setAnimationClass(enterAnimations[currentModal]);
    }

    // TRANSITION
    if (currentModal && displayedModal) {
      // Transitioning from one modal to another
      // Apply exit animation to the current modal
      setAnimationClass(transitionAnimations[displayedModal]);
      // After exit animation, set the new modal with enter animation
      const timeoutId = setTimeout(() => {
        setDisplayedModal(currentModal);
        setAnimationClass(enterAnimations[currentModal]);
      }, 250); // Duration should match CSS animation-duration
      return () => clearTimeout(timeoutId);
    }

    // EXIT
    if (!currentModal && displayedModal) {
      // Determine exit animation based on the currently displayed modal
      setAnimationClass(exitAnimations[displayedModal]);
      // Start exit animation
      const timeoutId = setTimeout(() => {
        setDisplayedModal(null); // Unmount modal after exit animation
      }, 250); // Duration should match CSS animation-duration
      return () => clearTimeout(timeoutId);
    }
  }, [currentModal]);

  return [displayedModal, animationClass];
};

export default useHeaderModalAnimations;
