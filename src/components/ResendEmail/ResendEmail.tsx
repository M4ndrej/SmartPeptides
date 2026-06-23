"use client";

import classNames from "classnames";
import { FC, useEffect, useState } from "react";

interface ResendEmailProps {
  resendAction: () => Promise<any>;
  showError: (error: string) => void;
  className?: string;
  tabIndex?: number;
  name?: string;
}

const ResendEmail: FC<ResendEmailProps> = ({
  showError,
  className,
  resendAction,
  tabIndex = 0,
  name = "Email",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (isPressed) {
      setTimeout(() => {
        setIsPressed(false);
      }, 30000);
    }
  }, [isPressed]);

  const handleResendEmail = async () => {
    setIsLoading(true);

    const resend = await resendAction();

    setIsPressed(true);
    showError("");
    if (resend?.error) {
      showError(resend.error);
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={!isPressed && !isLoading ? handleResendEmail : undefined}
      type="button"
      disabled={isPressed || isLoading}
      className={classNames(
        "font-D16px-M13px text-[#333333] transition duration-300 hover:text-[#333333]",
        !isPressed && !isLoading
          ? "cursor-pointer hover:underline"
          : "cursor-default opacity-50",
        className
      )}
      tabIndex={tabIndex}
    >
      {isLoading ? "Sending..." : isPressed ? `${name} Sent` : `Resend ${name}`}
    </button>
  );
};

export default ResendEmail;
